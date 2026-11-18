# mateus.dev

Portfólio pessoal de [Mateus Silva Souza](https://github.com/mateussilvasouza), desenvolvedor Full Stack. A carreira contada como uma trilha de estudos: de estagiário de suporte a dev pleno, com as entregas reais de cada empresa, os projetos, o que estou estudando agora e os vídeos do canal.

## Stack

| Camada | Tecnologia |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| Linguagem | TypeScript |
| Estilo | [Tailwind CSS v4](https://tailwindcss.com) + componentes no estilo [shadcn/ui](https://ui.shadcn.com) |
| Animação | [Motion](https://motion.dev) |
| Vídeos | [YouTube Data API v3](https://developers.google.com/youtube/v3) |
| Deploy | Vercel |

## Arquitetura e decisões

- **Site estático, sem banco.** Todo o conteúdo fica em arquivos TypeScript em `src/data/`. Para mudar um texto, um projeto ou uma experiência, edite o arquivo e faça o push: a Vercel publica sozinha.
- **Server Components por padrão.** Só o `Reveal` (animação ao rolar), o filtro de projetos e o seletor de tema são Client Components.
- **YouTube só no servidor, com cache.** A seção "Do canal" busca os 3 vídeos mais recentes no servidor, então a chave da API nunca chega ao navegador. As respostas ficam em cache por 6 horas (ISR), o que dá poucas chamadas por dia, bem dentro da cota gratuita. A playlist de uploads é derivada do id do canal (`UC…` → `UU…`), sem gastar uma chamada extra. Sem chave, sem vídeos ou com erro na API, a seção mostra o estado "Em breve".
- **Páginas de empresa geradas no build.** `/experiencia/[slug]` é gerada a partir de `src/data/deliveries.ts` (`generateStaticParams`).

## Rodando localmente

```bash
npm install
cp .env.example .env.local  # opcional: só para a seção do YouTube
npm run dev
```

### Variáveis de ambiente (todas opcionais)

| Variável | Descrição |
| --- | --- |
| `YOUTUBE_API_KEY` | Chave da YouTube Data API v3 (Google Cloud Console → APIs → YouTube Data API v3 → Credenciais). Restrinja a chave a essa API. |
| `YOUTUBE_CHANNEL_ID` | Id do canal, começa com `UC` (YouTube Studio → Configurações → Canal → Configurações avançadas). |
| `YOUTUBE_CHANNEL_URL` | Link público do canal, por exemplo `https://www.youtube.com/@seucanal`. Liga o botão de inscrição e o YouTube nos contatos. |
| `YOUTUBE_CHANNEL_DESCRIPTION` | Uma frase sobre o tema do canal, exibida ao lado do título da seção. |

Na Vercel, cadastre as mesmas variáveis em Settings → Environment Variables.

### Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` / `npm run start` | Build e servidor de produção |
| `npm run lint` | ESLint |

## Onde editar o conteúdo

| Arquivo | O que tem |
| --- | --- |
| `src/data/profile.ts` | Nome, disponibilidade, métricas, card "Minha trilha" e formação |
| `src/data/experiences.ts` | Empresas e as entregas numeradas da home |
| `src/data/deliveries.ts` | Páginas de detalhe por empresa (hoje, a Vai Fácil com 10 entregas) |
| `src/data/projects.ts` | Projetos de empresas e de estudo |
| `src/data/studying.ts` | Seção "Em estudo" |
| `src/data/skills.ts` | Seção Stack |
| `src/data/contact.ts` | Links de contato. `SHOW_PHONE` liga ou desliga o WhatsApp no site |
| `public/Currículo.pdf` | PDF do botão "Download CV" |

## Estrutura

```
src/
├─ app/
│  ├─ page.tsx                 # home: monta as seções em ordem
│  ├─ layout.tsx               # layout raiz (Navbar, Footer, metadata)
│  ├─ experiencia/[slug]/      # página de detalhe por empresa
│  └─ projetos/                # todos os projetos com filtro
├─ components/                 # componentes compartilhados (UI, cards, layout)
├─ sections/                   # seções da home (Hero, Experience, Channel, etc.)
├─ data/                       # todo o conteúdo do site
└─ lib/                        # helpers (YouTube, slugify, utils)
```
