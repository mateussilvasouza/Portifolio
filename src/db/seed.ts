import { db } from './index'
import { contactLinks, experiences, posts, projects } from './schema'

/**
 * Content lifted from portfolio_blog_design.html. `content` has no source
 * in the mockup (it only shows list/card views) — placeholders below,
 * meant to be replaced with the real article body later.
 */
const seedPosts: (typeof posts.$inferInsert)[] = [
  {
    slug: 'como-investigar-uma-query-lenta-no-postgresql',
    title: 'Como investigar uma query lenta no PostgreSQL',
    excerpt:
      'Um relato técnico sobre investigação de gargalos, análise de queries e decisões tomadas para melhorar o desempenho de uma aplicação real.',
    content:
      'Um relato técnico sobre investigação de gargalos, análise de queries e decisões tomadas para melhorar o desempenho de uma aplicação real. (conteúdo completo em breve)',
    category: 'Performance',
    tags: ['PostgreSQL', 'SQL'],
    readingTimeMinutes: 8,
    featured: true,
    publishedAt: new Date('2026-08-24'),
  },
  {
    slug: 'react-alem-do-componente',
    title: 'React além do componente',
    excerpt:
      'Composição, responsabilidade e reutilização sem transformar a aplicação em um conjunto de abstrações desnecessárias.',
    content:
      'Composição, responsabilidade e reutilização sem transformar a aplicação em um conjunto de abstrações desnecessárias. (conteúdo completo em breve)',
    category: 'Frontend',
    tags: ['React', 'TypeScript'],
    readingTimeMinutes: 6,
    featured: false,
    publishedAt: new Date('2026-08-17'),
  },
  {
    slug: 'construindo-apis-que-conseguem-evoluir',
    title: 'Construindo APIs que conseguem evoluir',
    excerpt:
      'Decisões de estrutura, separação de responsabilidades e organização de serviços em aplicações NestJS.',
    content:
      'Decisões de estrutura, separação de responsabilidades e organização de serviços em aplicações NestJS. (conteúdo completo em breve)',
    category: 'Backend',
    tags: ['NestJS', 'TypeScript'],
    readingTimeMinutes: 10,
    featured: false,
    publishedAt: new Date('2026-08-10'),
  },
  {
    slug: 'quando-microsservicos-fazem-sentido',
    title: 'Quando microsserviços fazem sentido?',
    excerpt:
      'Reflexões sobre acoplamento, limites de contexto, bancos próprios e o custo de distribuir um sistema.',
    content:
      'Reflexões sobre acoplamento, limites de contexto, bancos próprios e o custo de distribuir um sistema. (conteúdo completo em breve)',
    category: 'Arquitetura',
    tags: ['DDD', 'Microsserviços'],
    readingTimeMinutes: 8,
    featured: false,
    publishedAt: new Date('2026-08-03'),
  },
  {
    slug: 'menos-lambdas-menos-complexidade',
    title: 'Menos Lambdas, menos complexidade',
    excerpt:
      'O que aconteceu ao consolidar funções que compartilhavam a mesma lógica dentro de um pipeline de deploy.',
    content:
      'O que aconteceu ao consolidar funções que compartilhavam a mesma lógica dentro de um pipeline de deploy. (conteúdo completo em breve)',
    category: 'Cloud',
    tags: ['AWS', 'Lambda'],
    readingTimeMinutes: 7,
    featured: false,
    publishedAt: new Date('2026-07-27'),
  },
  {
    slug: 'validacao-de-contratos-sem-dor',
    title: 'Validação de contratos sem dor',
    excerpt:
      'Como estruturar validações para manter as fronteiras entre integrações externas e o domínio da aplicação.',
    content:
      'Como estruturar validações para manter as fronteiras entre integrações externas e o domínio da aplicação. (conteúdo completo em breve)',
    category: 'Backend',
    tags: ['TypeScript', 'Zod'],
    readingTimeMinutes: 9,
    featured: false,
    publishedAt: new Date('2026-07-20'),
  },
  {
    slug: 'o-que-mudou-quando-comecei-a-pensar-como-engenheiro',
    title: 'O que mudou quando comecei a pensar como engenheiro',
    excerpt:
      'Aprendizados sobre manutenção, decisões técnicas, comunicação e responsabilidade por software em produção.',
    content:
      'Aprendizados sobre manutenção, decisões técnicas, comunicação e responsabilidade por software em produção. (conteúdo completo em breve)',
    category: 'Carreira',
    tags: ['Carreira', 'Engenharia'],
    readingTimeMinutes: 5,
    featured: false,
    publishedAt: new Date('2026-07-13'),
  },
]

/**
 * Cargos de empresa viram cards "company" com o resumo do produto e o
 * impacto (mesmo dado de seedExperiences, condensado). Projetos de
 * estudo vêm de repositórios reais no GitHub — cada `result` original virou
 * a última frase da descrição para não perder o dado.
 */
