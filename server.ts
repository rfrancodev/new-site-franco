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

    // Simple server-side validation
    if (!name || !whatsapp || !email || !service || !message) {
      return res.status(400).json({
        success: false,
        error: "Por favor, preencha todos os campos obrigatórios (Nome, WhatsApp, E-mail, Serviço e Mensagem).",
      });
    }

    const scriptUrl = process.env.GOOGLE_SHEETS_SCRIPT_URL;

    const payload = {
      timestamp: new Date().toISOString(),
      name,
      whatsapp,
      email,
      company: company || "Não informado",
      service,
      budget: budget || "Não informado",
      message,
      origin: origin || "Formulário de Contato",
    };

    console.log("=== NOVA SOLICITAÇÃO DE ORÇAMENTO ===");
    console.log(JSON.stringify(payload, null, 2));

    if (scriptUrl && scriptUrl.trim() !== "") {
      // Forward the request to Google Apps Script Web App
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
    } else {
      // Sandbox mode - no script URL set
      console.log("⚠️ GOOGLE_SHEETS_SCRIPT_URL não configurada no .env. Executando em modo Sandbox/Simulação.");
      return res.status(200).json({
        success: true,
        sandbox: true,
        message: "Solicitação recebida com sucesso no servidor (Modo Simulação/Sandbox)! Configure a variável GOOGLE_SHEETS_SCRIPT_URL para integrar com a planilha real.",
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
