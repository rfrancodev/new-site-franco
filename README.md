# Portfólio Profissional — Rafael Franco

> **Especialista em Sistemas, Dados e Inteligência Artificial**
>
> Uma plataforma full-stack moderna, elegante e de altíssima performance, projetada para apresentar soluções de alto impacto para negócios: Desenvolvimento de Software, Business Intelligence, Automações Inteligentes e IA Generativa.

---

## 🎨 Visão Geral do Projeto

Este projeto foi construído sob a premissa de **tecnologia com foco em resultados reais**. Mais do que um portfólio convencional, ele é uma aplicação corporativa robusta e um excelente exemplo de arquitetura web moderna que conecta o usuário final diretamente a ecossistemas de automação modernos, como o **n8n** e o **Google Sheets**.

O design utiliza um **tema escuro sofisticado e de alto contraste (Emerald Dark)**, com tipografia refinada, espaçamento generoso e micro-interações fluidas orientadas a guiar a jornada de conversão do visitante (leads).

---

## 🛠️ Stack Tecnológica

O ecossistema do projeto foi selecionado estrategicamente para fornecer escalabilidade, segurança, facilidade de manutenção e desempenho superior:

*   **Frontend (SPA):**
    *   **React 18** com **Vite** (para um ciclo ágil de desenvolvimento e build otimizado).
    *   **Tailwind CSS** (design utilitário responsivo e refinado).
    *   **Framer Motion** (transições fluidas de tela e efeitos de scroll).
    *   **Lucide React** (biblioteca consistente e moderna de ícones vetoriais).
    *   **Vanilla 3D Tilt Card (Framer Motion / JS):** Componentes tridimensionais responsivos que reagem ao mouse/toque.
*   **Backend (API Server):**
    *   **Node.js** & **Express** em TypeScript (utilizando `tsx` para desenvolvimento e compilação integrada com `esbuild`).
    *   **Servidor de Proxy de APIs:** Protege endpoints externos mantendo credenciais de maneira 100% segura no servidor (nunca expostas ao browser).
*   **Integrações & Automação:**
    *   **Integração prioritária via Webhook do n8n** para automação de CRM, marketing ágil, disparos de mensagens e gerenciamento inteligente de leads.
    *   **Integração de Fallback via Google Apps Script (Google Sheets)** para armazenamento automatizado e estruturado de dados.
*   **DevOps & Infraestrutura:**
    *   **Docker & Docker Compose** (conteinerização completa do ambiente).
    *   **Nginx** (Proxy Reverso com cache otimizado e terminação SSL).
    *   **VPS (Virtual Private Server)** pronta para escalabilidade.

---

## 🚀 Funcionalidades de Destaque

1.  **Conteúdo 100% Centralizado e Internacionalizável:**
    *   Toda a cópia, títulos, slogans, depoimentos, diferenciais e especialidades do site estão centralizados em `/src/content/content.json`. Alterar um texto ou traduzir o site inteiro leva poucos minutos, sem mexer no código dos componentes React.
2.  **Formulário de Orçamentos com Dupla Camada de Validação:**
    *   **No Cliente (React):** Máscara automática de digitação inteligente para o WhatsApp, validação do padrão RFC de e-mails, validações de tamanho mínimo para evitar mensagens vazias ou inválidas.
    *   **No Servidor (Express):** Sanitização rigorosa dos dados antes de qualquer repasse para webhooks, garantindo a integridade dos dados integrados à API.
3.  **Roteamento Inteligente de Webhooks:**
    *   O servidor analisa as variáveis de ambiente em tempo de execução. Se encontrar `N8N_WEBHOOK_URL`, os dados do formulário são disparados para o fluxo do n8n instantaneamente. Se encontrar `GOOGLE_SHEETS_SCRIPT_URL`, faz o salvamento na planilha do Google Sheets. Caso nenhuma esteja presente, entra em modo **Sandbox Seguro** explicando o funcionamento.

---

## 📁 Estrutura de Pastas e Arquivos

