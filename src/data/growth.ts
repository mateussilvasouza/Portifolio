export const growthIntro = {
  title: ['3 promoções.', 'Uma visão mais completa.'],
  description:
    'Em aproximadamente três anos, a trajetória passou por suporte técnico, análise de dados, frontend, backend e arquitetura de microsserviços.',
}

export interface GrowthStep {
  title: string
  description: string
  tag: string
}

export const growthPath: GrowthStep[] = [
  {
    title: 'Suporte técnico',
    description: 'diagnóstico e incidentes',
    tag: 'início',
  },
  {
    title: 'Análise de dados',
    description: 'investigação e operação',
    tag: 'evolução',
  },
  {
    title: 'Frontend / Backend',
    description: 'produto e APIs',
    tag: 'full stack',
  },
  {
    title: 'Desenvolvedor Pleno',
    description: 'microsserviços e arquitetura',
    tag: 'hoje',
  },
]
