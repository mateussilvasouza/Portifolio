export interface SkillGroup {
  title: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Linguagens e frameworks',
    skills: ['Node.js', 'NestJS', 'Next.js', 'React', 'TypeScript', 'JavaScript', 'Redux', 'React Query', 'Tailwind', 'shadcn/ui'],
  },
  {
    title: 'Arquitetura',
    skills: ['Microsserviços', 'Clean Architecture', 'SOLID', 'DDD', 'Orientada a eventos'],
  },
  {
    title: 'APIs e integrações',
    skills: ['REST', 'RabbitMQ', 'Joi', 'Zod', 'APIs de terceiros'],
  },
  {
    title: 'Banco de dados',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Prisma', 'TypeORM', 'Sequelize'],
  },
  {
    title: 'DevOps e cloud',
    skills: ['Docker', 'GitHub Actions', 'CI/CD', 'AWS Lambda', 'Step Functions', 'S3', 'EC2', 'EKS', 'CloudWatch'],
  },
  {
    title: 'Dados e automação',
    skills: ['N8N', 'Looker', 'Relatórios PostgreSQL'],
  },
  {
    title: 'Testes e qualidade',
    skills: ['TDD', 'Jest', 'Vitest', 'Testes de integração', 'Code Review'],
  },
]
