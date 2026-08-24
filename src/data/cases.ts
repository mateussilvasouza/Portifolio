export interface CaseStudy {
  category: string
  title: string
  description: string
  technologies: string[]
  flow: string[]
  result: string
  highlight?: string
}

export const cases: CaseStudy[] = [
  {
    category: 'FRONTEND · REACT / NEXT.JS',
    title: 'Interfaces que também precisam escalar.',
    description:
      'Desenvolvimento e manutenção de aplicações React em produção, trabalhando da interface até a integração com APIs e construindo aplicações web com TypeScript.',
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
    ],
    flow: ['React', 'Next.js', 'UI', 'APIs'],
    result: '3 aplicações React em produção',
    highlight: 'Frontend',
  },

  {
    category: 'PERFORMANCE · POSTGRESQL',
    title: 'Quando o banco vira o gargalo.',
    description:
      'Otimização de queries críticas em PostgreSQL, incluindo consultas transacionais e views materializadas, buscando reduzir tempo de execução e travamentos de tabela.',
    technologies: [
      'PostgreSQL',
      'TypeORM',
      'SQL',
    ],
    flow: [
      'Query',
      'Profiling',
      'Otimização',
      'Produção',
    ],
    result: 'Até 60s de ganho',
    highlight: 'Performance',
  },

  {
    category: 'CLOUD · AWS',
    title: 'Menos funções, mais clareza.',
    description:
      'Consolidação de funções Lambda que executavam a mesma lógica com diferentes filtros, reduzindo complexidade e gargalos no pipeline de deploy.',
    technologies: [
      'AWS Lambda',
      'Step Functions',
      'AWS',
    ],
    flow: [
      'Lambdas',
      'Consolidação',
      'Parâmetros',
      'Deploy',
    ],
    result: '30% menos Lambda Functions',
    highlight: 'Cloud',
  },

  {
    category: 'BACKEND · MICROSSERVIÇOS',
    title: 'Desacoplar para conseguir evoluir.',
    description:
      'Desenvolvimento de novos serviços utilizando NestJS e TypeScript, com bancos próprios para reduzir dependências de tabelas compartilhadas do sistema legado.',
    technologies: [
      'Node.js',
      'NestJS',
      'TypeScript',
      'PostgreSQL',
    ],
    flow: [
      'Legado',
      'NestJS',
      'DB próprio',
      'Serviço',
    ],
    result: 'Serviços mais independentes',
    highlight: 'Backend',
  },

  {
    category: 'INTEGRAÇÃO · LOGÍSTICA',
    title: 'Automatizar o que não deveria ser manual.',
    description:
      'Implementação de integração com seguradora parceira e automação da geração de romaneios e cobertura das entregas.',
    technologies: [
      'TypeScript',
      'APIs',
      'Integrações',
    ],
    flow: [
      'Integração',
      'Dados',
      'Romaneio',
      'Automação',
    ],
    result: 'Menor risco operacional',
    highlight: 'Business',
  },
]