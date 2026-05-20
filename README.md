# 🅰️ NotificationHub Web Client

Este é o cliente web do **NotificationHub**, um painel SPA (Single Page Application) moderno construído em **Angular 12**. A aplicação fornece uma interface reativa e intuitiva em *Dark Mode* para que administradores e sistemas gerenciem o fluxo de disparos, visualizem históricos de auditoria por IP e assinem serviços de notificações nativas.

---

## 🎨 Recursos da Interface

* **Formulários Reativos Completos:** Validação em tempo real para múltiplos canais (E-mail, Push Notifications e Feedbacks de contato).
* **Filtros por Canal Dinâmico:** Alternância de abas fluida para isolar os dados necessários de cada tipo de transmissão.
* **Componentes de Alerta Inteligentes:** Integração com feedbacks visuais discretos para indicar o andamento das requisições assíncronas do backend.
* **Suporte a Web Push Nativo:** Configuração de Service Workers para registrar inscrições VAPID diretamente nos navegadores dos usuários.

---

## 🛠️ Principais Dependências Instaladas

| Biblioteca | Versão | Função no Projeto |
| --- | --- | --- |
| **`@angular/pwa`** | `^12.x` | Adiciona suporte a Service Workers e manifesto web para o recebimento de mensagens em background. |
| **`ngx-toastr`** | `^14.x` | Renderização de alertas visuais (*Toasts*) elegantes no canto da tela a cada alteração de estado. |
| **`@angular/forms`** | `^12.x` | Gerenciamento e validação estrita dos dados coletados nos formulários de envio. |

---

## 🚀 Desenvolvimento & Comandos Úteis

Certifique-se de instalar as dependências do projeto antes de rodar os scripts de inicialização:

```bash
npm install

```

### 💻 Servidor de Desenvolvimento

Para subir a aplicação localmente com recarregamento automático a cada alteração de código, execute:

```bash
ng serve

```

Navegue para `http://localhost:4200/` no seu navegador para interagir com o painel.

### 🧩 Geração de Código (Scaffolding)

O projeto utiliza o Angular CLI estruturado. Para gerar novos arquivos seguindo os padrões de arquitetura, utilize:

```bash
# Gerar um novo componente
ng generate component components/nome-do-componente

# Gerar um novo serviço de integração
ng generate service services/nome-do-serviço

```

### 📦 Compilação de Produção (Build)

Para gerar os artefatos de distribuição otimizados e buildados para produção, execute:

```bash
ng build

```

Os arquivos gerados serão salvos de forma compactada dentro do diretório `dist/`.

---

## ⚙️ Conexão com o Backend (CORS)

Por padrão, este frontend está configurado para consumir a API do gateway na porta `8000`. Certifique-se de que o backend Spring Boot adicionou a origem deste cliente na anotação de controle:

```java
@CrossOrigin(origins = "http://localhost:4200")

```
