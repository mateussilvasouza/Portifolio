export interface Experience {
  company: string
  role: string
  period: string
  duration: string
  product: string
  description: string
  highlights: string[]
  technologies: string[]
}

export const experiences: Experience[] = [
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

    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'AWS',
      'Lambda',
    ],
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
  },
]