# rest-express

Aplicação web fullstack para gerenciamento de contatos profissionais. Permite cadastrar, visualizar, editar, pesquisar e excluir contatos com informações como nome, telefone, cargo e empresa.

## Funcionalidades

- Listagem de contatos em grid responsivo
- Criação de novos contatos
- Edição de contatos existentes
- Exclusão de contatos com confirmação
- Pesquisa por nome, cargo, empresa ou telefone
- Interface em português brasileiro

## Stack Tecnológica

### Backend
- **Node.js** com **Express** - servidor HTTP e API REST
- **TypeScript** - tipagem estática
- **Drizzle ORM** - mapeamento objeto-relacional
- **PostgreSQL** - banco de dados relacional
- **Zod** - validação de schemas

### Frontend
- **React 18** - biblioteca de interface
- **Vite** - bundler e dev server
- **TanStack Query** - gerenciamento de estado assíncrono
- **Tailwind CSS** - estilização utilitária
- **Radix UI** - componentes acessíveis
- **Wouter** - roteamento
- **Lucide React** - ícones

## Instalação

```bash
npm install
```

## Configuração

Configure a variável de ambiente necessária:

- `DATABASE_URL` - string de conexão do PostgreSQL

## Banco de Dados

Aplique as migrações do schema:

```bash
npm run db:push
```

## Execução

### Desenvolvimento

```bash
npm run dev
```

O servidor inicia na porta definida pela variável `PORT` (padrão: 5000).

### Produção

Build da aplicação:

```bash
npm run build
```

Iniciar em produção:

```bash
npm run start
```

## Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia o servidor em modo desenvolvimento |
| `npm run build` | Gera o build de produção (client + server) |
| `npm run start` | Executa o build de produção |
| `npm run check` | Verifica tipos TypeScript |
| `npm run db:push` | Aplica o schema no banco de dados |

## Estrutura de Pastas

```
.
├── client/                 # Aplicação frontend React
│   ├── src/
│   │   ├── components/     # Componentes React (ContactCard, ContactForm, ui/)
│   │   ├── hooks/          # Hooks customizados (use-contacts, use-toast)
│   │   ├── lib/            # Utilitários e configurações
│   │   ├── pages/          # Páginas da aplicação (Contacts)
│   │   ├── App.tsx         # Componente raiz
│   │   └── main.tsx        # Ponto de entrada
│   └── index.html          # Template HTML
├── server/                 # Backend Express
│   ├── index.ts            # Ponto de entrada do servidor
│   ├── routes.ts           # Rotas da API REST
│   ├── storage.ts          # Camada de acesso a dados
│   └── db.ts               # Configuração do banco de dados
├── shared/                 # Código compartilhado client/server
│   ├── schema.ts           # Schema do banco (Drizzle) e tipos
│   └── routes.ts           # Definição de rotas e validações
├── script/
│   └── build.ts            # Script de build de produção
├── drizzle.config.ts       # Configuração do Drizzle Kit
├── vite.config.ts          # Configuração do Vite
└── package.json            # Dependências e scripts
```

## API REST

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/contacts` | Lista todos os contatos (aceita `?search=`) |
| GET | `/api/contacts/:id` | Retorna um contato pelo ID |
| POST | `/api/contacts` | Cria um novo contato |
| PUT | `/api/contacts/:id` | Atualiza um contato existente |
| DELETE | `/api/contacts/:id` | Remove um contato |

## Variáveis de Ambiente

| Variável | Descrição |
|----------|-----------|
| `DATABASE_URL` | String de conexão PostgreSQL (obrigatória) |
| `PORT` | Porta do servidor (padrão: 5000) |
| `NODE_ENV` | Ambiente de execução (`development` ou `production`) |

## Licença

MIT
