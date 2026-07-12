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
    *   Toda a cópia, títulos, slogans, depoimentos, diferenciais, especialidades e até as informações estruturadas dos pop-ups/modais de serviços do site estão centralizados em `/src/content/content.json`. Alterar um texto ou traduzir o site inteiro leva poucos minutos, sem mexer no código dos componentes React.
2.  **Formulário de Orçamentos com Dupla Camada de Validação:**
    *   **No Cliente (React):** Máscara automática de digitação inteligente para o WhatsApp, validação do padrão RFC de e-mails, validações de tamanho mínimo para evitar mensagens vazias ou inválidas.
    *   **No Servidor (Express):** Sanitização rigorosa dos dados antes de qualquer repasse para webhooks, garantindo a integridade dos dados integrados à API.
    *   **Tratamento de Erros Robusto:** Retornos HTTP ricos e informativos com descritivos amigáveis e específicos de erros do n8n (como Webhook Inativo/HTTP 404, Falha de Autenticação/HTTP 401/403 ou erros internos no painel de automação) e do Google Sheets para facilitar a depuração e dar feedback preciso ao usuário.
3.  **Roteamento Inteligente de Webhooks:**
    *   O servidor analisa as variáveis de ambiente em tempo de execução. Se encontrar `N8N_WEBHOOK_URL`, os dados do formulário são disparados para o fluxo do n8n instantaneamente. Se encontrar `GOOGLE_SHEETS_SCRIPT_URL`, faz o salvamento na planilha do Google Sheets. Caso nenhuma esteja presente, entra em modo **Sandbox Seguro** explicando o funcionamento.
4.  **Simulador de Código Interativo "Solutions Engine":**
    *   **Typing Animation Infinita:** Um simulador realista de digitação de código Python que renderiza recursivamente e em tempo de execução a sintaxe estruturada da classe `SolucaoDigital`.
    *   **Performance Progressiva Dinâmica:** Um contador numérico de crescimento animado acompanhando um progresso de barra dinâmico e contínuo para a métrica de "Performance de Vendas" de 0% até +238.4%, sincronizado com a meta e o progresso em tempo real.
    *   **Estabilidade Visual e Responsividade:** Dimensões de contêiner calibradas de forma fixa (`h-[290px] sm:h-[330px]`) para evitar qualquer variação ou salto visual (layout shift) durante o ciclo da animação de digitação em qualquer dispositivo.

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

### 5. Comando de Deploy (Deploy Command)
Para publicar a aplicação em produção, você pode usar os comandos abaixo dependendo do seu ambiente de hospedagem:

#### Opção A: Deploy no Google Cloud Run (Altamente Recomendado)
Esta aplicação full-stack está empacotada e pronta para ser implantada diretamente no **Google Cloud Run**. Execute o comando a seguir no terminal para compilar e implantar em minutos:
```bash
gcloud run deploy portfolio-rafael-franco \
  --source . \
  --port 3000 \
  --allow-unauthenticated \
  --set-env-vars="N8N_WEBHOOK_URL=SUA_URL_AQUI"
```

#### Opção B: Deploy via Docker Container
Se estiver hospedando em VPS tradicional (DigitalOcean, AWS, Hetzner, etc.), você pode construir e rodar um container Docker:
```bash
# Build local da imagem Docker
docker build -t portfolio-rafael-franco .

# Executar o container mapeando a porta 3000
docker run -d -p 3000:3000 --env-file .env --name portfolio-app portfolio-rafael-franco
```

---

## 🔗 Integração com o n8n e Fluxo de Automação

O formulário de contato do site é integrado ao **n8n** através de uma ponte resiliente, inteligente e segura configurada no backend Express (`server.ts`). Isso protege a URL do seu webhook e garante validações de segurança cruciais antes de despachar os leads.

### Formato de Envio dos Dados (JSON Payload)
O backend Express recebe os dados do formulário de contato, valida os campos e envia a requisição HTTP POST para o seu webhook do n8n utilizando o seguinte formato JSON estruturado:

```json
{
  "timestamp": "2026-07-11T20:21:07.655Z",
  "name": "Rafael Franco Teste Produção",
  "whatsapp": "(35) 99999-9999",
  "email": "rfrancodev@gmail.com",
  "company": "Franco Digital",
  "service": "IA Generativa",
  "budget": "R$ 5.000 a R$ 10.000",
  "message": "Este é um teste real enviado automaticamente com o fluxo de produção ativo!",
  "origin": "Formulário de Orçamento - site Franco Desenvolvedor"
}
```

