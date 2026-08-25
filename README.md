# mateus.dev

Portfólio pessoal de [Mateus Silva Souza](https://github.com/mateussilvasouza) — Software Engineer full stack. Além de ser o site que apresenta minha experiência, é também um projeto de frontend "de verdade": stack atual, arquitetura pensada de propósito, e decisões documentadas — não só um one-pager estático.

O site tem duas partes: as seções institucionais (hero, cases, experiência, stack, contato) e um **blog com CMS próprio** — editor de markdown com upload de imagem/vídeo, autenticação e persistência em Postgres.

## Stack

| Camada | Tecnologia |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| Linguagem | TypeScript |
| Estilo | [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) |
| Animação | [Motion](https://motion.dev) |
| Banco | [Neon](https://neon.tech) (Postgres serverless) + [Drizzle ORM](https://orm.drizzle.team) |
| Armazenamento de mídia | [Vercel Blob](https://vercel.com/docs/vercel-blob) |
| Markdown | `react-markdown` + `remark-gfm` + `gray-matter` |
| Deploy | Vercel, com migrations do banco via GitHub Actions |

## Arquitetura e decisões

Algumas escolhas que valem explicar (não só o "o quê", mas o "por quê"):

- **Migração de Vite para Next.js.** O projeto começou como SPA em Vite. Quando o blog precisou de um backend (rotas de API, Server Actions, banco de dados), migrei pra Next.js App Router em vez de manter Vite + um backend separado — um único runtime, sem duplicar camada de HTTP.
- **Server Components por padrão, Client Component só onde precisa.** As seções da home são Server Components estáticos; só o `Reveal` (scroll-reveal via Motion) e o editor de posts (que precisa de estado local pro preview ao vivo) cruzam a fronteira pra `"use client"`. Bundle client menor, sem esforço extra.
- **Drizzle + driver HTTP do Neon**, não uma conexão TCP tradicional — API de rotas do Next.js roda em funções serverless, então cada query como um `fetch()` evita o overhead de gerenciar pool de conexão.
- **Autenticação própria, sem biblioteca.** É uso de uma pessoa só (eu, pra escrever posts) — em vez de Auth.js/NextAuth, é uma senha via variável de ambiente e um cookie de sessão assinado com HMAC (`node:crypto`), verificado tanto no `proxy.ts` (protege as rotas `/admin`) quanto dentro de cada Server Action que mexe no banco (a própria documentação do Next é explícita que Server Actions não são cobertas pelo matcher do Proxy — cada uma precisa se proteger sozinha).
- **Editor de markdown com import de frontmatter.** Dá pra escrever o post inteiro manualmente, ou colar/importar um `.md` com frontmatter YAML (`gray-matter`) que preenche o formulário — os campos que faltarem (slug, resumo, tempo de leitura) saem com a mesma lógica de sugestão que o formulário manual já usa.
- **Upload de mídia direto do navegador pro Vercel Blob**, sem passar pela função serverless (evita o limite de tamanho do body da function). Imagem e vídeo usam a mesma sintaxe de markdown (`![alt](url)`) — quem renderiza decide se é `<img>` ou `<video>` pela extensão do arquivo, sem sintaxe nova pra lembrar.
- **ISR + `revalidatePath` em vez de `force-dynamic`** nas páginas públicas do blog (`/`, `/blog`, `/blog/[slug]`). Elas são lidas muito mais do que escritas, então ficam estáticas e cacheadas — cada mutação de post (criar/editar/apagar) invalida exatamente essas rotas, sem precisar de rebuild pra aparecer no site.
- **Migrations do Drizzle rodando via GitHub Actions** a cada push pra `main`, contra o Neon real — independente do deploy da Vercel (que roda em paralelo, disparado pelo mesmo push).

## Rodando localmente

```bash
npm install
cp .env.example .env.local  # preencher as variáveis abaixo
npm run dev
```

### Variáveis de ambiente (`.env.local`)

| Variável | Descrição |
| --- | --- |
| `DATABASE_URL` | Connection string do Neon (Postgres) |
| `ADMIN_PASSWORD` | Senha pra entrar em `/admin` |
| `SESSION_SECRET` | Chave aleatória usada pra assinar o cookie de sessão (`openssl rand -hex 32`) |
| `BLOB_READ_WRITE_TOKEN` | Token do Vercel Blob (Storage → Create Database → Blob, **com acesso público**) |

### Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` / `npm run start` | Build e servidor de produção |
| `npm run lint` | ESLint |
| `npm run db:generate` | Gera uma migration a partir do schema (`src/db/schema.ts`) |
| `npm run db:migrate` | Aplica migrations pendentes contra o `DATABASE_URL` |
| `npm run db:seed` | Popula o banco com posts de exemplo |
| `npm run db:studio` | Abre o Drizzle Studio (UI pra inspecionar o banco) |

## Deploy

- **App**: Vercel, deploy automático a cada push pra `main`.
- **Migrations**: `.github/workflows/migrate.yml` roda `db:migrate` contra o Neon a cada push, usando o secret `DATABASE_URL` cadastrado no GitHub (Settings → Secrets and variables → Actions).
- Variáveis de ambiente de produção (`DATABASE_URL`, `ADMIN_PASSWORD`, `SESSION_SECRET`, `BLOB_READ_WRITE_TOKEN`) precisam ser cadastradas nas configurações do projeto na Vercel.

## Estrutura

```
src/
├─ app/
│  ├─ page.tsx               # home — monta as seções institucionais em ordem
│  ├─ layout.tsx              # layout raiz (Navbar, Footer, metadata)
│  ├─ blog/                  # listagem pública, busca/filtro, leitura por slug
│  ├─ admin/(protected)/     # dashboard e editor de posts, atrás de login
│  ├─ admin/login/           # tela de login
│  └─ api/blob/upload/       # rota de upload pro Vercel Blob
├─ components/                # componentes compartilhados (UI, cards, markdown)
├─ sections/                  # seções da home (Hero, Cases, Experience, etc.)
├─ data/                      # conteúdo estático das seções institucionais
├─ db/                        # schema, client e queries do Drizzle
├─ lib/                       # helpers (sessão, slugify, markdown, tempo de leitura)
└─ proxy.ts                   # protege as rotas /admin
```
