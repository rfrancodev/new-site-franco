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
  };
  N8N_WEBHOOK_URL?: string;
}

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

// OPTIONS handler para requisições de preflight (CORS)
export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

// GET /api/leads - Recupera os dados da tabela leads_franco
export async function onRequestGet(context: RequestContext): Promise<Response> {
  const { env } = context;

  if (!env.DB) {
    return new Response(
      JSON.stringify({ success: false, error: "D1 Database 'DB' binding is missing." }),
      { status: 500, headers: CORS_HEADERS }
    );
  }

  try {
    const { results } = await env.DB.prepare("SELECT * FROM leads_franco ORDER BY date DESC").all();
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

// POST /api/leads - Cria o lead na tabela leads_franco e sincroniza com o n8n
export async function onRequestPost(context: RequestContext): Promise<Response> {
  const { request, env, waitUntil } = context;

  if (!env.DB) {
    return new Response(
      JSON.stringify({ success: false, error: "D1 Database 'DB' binding is missing." }),
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

    const name = (data.name || "").trim();
    const email = (data.email || "").trim().toLowerCase();
    const whatsapp = (data.whatsapp || data.phone || "").trim();
    const company = (data.company || "").trim();
    const segment = (data.segment || "Não Especificado").trim();
    const service = (data.service || data.segment || "Não Especificado").trim();
    const budget = (data.budget || "").trim();
    const rawMessage = (data.message || "").trim();

    if (!name || !whatsapp || !email || !rawMessage) {
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
    const leadMessage = budget ? `[Orçamento Estimado: ${budget}] ${rawMessage}` : rawMessage;
    const fullMessage = leadMessage; 
    const source = data.source || "francorafael.com";

    // Gravação exata na tabela leads_franco confirmada no seu painel D1
    await env.DB.prepare(
      `INSERT OR REPLACE INTO leads_franco (
        id, name, company, whatsapp, segment, service, budget, email, message, fullmessage, date, source
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        leadId, 
        name, 
        company, 
        whatsapp, 
        segment, 
        service, 
        budget, 
        email, 
        rawMessage, 
        fullMessage, 
        leadDate, 
        source
      )
      .run();

    const payloadParaN8n = {
      id: leadId,
      name,
      company,
      whatsapp,
      segment,
      service,
      budget,
      email,
      message: rawMessage,
      fullMessage,
      date: leadDate,
      source
    };

    // Envia os dados de forma assíncrona para o n8n se a variável de ambiente estiver configurada no painel Cloudflare
    if (env.N8N_WEBHOOK_URL) {
      waitUntil(
        fetch(env.N8N_WEBHOOK_URL, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "X-Source-Application": "Cloudflare-Pages" 
          },
          body: JSON.stringify(payloadParaN8n)
        }).catch(err => console.error("Falha ao enviar lead para o n8n:", err))
      );
    } else {
      console.warn("Aviso: N8N_WEBHOOK_URL não configurada no painel da Cloudflare. O lead foi salvo no D1, mas não enviado ao n8n.");
    }

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

// DELETE /api/leads - Limpa a tabela leads_franco (Administrativo)
export async function onRequestDelete(context: RequestContext): Promise<Response> {
  const { env } = context;

  if (!env.DB) {
    return new Response(
      JSON.stringify({ success: false, error: "D1 Database 'DB' binding is missing." }),
      { status: 500, headers: CORS_HEADERS }
    );
  }

  try {
    await env.DB.prepare("DELETE FROM leads_franco").run();
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
