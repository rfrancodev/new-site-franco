export interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string;
  applications: {
    title: string;
    description: string;
  }[];
}

export const serviceDetails: Record<string, ServiceDetail> = {
  "power-bi": {
    id: "power-bi",
    title: "Dashboards Inteligentes para Gestão",
    description: "Centralize indicadores em dashboards Power BI e acompanhe vendas, desempenho e resultados em tempo real para tomar decisões mais rápidas e estratégicas.",
    icon: "BarChart3",
    details: "Centralização e modelagem de dados provenientes de ERPs, CRMs, planilhas e bancos de dados SQL. Implementação de KPIs de negócio em relatórios visuais dinâmicos e de alta performance, permitindo que a liderança da empresa tenha clareza absoluta sobre o desempenho financeiro, comercial e de estoque.",
    applications: [
      {
        title: "Painel Comercial e Funil de Vendas",
        description: "Análise da performance do time de vendas, faturamento por região, ticket médio e produtos mais rentáveis."
      },
      {
        title: "Indicadores de Logística e Estoque",
        description: "Monitoramento de giro de estoque, inventário atualizado em tempo real e avisos inteligentes de ponto de ressuprimento."
      }
    ]
  },
  "automacao": {
    id: "automacao",
    title: "Automação de Processos Empresariais",
    description: "Elimine tarefas repetitivas, reduza erros operacionais e economize horas de trabalho com automações inteligentes, integrações e robôs personalizados.",
    icon: "Cpu",
    details: "Integração direta entre plataformas e sistemas via APIs. Desenvolvimento de fluxos de trabalho que realizam tarefas repetitivas automaticamente, diminuindo drasticamente erros operacionais e liberando a equipe para focar no crescimento do negócio.",
    applications: [
      {
        title: "Sincronização de CRM e Operação",
        description: "Migração automática de leads qualificados do marketing para o CRM comercial e tarefas automáticas para o time de pré-vendas."
      },
      {
        title: "Alertas e Notificações de Vencimento",
        description: "Disparo automático de mensagens no WhatsApp e e-mail com cobranças, contratos a vencer ou avisos críticos de sistema."
      }
    ]
  },
  "sites": {
    id: "sites",
    title: "Sites e Landing Pages que Geram Clientes",
    description: "Desenvolvimento de sites profissionais, rápidos e otimizados para SEO, criados para transmitir credibilidade e gerar novas oportunidades de negócio.",
    icon: "Globe",
    details: "Desenvolvimento sob medida utilizando tecnologias modernas focadas na velocidade extrema de carregamento, design responsivo de altíssimo nível, legibilidade otimizada e acessibilidade. Todos os projetos seguem os melhores critérios de otimização de motores de busca (SEO) para atrair leads orgânicos.",
    applications: [
      {
        title: "Landing Pages de Alta Conversão",
        description: "Foco total na experiência de conversão imediata de visitantes vindos de anúncios do Google e Meta Ads em leads."
      },
      {
        title: "Sites Institucionais Robustos",
        description: "Apresentação impecável da sua marca no ambiente digital com portfólio dinâmico, seção de blog e integrações diretas."
      },
      {
        title: "Páginas de Lançamento Ultra-Rápidas",
        description: "Desenvolvidas para suportar milhares de acessos simultâneos por segundo com tempo de resposta quase instantâneo."
      }
    ]
  },
  "sistemas": {
    id: "sistemas",
    title: "Sistemas Web Sob Medida",
    description: "Sistemas desenvolvidos para automatizar sua operação, substituir planilhas, integrar processos e acompanhar o crescimento da empresa.",
    icon: "LayoutGrid",
    details: "Criação de softwares customizados desde a concepção do banco de dados até a interface do usuário final. Ideal para empresas que possuem processos complexos não atendidos por ferramentas prontas de prateleira ou que desejam lançar um produto digital (SaaS) no mercado.",
    applications: [
      {
        title: "Plataformas SaaS e Assinaturas",
        description: "Desenvolvimento de aplicações com controle de acesso, planos mensais, integrações de pagamento e relatórios internos."
      },
      {
        title: "Áreas de Membros e Portal do Cliente",
        description: "Ambiente privado para que parceiros e clientes realizem uploads de documentos, acompanhem o progresso do projeto e emitam ordens de serviço."
      },
      {
        title: "Sistemas ERP & Financeiros Customizados",
        description: "Controle absoluto de estoque, finanças, compras e produção de forma centralizada e sem limitações de licenças externas."
      }
    ]
  },
  "ia": {
    id: "ia",
    title: "Agentes de Inteligência Artificial",
    description: "Implantação de agentes de IA e chatbots inteligentes para atendimento, suporte, vendas e automação de processos, disponíveis 24 horas por dia.",
    icon: "Sparkles",
    details: "Criação de agentes inteligentes e assistentes treinados com a base de conhecimento específica do seu negócio. Utilizando modelos de linguagem modernos (como a API do Gemini e LLMs líderes), automatizamos a triagem comercial, respondemos dúvidas complexas e analisamos grandes conjuntos de texto em frações de segundos.",
    applications: [
      {
        title: "Triagem e Qualificação Comercial (WhatsApp)",
        description: "Assistentes integrados ao WhatsApp que fazem o atendimento inicial, validam o lead e direcionam apenas casos qualificados para o vendedor humano."
      },
      {
        title: "Análise Inteligente de Documentos",
        description: "IA customizada para ler PDF, DOCX e tabelas, extraindo contratos, comparando cláusulas jurídicas e identificando riscos de forma imediata."
      },
      {
        title: "Base de Conhecimento e FAQ Dinâmico",
        description: "Central de inteligência para o time interno consultar políticas da empresa, manuais técnicos ou diretrizes de vendas de forma interativa."
      }
    ]
  },
  "vps": {
    id: "vps",
    title: "Infraestrutura Cloud e DevOps",
    description: "Implantação de servidores VPS, Docker e infraestrutura em nuvem para manter seus sistemas rápidos, seguros, escaláveis e sempre disponíveis.",
    icon: "Server",
    details: "Arquitetura e configuração de servidores virtuais (VPS) e serviços de nuvem. Garantimos que suas aplicações rodem isoladas e seguras através do Docker, sob proteção do Nginx de forma veloz e resiliente.",
    applications: [
      {
        title: "Conteinerização com Docker e Compose",
        description: "Padronização e empacotamento de toda a aplicação para execução em ambientes consistentes, eliminando o clássico 'na minha máquina funciona'."
      },
      {
        title: "Proxy Reverso e Roteamento Seguro (Nginx)",
        description: "Roteamento otimizado de domínios e balanceamento de tráfego pesado."
      },
      {
        title: "Ambientes de CI/CD e Backup em Nuvem",
        description: "Deploys automáticos a cada atualização de código no repositório, combinados com rotinas diárias e criptografadas de backup externo."
      }
    ]
  },
  "consultoria": {
    id: "consultoria",
    title: "Integrações entre Sistemas e APIs",
    description: "Conecte ERPs, CRMs, bancos de dados, APIs e outras plataformas para eliminar retrabalho, automatizar processos e garantir que as informações circulem de forma integrada e segura.",
    icon: "HelpCircle",
    details: "Criação de pontes de dados seguras e robustas que interligam suas ferramentas (ERP, CRM, gateways de pagamento, e-commerce, bancos de dados locais). Mapeamento de APIs existentes ou desenvolvimento de webhooks sob medida para que seus sistemas trabalhem sincronizados de ponta a ponta sem intervenção humana.",
    applications: [
      {
        title: "Sincronização entre CRM e ERP",
        description: "Integração bidirecional automática para manter cadastros de clientes, faturamento, estoque e status de pedidos sempre alinhados."
      },
      {
        title: "Integrações com Meios de Pagamento",
        description: "Conexão nativa com gateways (Stripe, Asaas, Mercado Pago) para conciliação automática, cobranças recorrentes e tratamento de inadimplência."
      },
      {
        title: "Webhooks e Processamento em Tempo Real",
        description: "Disparo instantâneo de ações em outros sistemas quando um evento específico ocorre, garantindo eficiência sem delay operacional."
      }
    ]
  }
};
