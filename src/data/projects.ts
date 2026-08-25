export interface Project {
  category: string
  title: string
  description: string
  technologies: string[]
  result: string
  repoUrl: string
  demoUrl?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    category: 'CLOUD · AWS',
    title: 'Fundamentos de Cloud com AWS',
    description:
      'Dois laboratórios práticos do bootcamp GFT (Digital Innovation One): uma arquitetura DevOps com EC2, EKS e infraestrutura como código, e um pipeline serverless completo que exporta os 1025 Pokémon da PokeAPI para CSV, orquestrado com Step Functions.',
    technologies: [
      'AWS',
      'EC2',
      'EKS',
      'CloudFormation',
      'Step Functions',
      'Lambda',
    ],
    result: 'Pipeline validado localmente com LocalStack antes do deploy',
    repoUrl:
      'https://github.com/mateussilvasouza/GFT---Fundamentos-de-Cloud-com-AWS',
    featured: true,
  },
  {
    category: 'BACKEND · AUTH',
    title: 'Auth API',
    description:
      'API de autenticação e autorização com JWT assinado em RS256 (chave privada/pública, não um segredo simétrico), hash de senha com bcrypt, upload de arquivos e cadastro de usuários em lote via CSV.',
    technologies: ['Node.js', 'TypeScript', 'Express', 'JWT', 'bcrypt'],
    result: 'RS256 em vez de HS256 — separa quem assina de quem verifica',
    repoUrl: 'https://github.com/mateussilvasouza/Auth-Api',
    demoUrl: 'https://auth-api-latest-ku3d.onrender.com',
    featured: true,
  },
  {
    category: 'BACKEND · TESTES',
    title: 'FindAFriend',
    description:
      'API de adoção de animais aplicando SOLID e Clean Architecture: ONGs cadastram pets, adotantes filtram por cidade e características e falam direto no WhatsApp — com suíte completa de testes unitários e end-to-end.',
    technologies: [
      'Node.js',
      'TypeScript',
      'Fastify',
      'Prisma',
      'PostgreSQL',
      'Vitest',
    ],
    result: 'Repositórios in-memory nos testes unitários, Prisma/Postgres em produção',
    repoUrl: 'https://github.com/mateussilvasouza/FindAFriend',
    featured: true,
  },
  {
    category: 'BACKEND · API',
    title: 'Champions League API',
    description:
      'API de jogadores, times e escalações da Champions League com dados reais da Sportmonks. O desafio original da DIO usava JSON fixo em memória — essa versão foi além, com Postgres, Docker e tratamento de erros centralizado.',
    technologies: [
      'Node.js',
      'Express',
      'TypeScript',
      'PostgreSQL',
      'TypeORM',
      'Docker',
    ],
    result: 'Foi além do desafio original: dados reais, Postgres e Docker',
    repoUrl: 'https://github.com/mateussilvasouza/football-api',
    featured: true,
  },
  {
    category: 'DESKTOP · PYTHON',
    title: 'Telegram Files Toolkit',
    description:
      'Ferramenta desktop (Tkinter) para baixar e organizar arquivos trocados em conversas do Telegram: download em massa por formato/período, listagem individual com filtros, e cópia direta entre canais sem passar pelo disco.',
    technologies: ['Python', 'Tkinter', 'Telegram API'],
    result: 'Processamento paralelo, com sincronização incremental entre execuções',
    repoUrl: 'https://github.com/mateussilvasouza/telegram-tool',
  },
  {
    category: 'BACKEND · NODE.JS',
    title: 'Gerenciador de Podcasts',
    description:
      'API RESTful de gerenciamento de podcasts feita no bootcamp da DIO, em Node.js + TypeScript puro, sem framework — roteamento, middlewares e parsing de JSON escritos à mão, com persistência em SQLite via Turso.',
    technologies: ['Node.js', 'TypeScript', 'SQLite', 'Turso'],
    result: 'API construída sem framework — HTTP puro em camadas',
    repoUrl: 'https://github.com/mateussilvasouza/gerenciador-de-podcasts',
  },
  {
    category: 'FRONTEND · REACT',
    title: 'Timer',
    description:
      'Cronômetro de foco estilo Pomodoro: cria um ciclo com tarefa e duração, acompanha a contagem regressiva e mantém histórico de ciclos concluídos, interrompidos ou em andamento, persistido no navegador.',
    technologies: ['React', 'TypeScript', 'Vite', 'styled-components'],
    result: 'Histórico de ciclos com persistência local via localStorage',
    repoUrl: 'https://github.com/mateussilvasouza/timer',
    demoUrl: 'https://timer-gray-one.vercel.app',
  },
  {
    category: 'FRONTEND · REACT',
    title: 'Coffee Delivery',
    description:
      'E-commerce de entrega de café com carrinho e checkout, incluindo busca de endereço automática por CEP (ViaCEP) e geocodificação reversa (Nominatim).',
    technologies: ['React', 'TypeScript', 'Vite', 'styled-components'],
    result: 'Checkout com endereço preenchido automaticamente por CEP',
    repoUrl: 'https://github.com/mateussilvasouza/coffee-delivery',
    demoUrl: 'https://coffee-delivery-bay-kappa.vercel.app',
  },
  {
    category: 'FRONTEND · REACT',
    title: 'Lista de Tarefas',
    description:
      'Aplicação de lista de tarefas em React — criar, editar, concluir e excluir tarefas, com interface simples.',
    technologies: ['React', 'TypeScript'],
    result: 'CRUD completo com edição e marcação de conclusão',
    repoUrl: 'https://github.com/mateussilvasouza/todo-list',
    demoUrl: 'https://todo-list-three-livid.vercel.app',
  },
]