const seedProjects: (typeof projects.$inferInsert)[] = [
  {
    kind: 'company',
    title: 'SaaS jurídico de consulta processual',
    company: 'Galgtec',
    role: 'Full Stack',
    period: '05/2025 — 05/2026',
    description:
      'Frontend em React/Next.js e integrações com APIs de tribunais brasileiros; simplificação da arquitetura serverless.',
    stack: ['Next.js', 'React', 'AWS Lambda'],
    links: [],
    metricValue: '−30%',
    metricLabel: 'funções Lambda',
    privateNote: 'Código privado — produto público',
    order: 0,
  },
  {
    kind: 'company',
    title: 'Plataforma de logística de alto volume',
    company: 'Vai Fácil',
    role: 'Sênior Full Stack',
    period: '04/2022 — 05/2025',
    description:
      'Três apps React em produção, microsserviços NestJS, integrações com seguradoras e automações logísticas.',
    stack: ['NestJS', 'PostgreSQL', 'RabbitMQ', 'React'],
    links: [],
    metricValue: '100k',
    metricLabel: 'requisições por dia · SLA 97%',
    privateNote: 'Código privado — produto público',
    order: 1,
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
    order: 2,
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
    order: 3,
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
    order: 4,
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
    order: 5,
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
    order: 6,
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
    order: 7,
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
    order: 8,
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
    order: 9,
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
    order: 10,
  },
]

const seedExperiences: (typeof experiences.$inferInsert)[] = [
  {
    company: 'Galgtec',
    role: 'Desenvolvedor Full Stack',
    period: '05/2025 — 05/2026',
    duration: '1 ano',
    product: 'SaaS jurídico',
    description:
      'Atuação em SaaS jurídico para consulta de processos em tribunais de todo o Brasil.',
    highlights: [
      'Desenvolvimento de frontend React/Next.js e integração com APIs de tribunais estaduais e federais.',
      'Redução de 30% das Lambda Functions do pipeline de deploy.',
      'Participação em decisões de arquitetura e simplificação de abstrações.',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'AWS', 'Lambda'],
    order: 0,
  },
  {
    company: 'Vai Fácil',
    role: 'Desenvolvedor Full Stack Pleno',
    period: '04/2022 — 05/2025',
    duration: '3 anos',
    product: 'plataforma de logística',
    description:
      'Atuação em plataforma logística de alto volume, com até 100 mil requisições diárias e SLA de 97%.',
    highlights: [
      'Desenvolvimento e manutenção de 3 aplicações React em produção.',
      'Desenvolvimento de microsserviços utilizando NestJS e TypeScript.',
      'Otimização de PostgreSQL com ganhos de até 2 segundos em queries transacionais.',
      'Otimização de views materializadas com ganhos de até 60 segundos.',
      'Implementação de integração com seguradora parceira.',
      'Automação da geração de romaneios e cobertura das entregas.',
      'Mentoria de 2 analistas de suporte para diagnóstico de incidentes.',
    ],
    technologies: [
      'React',
      'Next.js',
      'Node.js',
      'NestJS',
      'TypeScript',
      'PostgreSQL',
      'Redis',
      'RabbitMQ',
    ],
    order: 1,
  },
]

const seedContactLinks: (typeof contactLinks.$inferInsert)[] = [
  {
    label: 'LinkedIn',
    handle: 'linkedin.com/in/mateussilvasouza',
    href: 'https://linkedin.com/in/mateussilvasouza',
    order: 0,
  },
  {
    label: 'GitHub',
    handle: 'github.com/mateussilvasouza',
    href: 'https://github.com/mateussilvasouza',
    order: 1,
  },
  {
    label: 'Email',
    handle: 'mathheussilvasouza@gmail.com',
    href: 'mailto:mathheussilvasouza@gmail.com',
    order: 2,
  },
]

async function seed() {
  const insertedPosts = await db
    .insert(posts)
    .values(seedPosts)
    .onConflictDoNothing({ target: posts.slug })
    .returning({ slug: posts.slug })
  console.log(
    `Seeded ${insertedPosts.length} post(s):`,
    insertedPosts.map((p) => p.slug),
  )

  const existingProjects = await db
    .select({ id: projects.id })
    .from(projects)
    .limit(1)
  if (existingProjects.length === 0) {
    const insertedProjects = await db
      .insert(projects)
      .values(seedProjects)
      .returning({ title: projects.title })
    console.log(`Seeded ${insertedProjects.length} project(s)`)
  } else {
    console.log('Projects already seeded, skipping.')
  }

  const existingExperiences = await db
    .select({ id: experiences.id })
    .from(experiences)
    .limit(1)
  if (existingExperiences.length === 0) {
    const insertedExperiences = await db
      .insert(experiences)
      .values(seedExperiences)
      .returning({ company: experiences.company })
    console.log(`Seeded ${insertedExperiences.length} experience(s)`)
  } else {
    console.log('Experiences already seeded, skipping.')
  }

  const existingContactLinks = await db
    .select({ id: contactLinks.id })
    .from(contactLinks)
    .limit(1)
  if (existingContactLinks.length === 0) {
    const insertedLinks = await db
      .insert(contactLinks)
      .values(seedContactLinks)
      .returning({ label: contactLinks.label })
    console.log(`Seeded ${insertedLinks.length} contact link(s)`)
  } else {
    console.log('Contact links already seeded, skipping.')
  }
}

seed()
