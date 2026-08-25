import { db } from './index'
import { posts } from './schema'

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

async function seed() {
  const inserted = await db
    .insert(posts)
    .values(seedPosts)
    .onConflictDoNothing({ target: posts.slug })
    .returning({ slug: posts.slug })

  console.log(`Seeded ${inserted.length} post(s):`, inserted.map((p) => p.slug))
}

seed()
