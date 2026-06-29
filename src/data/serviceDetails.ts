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
    title: "Business Intelligence & Dashboards Power BI",
    description: "Transforme dados brutos em inteligência corporativa com dashboards integrados e atualizados.",
    icon: "BarChart3",
    details: "Centralização e modelagem de dados provenientes de ERPs, CRMs, planilhas e bancos de dados SQL. Implementação de KPIs de negócio em relatórios visuais dinâmicos e de alta performance, permitindo que a liderança da empresa tenha clareza absoluta sobre o desempenho financeiro, comercial e de estoque.",
    applications: [
      {
        title: "DRE Automática e Fluxo de Caixa",
        description: "Acompanhamento diário de entradas, saídas, margem de contribuição e custos fixos/variáveis sem preenchimento manual."
      },
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
    description: "Conecte seus sistemas de forma inteligente e elimine o retrabalho manual.",
    icon: "Cpu",
    details: "Integração direta entre plataformas e sistemas via APIs (com ou sem ferramentas de integração como n8n/Make). Desenvolvimento de fluxos de trabalho que realizam tarefas repetitivas automaticamente, diminuindo drasticamente erros operacionais e liberando a equipe para focar no crescimento do negócio.",
    applications: [
      {
        title: "Emissão de Notas Fiscais Sincronizada",
        description: "Sistemas integrados de checkout que capturam a venda e acionam o emissor de notas fiscais de forma instantânea."
      },
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
    title: "Desenvolvimento de Sites Profissionais",
    description: "Páginas institucionais e Landing Pages focadas em máxima conversão e SEO impecável.",
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
    title: "Desenvolvimento de Sistemas Web Sob Medida",
    description: "Sistemas robustos construídos sob medida para suprir as lacunas operacionais do seu negócio.",
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
    title: "Inteligência Artificial para Empresas",
    description: "Integre Inteligência Artificial diretamente à sua operação para ganhar escala e velocidade.",
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
    title: "Infraestrutura Cloud, Docker & VPS",
    description: "Hospedagem profissional com alta disponibilidade, monitoramento e segurança avançada.",
    icon: "Server",
    details: "Arquitetura e configuração de servidores virtuais (VPS) e serviços de nuvem nas principais plataformas (GCP, AWS, Oracle Cloud, DigitalOcean). Garantimos que suas aplicações rodem isoladas e seguras através do Docker, sob proteção do Nginx de forma veloz e resiliente.",
    applications: [
      {
        title: "Conteinerização com Docker e Compose",
        description: "Padronização e empacotamento de toda a aplicação para execução em ambientes consistentes, eliminando o clássico 'na minha máquina funciona'."
      },
      {
        title: "Proxy Reverso e Roteamento Seguro (Nginx)",
        description: "Roteamento otimizado de domínios, balanceamento de tráfego pesado e renovação automatizada de certificados digitais SSL."
      },
      {
        title: "Ambientes de CI/CD e Backup em Nuvem",
        description: "Deploys automáticos a cada atualização de código no repositório, combinados com rotinas diárias e criptografadas de backup externo."
      }
    ]
  },
  "consultoria": {
    id: "consultoria",
    title: "Consultoria em Tecnologia e Transformação Digital",
    description: "Análise profunda para definir a arquitetura correta e as melhores ferramentas para sua jornada digital.",
    icon: "HelpCircle",
    details: "Consultoria técnica estratégica que avalia os gargalos tecnológicos e de automação da sua empresa. Através de diagnósticos claros, desenhamos arquiteturas de soluções que resolvem gargalos de escalabilidade, evitam custos excessivos com ferramentas inadequadas e aceleram seu crescimento.",
    applications: [
      {
        title: "Auditoria e Mapeamento de Processos",
        description: "Revisão detalhada de como o fluxo de trabalho opera hoje para identificar quais setores perdem mais tempo em tarefas manuais."
      },
      {
        title: "Escolha e Implementação de Tecnologias",
        description: "Auxílio na seleção da pilha de tecnologia (Tech Stack) correta que se conecta perfeitamente ao seu software corporativo já existente."
      },
      {
        title: "Modelagem e Governança de Dados",
        description: "Estruturação de bancos de dados para que as análises futuras de BI sejam íntegras, seguras, rápidas e auditáveis."
      }
    ]
  }
};
