export interface ProjectLink {
  label: string
  href: string
  kind?: 'github'
}

export interface Project {
  kind: 'company' | 'study'
  title: string
  description: string
  period?: string
  company?: string
  role?: string
  stack: string[]
  links: ProjectLink[]
  metricValue?: string
  metricLabel?: string
  privateNote?: string
  /** Vídeo do produto, exibido no topo do card. */
  video?: { src: string; title: string }
}

/**
 * Projetos da seção "Projetos" e da página /projetos, na ordem em que aparecem.
 * Empresas: código privado, mostra o impacto. Estudo: repositórios no GitHub.
 */
export const projects: Project[] = [
  {
    kind: 'company',
    title: 'SaaS jurídico de consulta processual',
    company: 'Galgtec',
    role: 'Full Stack',
    period: '05/2025 — 05/2026',
    description:
      'Frontend em React/Next.js e integrações com APIs de tribunais brasileiros; simplificação da arquitetura serverless.',
    stack: ['Next.js', 'React', 'AWS Lambda'],
    links: [
      { label: 'GalgJur', href: 'https://galgjur.com.br/' },
      { label: 'Galgtec', href: 'https://galgtec.com.br/' },
    ],
    video: { src: 'https://galgjur.com.br/assets/hro.mp4', title: 'GalgJur: visão geral' },
    metricValue: '−30%',
    metricLabel: 'funções Lambda',
    privateNote: 'Código privado',
  },
  {
    kind: 'company',
    title: 'Plataforma de logística de alto volume',
    company: 'Vai Fácil',
    role: 'Full Stack',
    period: '04/2022 — 05/2025',
    description:
      'Três apps React em produção, microsserviços NestJS, integrações com seguradoras e automações logísticas.',
    stack: ['NestJS', 'PostgreSQL', 'RabbitMQ', 'React'],
    links: [],
    metricValue: '100k',
    metricLabel: 'requisições por dia · SLA 97%',
    privateNote: 'Produto interno · código privado',
  },
  {
    kind: 'study',
    title: 'Fundamentos de Cloud com AWS',
    period: 'GFT',
    description:
      'Dois laboratórios práticos do bootcamp GFT (Digital Innovation One): uma arquitetura DevOps com EC2, EKS e infraestrutura como código, e um pipeline serverless completo que exporta os 1025 Pokémon da PokeAPI para CSV, orquestrado com Step Functions. Pipeline validado localmente com LocalStack antes do deploy.',
    stack: ['AWS', 'EC2', 'EKS', 'CloudFormation', 'Step Functions', 'Lambda'],
    links: [
      {
        label: 'Código',
        href: 'https://github.com/mateussilvasouza/GFT---Fundamentos-de-Cloud-com-AWS',
        kind: 'github',
      },
    ],
  },
  {
    kind: 'study',
    title: 'Auth API',
    period: '2024',
    description:
      'API de autenticação e autorização com JWT assinado em RS256 (chave privada/pública, não um segredo simétrico), hash de senha com bcrypt, upload de arquivos e cadastro de usuários em lote via CSV. RS256 em vez de HS256 — separa quem assina de quem verifica.',
    stack: ['Node.js', 'TypeScript', 'Express', 'JWT', 'bcrypt'],
    links: [
      {
        label: 'Código',
        href: 'https://github.com/mateussilvasouza/Auth-Api',
        kind: 'github',
      },
      {
        label: 'Ver ao vivo',
        href: 'https://auth-api-latest-ku3d.onrender.com',
      },
    ],
  },
  {
    kind: 'study',
    title: 'FindAFriend',
    period: '2024',
    description:
      'API de adoção de animais aplicando SOLID e Clean Architecture: ONGs cadastram pets, adotantes filtram por cidade e características e falam direto no WhatsApp — com suíte completa de testes unitários e end-to-end. Repositórios in-memory nos testes unitários, Prisma/Postgres em produção.',
    stack: ['Node.js', 'TypeScript', 'Fastify', 'Prisma', 'PostgreSQL', 'Vitest'],
    links: [
      {
        label: 'Código',
        href: 'https://github.com/mateussilvasouza/FindAFriend',
        kind: 'github',
      },
    ],
  },
  {
    kind: 'study',
    title: 'Champions League API',
    period: '2023',
    description:
      'API de jogadores, times e escalações da Champions League com dados reais da Sportmonks. O desafio original da DIO usava JSON fixo em memória — essa versão foi além, com Postgres, Docker e tratamento de erros centralizado.',
    stack: ['Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'TypeORM', 'Docker'],
    links: [
      {
        label: 'Código',
        href: 'https://github.com/mateussilvasouza/football-api',
        kind: 'github',
      },
    ],
  },
  {
    kind: 'study',
    title: 'Telegram Files Toolkit',
    description:
      'Ferramenta desktop (Tkinter) para baixar e organizar arquivos trocados em conversas do Telegram: download em massa por formato/período, listagem individual com filtros, e cópia direta entre canais sem passar pelo disco. Processamento paralelo, com sincronização incremental entre execuções.',
    stack: ['Python', 'Tkinter', 'Telegram API'],
    links: [
      {
        label: 'Código',
        href: 'https://github.com/mateussilvasouza/telegram-tool',
        kind: 'github',
      },
    ],
  },
  {
    kind: 'study',
    title: 'Gerenciador de Podcasts',
    description:
      'API RESTful de gerenciamento de podcasts feita no bootcamp da DIO, em Node.js + TypeScript puro, sem framework — roteamento, middlewares e parsing de JSON escritos à mão, com persistência em SQLite via Turso. API construída sem framework — HTTP puro em camadas.',
    stack: ['Node.js', 'TypeScript', 'SQLite', 'Turso'],
    links: [
      {
        label: 'Código',
        href: 'https://github.com/mateussilvasouza/gerenciador-de-podcasts',
        kind: 'github',
      },
    ],
  },
  {
    kind: 'study',
    title: 'Timer',
    description:
      'Cronômetro de foco estilo Pomodoro: cria um ciclo com tarefa e duração, acompanha a contagem regressiva e mantém histórico de ciclos concluídos, interrompidos ou em andamento, persistido no navegador. Histórico de ciclos com persistência local via localStorage.',
    stack: ['React', 'TypeScript', 'Vite', 'styled-components'],
    links: [
      {
        label: 'Código',
        href: 'https://github.com/mateussilvasouza/timer',
        kind: 'github',
      },
      { label: 'Ver online', href: 'https://timer-gray-one.vercel.app' },
    ],
  },
  {
    kind: 'study',
    title: 'Coffee Delivery',
    description:
      'E-commerce de entrega de café com carrinho e checkout, incluindo busca de endereço automática por CEP (ViaCEP) e geocodificação reversa (Nominatim). Checkout com endereço preenchido automaticamente por CEP.',
    stack: ['React', 'TypeScript', 'Vite', 'styled-components'],
    links: [
      {
        label: 'Código',
        href: 'https://github.com/mateussilvasouza/coffee-delivery',
        kind: 'github',
      },
      {
        label: 'Ver online',
        href: 'https://coffee-delivery-bay-kappa.vercel.app',
      },
    ],
  },
  {
    kind: 'study',
    title: 'Lista de Tarefas',
    description:
      'Aplicação de lista de tarefas em React — criar, editar, concluir e excluir tarefas, com interface simples. CRUD completo com edição e marcação de conclusão.',
    stack: ['React', 'TypeScript'],
    links: [
      {
        label: 'Código',
        href: 'https://github.com/mateussilvasouza/todo-list',
        kind: 'github',
      },
      { label: 'Ver online', href: 'https://todo-list-three-livid.vercel.app' },
    ],
  },
]
