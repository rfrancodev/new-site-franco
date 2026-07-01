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

// Contact form proxy API endpoint
app.post("/api/contact", async (req, res) => {
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

    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    const scriptUrl = process.env.GOOGLE_SHEETS_SCRIPT_URL;

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
        throw new Error(`Erro na resposta do n8n: ${response.statusText}`);
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
        throw new Error(`Erro na resposta do Google Apps Script: ${response.statusText}`);
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
      error: "Ocorreu um erro interno no servidor ao tentar enviar seus dados.",
      details: error.message,
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
