import express from "express";
import path from "path";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Parsers for POST requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for external requests (e.g. from Cloudflare Pages)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Contact form proxy API endpoint
app.post(["/api/contact", "/api/leads"], async (req, res) => {
  try {
    const { name, whatsapp, email, company, service, budget, message, origin } = req.body;

    // 1. Basic field presence validation
    if (!name || !whatsapp || !email || !service || !message) {
      return res.status(400).json({
        success: false,
        error: "Por favor, preencha todos os campos obrigatórios (Nome, WhatsApp, E-mail, Serviço e Mensagem).",
      });
    }

    // 2. Name validation (at least 3 characters)
    if (name.trim().length < 3) {
      return res.status(400).json({
        success: false,
        error: "Por favor, insira seu nome completo ou pelo menos 3 caracteres.",
      });
    }

    // 3. Email validation using RFC-compliant basic regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: "Por favor, insira um endereço de e-mail válido (exemplo: nome@empresa.com.br).",
      });
    }

    // 4. WhatsApp / Phone validation
    // Clean string to check for digits only. Brazil numbers are usually 10 or 11 digits.
    const cleanPhone = whatsapp.replace(/\D/g, "");
    if (cleanPhone.length < 10 || cleanPhone.length > 15) {
      return res.status(400).json({
        success: false,
        error: "Por favor, insira um número de WhatsApp válido com DDD (mínimo de 10 dígitos). Exemplo: (11) 99999-9999.",
      });
    }

    // 5. Message validation (at least 10 characters)
    if (message.trim().length < 10) {
      return res.status(400).json({
        success: false,
        error: "Por favor, escreva uma mensagem com pelo menos 10 caracteres detalhando seu projeto ou desafio.",
      });
    }

    let n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    const scriptUrl = process.env.GOOGLE_SHEETS_SCRIPT_URL;

    // Normalização automática: se o usuário atualizou o path no n8n para "/leads-site"
    // mas a variável de ambiente (env) ainda aponta para "/formulario-contato" ou "/formulario-site",
    // nós normalizamos dinamicamente para garantir que o envio funcione imediatamente.
    if (n8nWebhookUrl) {
      const originalUrl = n8nWebhookUrl;
      n8nWebhookUrl = n8nWebhookUrl
        .replace("/formulario-contato", "/leads-site")
        .replace("/formulario-site", "/leads-site");
      
      if (originalUrl !== n8nWebhookUrl) {
        console.log(`[Normalização de Webhook] Atualizando endpoint antigo de ${originalUrl} para ${n8nWebhookUrl}`);
      }
    }

    const payload = {
      timestamp: new Date().toISOString(),
      name: name.trim(),
      whatsapp: whatsapp.trim(),
      email: email.trim().toLowerCase(),
      company: company ? company.trim() : "Não informado",
      service,
      budget: budget || "Não informado",
      message: message.trim(),
      origin: origin || "Formulário de Contato",
    };

    console.log("=== NOVA SOLICITAÇÃO DE ORÇAMENTO ===");
    console.log(JSON.stringify(payload, null, 2));

    // A. n8n Webhook Integration takes priority
    if (n8nWebhookUrl && n8nWebhookUrl.trim() !== "") {
      console.log(`Enviando dados para o Webhook do n8n em: ${n8nWebhookUrl}`);
      
      const response = await fetch(n8nWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorBody = "";
        try {
          errorBody = await response.text();
        } catch (e) {
          errorBody = "Não foi possível obter detalhes do corpo da resposta.";
        }

        const statusMsg = response.statusText ? ` - ${response.statusText}` : "";
        console.error(`[Erro n8n] Falha na integração. Status: ${response.status}${statusMsg}. Detalhes: ${errorBody}`);

        // Tratamento especial para erro de nó de resposta ausente ou não utilizado (o n8n aceitou o webhook e iniciou o workflow, mas não soube como responder)
        if (
          errorBody.includes("No Respond to Webhook node found in the workflow") ||
          errorBody.includes("Unused Respond to Webhook node found in the workflow")
        ) {
          console.warn("[Aviso n8n] Os dados foram enviados com sucesso e o fluxo de trabalho foi disparado no n8n, mas o n8n retornou erro 500 devido à configuração do nó de resposta.");
          return res.status(200).json({
            success: true,
            message: "Sua solicitação foi enviada com sucesso! (Nota: O fluxo do seu n8n foi acionado, mas para evitar este aviso, certifique-se de ajustar a configuração 'Respond' do webhook no n8n para 'Immediately' ou conecte corretamente o nó 'Respond to Webhook').",
            data: { status: "success", warning: "Webhook acionado, mas com erro de resposta interna de nó no n8n." },
          });
        }

        // Tratamento especial para erro de execução interna do fluxo no n8n (o webhook foi atingido e o fluxo iniciou, mas algum nó interno falhou)
        if (errorBody.includes("There was a problem executing the workflow")) {
          console.error("[Erro n8n] Os dados do webhook foram recebidos e o fluxo foi acionado, mas ocorreu um erro em algum nó do fluxo do n8n.");
          return res.status(500).json({
            success: false,
            error: "O webhook do n8n recebeu os dados e iniciou o fluxo, mas ocorreu um erro interno na execução do seu workflow no n8n (HTTP 500).",
            details: "Dica: Verifique a aba 'Executions' (Execuções) ou os logs do seu fluxo no painel do n8n para identificar qual nó falhou ou se há algum campo obrigatório incorreto.",
          });
        }

        let friendlyMessage = "O serviço de automação (n8n) retornou um erro ao processar o formulário.";
        if (response.status === 404) {
          friendlyMessage = "O endpoint do webhook do n8n não foi encontrado (HTTP 404). Por favor, verifique se o fluxo correspondente está ativo e publicado no seu painel do n8n.";
        } else if (response.status === 401 || response.status === 403) {
          friendlyMessage = "Falha de autenticação ao conectar com o n8n (HTTP 401/403). Verifique as chaves ou credenciais de acesso do webhook.";
        } else if (response.status >= 500) {
          friendlyMessage = `Ocorreu um erro interno no servidor do n8n (HTTP ${response.status}). Verifique as execuções e os logs de erro no painel do seu n8n.`;
        } else {
          friendlyMessage = `Erro retornado pelo n8n (HTTP ${response.status}): ${errorBody.slice(0, 150) || "Sem corpo de erro detalhado"}`;
        }

        return res.status(response.status).json({
          success: false,
          error: friendlyMessage,
          details: `n8n ${response.status}${statusMsg}: ${errorBody}`,
        });
      }

      const result = await response.json().catch(() => ({ status: "success" }));
      console.log("Resposta do n8n:", result);

      return res.status(200).json({
        success: true,
        message: "Sua solicitação foi enviada com sucesso ao n8n!",
        data: result,
      });
    } 
    // B. Fallback to Google Sheets Apps Script
    else if (scriptUrl && scriptUrl.trim() !== "") {
      console.log(`Enviando dados para o Google Sheets em: ${scriptUrl}`);
      
      const response = await fetch(scriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorBody = "";
        try {
          errorBody = await response.text();
        } catch (e) {
          errorBody = "Não foi possível obter detalhes do corpo da resposta.";
        }

        const statusMsg = response.statusText ? ` - ${response.statusText}` : "";
        console.error(`[Erro Google Sheets] Falha na integração. Status: ${response.status}${statusMsg}. Detalhes: ${errorBody}`);

        let friendlyMessage = "O serviço de integração com o Google Sheets retornou um erro.";
        if (response.status === 404) {
          friendlyMessage = "A URL do script do Google Sheets não foi encontrada (HTTP 404). Certifique-se de que o Apps Script foi implantado como um Web App e que a URL está correta.";
        } else {
          friendlyMessage = `Erro retornado pelo Google Sheets (HTTP ${response.status}): ${errorBody.slice(0, 150) || "Sem corpo de erro detalhado"}`;
        }

        return res.status(response.status).json({
          success: false,
          error: friendlyMessage,
          details: `Google Sheets ${response.status}${statusMsg}: ${errorBody}`,
        });
      }

      const result = await response.json().catch(() => ({ status: "success" }));
      console.log("Resposta do Google Apps Script:", result);

      return res.status(200).json({
        success: true,
        message: "Sua mensagem foi enviada com sucesso ao Google Sheets!",
        data: result,
      });
    } 
    // C. Sandbox / Demo Mode
    else {
      console.log("⚠️ Nem N8N_WEBHOOK_URL nem GOOGLE_SHEETS_SCRIPT_URL configuradas no .env. Executando em modo Sandbox/Simulação.");
      return res.status(200).json({
        success: true,
        sandbox: true,
        message: "Solicitação recebida com sucesso no servidor (Modo Simulação/Sandbox)! Configure a variável N8N_WEBHOOK_URL para integrar com seu n8n e automatizar os processos de marketing.",
      });
    }
  } catch (error: any) {
    console.error("Erro ao processar contato:", error);
    return res.status(500).json({
      success: false,
      error: "Ocorreu um erro interno no servidor ao tentar processar seus dados.",
      details: error.message || error.toString(),
    });
  }
});

// Vite middleware for development or Static file serving for production
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware montado com sucesso.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Servindo arquivos estáticos em produção a partir de /dist");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Ambiente: ${process.env.NODE_ENV || "development"}`);
  });
}

setupVite().catch((err) => {
  console.error("Falha ao iniciar o servidor express + vite:", err);
});
