export interface Thought {
  num: string
  title: string
  description: string
}

export const thoughts: Thought[] = [
  {
    num: '01',
    title: 'Simplicidade antes da abstração.',
    description:
      'Arquitetura precisa ajudar a equipe a evoluir o produto. Na Galgtec, participei da simplificação de abstrações que dificultavam manutenção e onboarding.',
  },
  {
    num: '02',
    title: 'Performance é comportamento.',
    description:
      'Gargalos precisam ser medidos e investigados. Na Vai Fácil, otimizações de PostgreSQL trouxeram ganhos de até 60 segundos em views materializadas.',
  },
  {
    num: '03',
    title: 'Desacoplamento tem propósito.',
    description:
      'Microsserviços não são um fim. Foram usados para separar responsabilidades, criar bancos próprios e reduzir dependências do núcleo legado.',
  },
  {
    num: '04',
    title: 'Qualidade é parte da entrega.',
    description:
      'TDD, testes unitários e de integração, code review e refatoração fazem parte da forma como estruturo software sustentável.',
  },
]
