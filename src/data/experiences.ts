export interface Highlight {
  /** Abertura em destaque (negrito). */
  title: string
  text: string
}

export interface Experience {
  company: string
  role: string
  period: string
  duration?: string
  /** Linha curta sob o nome da empresa. */
  summary: string
  /** A home mostra as 4 primeiras. A lista completa fica em data/deliveries.ts. */
  highlights: Highlight[]
  technologies?: string[]
  /** Páginas públicas dos produtos da empresa. */
  links?: { label: string; href: string }[]
}

/** Seção "Experiência", da mais recente para a mais antiga. */
export const experiences: Experience[] = [
  {
    company: 'Galgtec',
    role: 'Desenvolvedor Full Stack',
    period: '05/2025 — 05/2026',
    duration: '1 ano',
    summary: 'SaaS jurídico · consulta de processos em todos os tribunais do Brasil',
    highlights: [
      { title: 'Consolidação de Lambdas.', text: 'Funções redundantes viraram uma única função parametrizada: −30% funções no pipeline.' },
      { title: 'Front-end da plataforma', text: 'em React/Next.js, com interfaces de consulta processual para escritórios de advocacia.' },
      { title: 'Arquitetura mais simples.', text: 'Orientei o backend a reverter abstrações excessivas que travavam manutenção e onboarding.' },
      { title: 'APIs de tribunais', text: 'estaduais e federais: autenticação, schemas diferentes e falhas parciais sem perda de dados.' },
    ],
    technologies: ['Next.js', 'React', 'AWS Lambda', 'Kanban · Trello'],
    links: [
      { label: 'GalgJur', href: 'https://galgjur.com.br/' },
      { label: 'Galgtec', href: 'https://galgtec.com.br/' },
    ],
  },
  {
    company: 'Vai Fácil',
    role: 'De estagiário de suporte a Desenvolvedor Full Stack',
    period: '04/2022 — 05/2025',
    duration: '3 anos',
    summary: 'Plataforma logística · microsserviços · ~100 usuários operacionais',
    highlights: [
      { title: 'Integração com seguradora, do zero:', text: 'geração de romaneios e cobertura automatizada das entregas.' },
      { title: 'Queries PostgreSQL otimizadas:', text: 'até 2s em transacionais e 60s em views materializadas.' },
      { title: '3 apps React em produção:', text: 'sistema operacional para ~100 usuários e 2 dashboards de KPIs para 26 profissionais.' },
      { title: 'SLA de 97%', text: 'entregue em contrato que exigia 92%.' },
    ],
  },
]
