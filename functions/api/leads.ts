interface Env {
  DB?: {
    prepare: (query: string) => {
      bind: (...args: any[]) => {
        run: () => Promise<any>;
        all: () => Promise<{ results: any[] }>;
      };
      run: () => Promise<any>;
      all: () => Promise<{ results: any[] }>;
    };
    exec: (query: string) => Promise<any>;
  };
  N8N_WEBHOOK_URL?: string;
}

// Interface estendida com o método waitUntil obrigatório para o Cloudflare Workers
interface RequestContext {
  request: Request;
  env: Env;
  waitUntil: (promise: Promise<any>) => void;
}

const CORS_HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// URL única do fluxo da Ana Flávia dentro do seu n8n
const N8N_WEBHOOK_URL = "https://n8n.francorafael.com/webhook/69bf5cb1-ea37-4ee3-a313-f5cfe13a50a0";

// OPTIONS handler for preflight requests
export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

// GET /api/leads - Retrieve all leads sorted by date descending
export async function onRequestGet(context: RequestContext): Promise<Response> {
  const { env } = context;

  if (!env.DB) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "D1 Database 'DB' binding is missing in Cloudflare Pages."
      }),
      { status: 500, headers: CORS_HEADERS }
    );
  }

  try {
    const { results } = await env.DB.prepare("SELECT * FROM leads ORDER BY id DESC").all();
    return new Response(
      JSON.stringify({ success: true, leads: results }),
      { status: 200, headers: CORS_HEADERS }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message || "Failed to query leads database." }),
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

// POST /api/leads - Create a new lead and sync with n8n
export async function onRequestPost(context: RequestContext): Promise<Response> {
  const { request, env, waitUntil } = context;

  if (!env.DB) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "D1 Database 'DB' binding is missing in Cloudflare Pages."
      }),
      { status: 500, headers: CORS_HEADERS }
    );
  }

  try {
    const contentType = request.headers.get("content-type") || "";
    let data: any = {};

    if (contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await request.formData();
      for (const [key, value] of formData.entries()) {
        data[key] = value;
      }
    } else {
      data = await request.json();
    }

    // Extract fields dynamically from either JSON or Form data
    const name = (data.name || "").trim();
    const email = (data.email || "").trim().toLowerCase();
    const phone = (data.whatsapp || data.phone || "").trim();
    const company = (data.company || "").trim();
    const segment = (data.service || data.segment || "Não Especificado").trim();
    const budget = (data.budget || "").trim();
    const rawMessage = (data.message || "").trim();

    // Validations (Company is optional in this project!)
    if (!name || !phone || !email || !rawMessage) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Campos obrigatórios ausentes. Certifique-se de enviar nome, email, whatsapp e mensagem." 
        }),
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const leadId = data.id || Date.now().toString();
    const leadDate = data.date || new Date().toISOString();

    // Concatena o orçamento à mensagem para salvar no D1 sem alterar a estrutura da tabela
    const leadMessage = budget ? `[Orçamento Estimado: ${budget}] ${rawMessage}` : rawMessage;

    // 1. Salva no banco de dados D1 local da Cloudflare
    await env.DB.prepare(
      "INSERT OR REPLACE INTO leads (id, name, company, phone, segment, email, message, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    )
      .bind(
        leadId,
        name,
        company,
        phone,
        segment,
        email,
        leadMessage,
        leadDate
      )
      .run();

    // 2. Monta o objeto estruturado completo para enviar ao n8n
    const payloadParaN8n = {
      id: leadId,
      name,
      company,
      phone,
      whatsapp: phone,
      segment,
      service: segment,
      budget,
      email,
      message: rawMessage,
      fullMessage: leadMessage,
      date: leadDate,
      source: "francorafael.com"
    };

    // 3. Envia os dados de forma assíncrona para o n8n sem atrasar o carregamento da página do usuário
    waitUntil(
      fetch(env.N8N_WEBHOOK_URL || N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "X-Source-Application": "Cloudflare-Pages" 
        },
        body: JSON.stringify(payloadParaN8n)
      }).catch(err => console.error("Falha ao enviar lead para o n8n:", err))
    );

    return new Response(
      JSON.stringify({ success: true, lead: payloadParaN8n }),
      { status: 201, headers: CORS_HEADERS }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message || "Failed to insert lead into database." }),
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

// DELETE /api/leads - Clear all leads (Administrative)
export async function onRequestDelete(context: RequestContext): Promise<Response> {
  const { env } = context;

  if (!env.DB) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "D1 Database 'DB' binding is missing in Cloudflare Pages."
      }),
      { status: 500, headers: CORS_HEADERS }
    );
  }

  try {
    await env.DB.prepare("DELETE FROM leads").run();
    return new Response(
      JSON.stringify({ success: true, message: "All leads cleared from D1 database." }),
      { status: 200, headers: CORS_HEADERS }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message || "Failed to clear leads from database." }),
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