### Inteligência de Roteamento e Normalização Dinâmica (Path Translation)
Para garantir que a aplicação continue funcionando de forma transparente e imediata mesmo diante de alterações estruturais na automação do n8n, implementamos uma lógica de **normalização dinâmica de caminhos**:
*   **O Problema:** Caso a planilha mude de nome (ex: `Leads-site` no Google Sheets) e o endpoint do webhook mude para `/leads-site`, mas as variáveis de ambiente (`.env` ou configs de Cloud Run) ainda estejam apontando para endpoints antigos (como `/formulario-contato` ou `/formulario-site`).
*   **A Solução:** O backend Express (`server.ts`) analisa automaticamente as URLs configuradas nas variáveis de ambiente em tempo de execução. Qualquer menção a caminhos legados é traduzida instantaneamente para `/leads-site` antes do envio, evitando falhas de comunicação e retrabalho de re-implantação.

### Tratamento Avançado de Erros e Resiliência
Desenvolvemos uma camada de inteligência no backend dedicada a interceptar as respostas do n8n para melhorar a experiência do usuário e garantir taxas máximas de conversão:

1. **Tratamento de "Respond to Webhook" Ausente ou Não Utilizado (HTTP 500 do n8n):**
   * *Cenário:* Se o seu fluxo do n8n for acionado com sucesso, mas o workflow retornar erros como `No Respond to Webhook node found in the workflow` ou `Unused Respond to Webhook node found in the workflow`, o n8n responde com status de erro HTTP 500.
   * *Solução:* O backend Express intercepta essa mensagem específica e **interpreta como Sucesso**, pois a automação de fato iniciou. Ele informa ao usuário final que o formulário foi enviado e adiciona um aviso técnico informativo sobre como ajustar a resposta do webhook no painel do n8n (mudando a configuração "Respond" do nó Webhook de "When last node finishes" para "Immediately", ou conectando corretamente o nó de resposta).
2. **Tratamento de Falhas Internas de Execução (HTTP 500 de Workflow):**
   * *Cenário:* Caso o n8n receba os dados do lead, mas algum nó interno do seu workflow falhe (ex: falha ao salvar na planilha, erro de API do CRM ou credenciais expiradas), ele retorna `There was a problem executing the workflow`.
   * *Solução:* O backend capta esse erro e exibe uma dica amigável e focada na depuração, recomendando que o administrador verifique a aba **"Executions" (Execuções)** ou logs de erro no painel do n8n para identificar qual nó específico falhou.
3. **Detecção de Webhook Não Publicado (HTTP 404):**
   * Se o webhook retornar `404 - Not Found` (comum ao esquecer de ativar o fluxo de produção ou ao usar URL de teste expirada), a aplicação informa de forma didática os procedimentos para publicar e ativar o workflow no n8n.
4. **Mecanismo de Redirecionamento Automático de Contingência (WhatsApp):**
   * *Cenário:* Caso ocorra alguma falha de conexão com o servidor Express, expiração ou falha técnica no webhook do n8n (ex: HTTP 404).
   * *Solução (Foco em UX e Resiliência):* 
     * **Redução de Ruído Cognitivo (Anti-Susto):** Removemos qualquer ícone de alerta agressivo (triângulos de atenção) e detalhes técnicos brutos do erro do console (como logs de HTTP 404) para evitar assustar ou confundir o cliente. O visual permanece elegante, limpo e integrado à identidade visual escura e moderna do portfólio.
     * **Redirecionamento Inteligente de 3 segundos:** Apresentamos um indicador visual circular de carregamento progressivo e um countdown de 3 segundos. Logo após esse intervalo, o sistema executa o envio automático das informações salvas diretamente para o WhatsApp do Rafael (`35 999057566`).
     * **Prevenção de Páginas Brancas (Controle de Iframe & Segurança):**
       * Links do WhatsApp (`wa.me`) possuem cabeçalhos de segurança estritos como `X-Frame-Options: DENY`, o que impede sua exibição dentro de iframes (como o ambiente de visualização do AI Studio ou portais incorporados), gerando uma tela branca.
       * Para solucionar isso, o sistema tenta abrir em uma nova aba com `window.open()`. Se o bloqueador de pop-ups do navegador ou as restrições do iframe impedirem, o código detecta e executa um redirecionamento seguro da página de nível superior (`window.top.location.href`) por meio de tratamento de exceções cross-origin (`try-catch`).
       * Como uma última linha de defesa opcional contra bloqueadores de pop-ups rigorosos, quando o tempo esgota, um link direto amigável e focado em conversão é exibido no painel para que o lead possa clicar e iniciar a conversa com um único clique.
     * **Controle de Navegação:** O cliente sempre mantém o controle, com um botão nítido de **"Voltar e Tentar Novamente"** para poder corrigir informações ou re-submeter o formulário quando quiser.

---

## 🎨 Otimizações de Visual e Interface de Sucesso