```text
├── .env.example             # Modelo de configuração de variáveis de ambiente
├── server.ts                # Servidor backend Express (API & Produção SPA)
├── vite.config.ts           # Configurações do ecossistema Vite + Plugins
├── metadata.json            # Metadados de permissões e capacidades do applet
├── package.json             # Dependências e scripts de automação do projeto
├── src/
│   ├── main.tsx             # Arquivo de bootstrap do React
│   ├── App.tsx              # Componente principal, unificando as seções do site
│   ├── index.css            # Folha de estilos global (Tailwind + Imports de Fontes)
│   ├── assets/              # Assets estáticos de mídia (imagens e ilustrações)
│   ├── components/          # Componentes altamente modulares do site
│   │   ├── Navbar.tsx            # Menu de navegação responsivo flutuante
│   │   ├── HeroSection.tsx       # Seção Hero com chamadas e destaques em gradiente
│   │   ├── ServicesSection.tsx   # Vitrine de serviços prestados
│   │   ├── AboutSection.tsx      # Sobre mim, Cards de Autoridade e Especialidades
│   │   ├── ProjectsSection.tsx   # Portfólio com foco em Impacto no Negócio e Desafios
│   │   ├── TestimonialsSection.tsx# Prova social e depoimentos de clientes
│   │   ├── ContactSection.tsx    # Formulário avançado com tratamento de erros
│   │   ├── Footer.tsx            # Rodapé institucional elegante
│   │   ├── TiltCard.tsx          # Componente reutilizável para efeito parallax 3D
│   │   └── LucideIcon.tsx        # Renderizador dinâmico de ícones Lucide
│   └── content/
│       └── content.json     # Single Source of Truth para todos os textos do site
```

---

## 🔧 Como Executar e Configurar

### Prerrequisitos
Instale o [Node.js](https://nodejs.org/) (versão 18 ou superior).

### 1. Clonar e Instalar as Dependências
```bash
# Instalar pacotes necessários declarados no package.json
npm install
```

### 2. Configurar as Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:

```env
# URL do Webhook do seu fluxo de automação no n8n (Prioridade máxima)
N8N_WEBHOOK_URL="https://seu-n8n.com/webhook/caminho-da-sua-automacao"

# URL do Google Apps Script configurado como Web App (Fallback caso queira salvar em planilhas)
GOOGLE_SHEETS_SCRIPT_URL="https://script.google.com/macros/s/SUA_CHAVE_AQUI/exec"
```

### 3. Executar o Servidor em Desenvolvimento
```bash
# Executa o servidor Express e o middleware do Vite concorrentemente em tempo real
npm run dev
```
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### 4. Build de Produção
Para compilar a aplicação de forma otimizada para implantar em produção:
```bash
npm run build
```
Esse comando irá:
1. Compilar o frontend React para código estático otimizado em `/dist`.
2. Compilar o servidor backend `server.ts` em um bundle único CommonJS (`dist/server.cjs`) de alta performance via `esbuild`.

Para iniciar o servidor compilado:
```bash
npm start
```

---

## 💡 Guia de Referência de Boas Práticas (Para outros Desenvolvedores)

Se você está usando este portfólio como referência para o seu próprio projeto, aqui estão alguns conceitos de excelência para observar no código:

*   **Padrão Single Source of Truth para Cópia Textual:** Evite espalhar strings de texto estáticas por dentro de componentes React. Centralize tudo no `content.json`. Isso torna o seu código infinitamente mais limpo e legível.
*   **Abstração Dinâmica de Ícones:** Veja o componente `LucideIcon.tsx`. Em vez de importar dezenas de ícones em cada componente de visualização, passamos a string do ícone mapeada no JSON e renderizamos dinamicamente, mantendo o bundle leve e as importações limpas.
*   **Formulários Resilientes:** Sempre valide as informações na entrada (UI) e antes do processamento (Servidor). Formulários de contato que expõem chaves ou enviam dados sem validação no servidor tornam a aplicação vulnerável a SPAM e ataques.
*   **Compilação Híbrida em Produção:** O uso do `esbuild` para compilar o servidor Express unifica dependências e resolve problemas de resolução de caminhos nativos do ES Modules no Node, mantendo a inicialização do container rápida em servidores VPS.

---

*Desenvolvido com foco em excelência técnica, design moderno e geração de valor de negócios.*
