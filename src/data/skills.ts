export interface SkillGroup {
  title: string
  description: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',

    description:
      'Interfaces e aplicações web em produção, da experiência visual à integração com o backend.',

    skills: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Styled Components',
      'Material UI',
    ],
  },

  {
    title: 'Backend',

    description:
      'APIs, regras de negócio, integrações e serviços distribuídos.',

    skills: [
      'Node.js',
      'NestJS',
      'TypeScript',
      'REST',
      'RabbitMQ',
    ],
  },

  {
    title: 'Full Stack',

    description:
      'Conexão entre interface, APIs, dados e infraestrutura para entregar o produto completo.',

    skills: [
      'React ↔ APIs',
      'Next.js',
      'NestJS',
      'TypeScript',
    ],
  },

  {
    title: 'Arquitetura',

    description:
      'Estrutura para evolução sustentável e redução de acoplamento.',

    skills: [
      'Microsserviços',
      'DDD',
      'SOLID',
      'Clean Architecture',
      'Event-Driven',
    ],
  },

  {
    title: 'Dados',

    description:
      'Modelagem, persistência e investigação de gargalos de performance.',

    skills: [
      'PostgreSQL',
      'MySQL',
      'MongoDB',
      'Redis',
    ],
  },

  {
    title: 'Cloud & Qualidade',

    description:
      'Entrega, infraestrutura e práticas para software confiável.',

    skills: [
      'AWS',
      'Lambda',
      'Step Functions',
      'S3',
      'API Gateway',
      'Docker',
      'TDD',
      'Testes',
      'CI/CD',
    ],
  },
]