Dando continuidade à busca constante por sofisticação e fidelidade de marca, refinamos significativamente o design dos botões de ação na tela de envio bem-sucedido:
*   **Centralização & Alinhamento Perfeito:** Os botões foram reconstruídos em um fluxo flexível responsivo (`flex-col sm:flex-row`), centralizados no eixo médio horizontal e dimensionados harmoniosamente (`w-full sm:w-auto px-8 py-3.5`).
*   **Micro-interações de Hover:** Adição de efeitos suaves de deslocamento vertical (`transform hover:-translate-y-0.5`) e expansão de sombras coloridas (`shadow-lg shadow-emerald-500/10 hover:shadow-xl hover:shadow-emerald-500/20`) para dar uma resposta tátil de alta qualidade aos cliques e interações.
*   **Prevenção de Quebras de Linha:** Uso da classe `whitespace-nowrap` para assegurar que a tipografia permaneça íntegra, elegante e de fácil leitura em qualquer largura de tela.

---

## 🚀 Hospedagem Híbrida: Cloudflare Pages + Cloud Run

Caso você decida hospedar o **frontend (React)** de forma estática no **Cloudflare Pages** e o **backend (Express)** em um container no **Google Cloud Run** (ou outro servidor VPS/Docker):

1. **Ative as Requisições Cross-Origin (CORS):**
   * O backend Express já possui suporte nativo e seguro a CORS pré-configurado no arquivo `server.ts` para receber e responder às requisições originárias do seu domínio no Cloudflare Pages.

2. **Configure a Variável de Ambiente no Cloudflare Pages (Opcional):**
   * No painel do Cloudflare Pages, acesse as configurações do seu projeto -> **Environment Variables** (Variáveis de Ambiente).
   * Adicione uma nova variável chamada **`VITE_API_URL`** com o valor da URL de produção do seu backend (ex: `https://ais-pre-your-unique-id.run.app`).
   * Salve e faça o re-deploy do site.

3. **Inteligência de Fallback Automático e Zero-Config (À Prova de Falhas):**
   * *O Problema:* Em geradores de sites estáticos (como o Cloudflare Pages), as variáveis iniciadas com `VITE_` precisam ser injetadas exclusivamente **durante a fase de build (compilação)**. Se você adicionou a variável após o build, ou se o pipeline do Cloudflare Pages não exportou a variável para o runtime do Node no build, a variável ficaria vazia (`""`) no navegador, gerando erros 404 ao tentar enviar para `/api/contact`.
   * *A Solução Inteligente:* Implementamos um algoritmo de **detecção de ambiente em tempo real** no frontend! Se o site rodar fora de `localhost` ou de previews internos do AI Studio e a variável `VITE_API_URL` não for encontrada (por atraso de deploy no Cloudflare), o próprio frontend detecta o seu domínio de produção externo e define **automaticamente** como fallback o endpoint de produção estável do seu Cloud Run (`https://ais-pre-dwwk7tdp3w422qgquzvkxx-6392973582.us-west2.run.app`).
   * *Resultado:* Zero-Config e 100% à prova de falhas. Funciona imediatamente, em qualquer situação, sem necessidade de re-compilar manualmente ou se preocupar com sincronismo de deploys!

---

## 💡 Guia de Referência de Boas Práticas (Para outros Desenvolvedores)

Se você está usando este portfólio como referência para o seu próprio projeto, aqui estão alguns conceitos de excelência para observar no código:

*   **Padrão Single Source of Truth para Cópia Textual:** Evite espalhar strings de texto estáticas por dentro de componentes React. Centralize toda a cópia de interface — incluindo estruturas complexas aninhadas, como os pop-ups detalhados de serviços — diretamente em `content.json`. Isso torna o seu código infinitamente mais limpo, padronizado, de facílima tradução (i18n) e legível.
*   **Abstração Dinâmica de Ícones:** Veja o componente `LucideIcon.tsx`. Em vez de importar dezenas de ícones em cada componente de visualização, passamos a string do ícone mapeada no JSON ou objeto de dados e renderizamos dinamicamente, mantendo o bundle leve e as importações limpas.
*   **Formulários Resilientes:** Sempre valide as informações na entrada (UI) e antes do processamento (Servidor). Formulários de contato que expõem chaves ou enviam dados sem validação no servidor tornam a aplicação vulnerável a SPAM e ataques.
*   **Compilação Híbrida em Produção:** O uso do `esbuild` para compilar o servidor Express unifica dependências e resolve problemas de resolução de caminhos nativos do ES Modules no Node, mantendo a inicialização do container rápida em servidores VPS.

---

*Desenvolvido com foco em excelência técnica, design moderno e geração de valor de negócios.*
