import { slugify } from '@/lib/slugify'

export interface Delivery {
  area: string
  title: string
  description: string
  stack: string[]
}

export interface CompanyDetail {
  slug: string
  company: string
  period: string
  duration: string
  summary: string
  /** Trecho do resumo destacado em negrito. */
  summaryHighlight?: string
  arc: string[]
  arcNote: string
  techSheet: { label: string; value: string }[]
  deliveries: Delivery[]
  /** Nota sobre o acesso ao produto e ao código. */
  privacyNote: string
  next?: { label: string; href: string }
}

/**
 * Páginas de detalhe por empresa (/experiencia/[slug]). A home mostra as
 * entregas cadastradas no admin; aqui fica a versão completa, com área e stack
 * de cada entrega. Para criar a página de outra empresa, adicione um item.
 */
export const companyDetails: CompanyDetail[] = [
  {
    slug: 'vai-facil',
    company: 'Vai Fácil',
    period: '04/2022 — 05/2025',
    duration: '3 anos',
    summary:
      'Plataforma logística de alto volume com arquitetura de microsserviços: até 100 mil requisições diárias, SLA de 97% e ~100 usuários operacionais. Onde fui de estagiário de suporte a desenvolvedor pleno.',
    summaryHighlight: '100 mil requisições diárias',
    arc: ['Estagiário de suporte', 'Análise de dados', 'Front-end', 'Back-end', 'Arquitetura de microsserviços'],
    arcNote: '3 promoções · 4 reajustes salariais',
    techSheet: [
      { label: 'Back-end', value: 'NestJS · TypeScript' },
      { label: 'Front-end', value: 'React · Next.js' },
      { label: 'Estilo', value: 'Styled-Components · Tailwind' },
      { label: 'Dados', value: 'PostgreSQL · Looker' },
      { label: 'Mensageria', value: 'RabbitMQ' },
      { label: 'Automação', value: 'N8N' },
      { label: 'Processo', value: 'Scrum · Kanban · Jira' },
    ],
    privacyNote: 'Produto interno · código privado',
    next: { label: 'Ver Galgtec', href: '/#experiencia' },
    deliveries: [
      { area: 'Integração', title: 'Integração com seguradora, do zero', description: 'Geração de romaneios com dados de carga e cobertura automatizada das entregas, eliminando um processo manual e reduzindo risco operacional.', stack: ['NestJS', 'APIs externas'] },
      { area: 'Banco', title: 'Queries críticas mais rápidas', description: 'Ganhos de até 2s em queries transacionais e 60s em views materializadas, reduzindo travamentos de tabela em produção.', stack: ['PostgreSQL'] },
      { area: 'Front-end', title: '3 aplicações React em produção', description: 'Um sistema operacional com múltiplos módulos para ~100 usuários internos e dois dashboards de KPIs usados por 26 profissionais de 4 áreas.', stack: ['React Query', 'Redux', 'Context API'] },
      { area: 'Arquitetura', title: 'Microsserviços fora do legado', description: 'Novos serviços em TypeScript + NestJS com banco próprio, desacoplados do núcleo em JavaScript e sem tabelas compartilhadas.', stack: ['NestJS', 'TypeScript'] },
      { area: 'Refatoração', title: 'Componentes legados simplificados', description: 'Fim dos componentes gigantes e hooks desnecessários: código mais legível e fácil de manter pela equipe.', stack: ['React'] },
      { area: 'Confiabilidade', title: 'SLA de 97% numa meta de 92%', description: 'Contribuição direta para a retenção de clientes e a reputação da plataforma no mercado logístico.', stack: ['Observabilidade'] },
      { area: 'Automação', title: 'Relatórios sem trabalho manual', description: 'Automações N8N ligadas ao PostgreSQL, webhooks de microsserviços e envio de CT-e em lote por email e FTP.', stack: ['N8N', 'PostgreSQL'] },
      { area: 'Dados', title: 'Análises no Looker', description: 'Apresentações e dashboards a partir da base de big data da empresa para apoiar decisões operacionais.', stack: ['Looker'] },
      { area: 'Mentoria', title: 'Suporte que resolve sozinho', description: 'Mentoria de 2 analistas em diagnóstico de falhas e filas: incidentes de nível 1 resolvidos sem escalar para desenvolvimento.', stack: ['Mentoria'] },
      { area: 'Carreira', title: 'De estagiário a pleno em 3 anos', description: '3 promoções e 4 reajustes, passando por suporte técnico, análise de dados, front-end, back-end e microsserviços.', stack: ['Evolução'] },
    ],
  },
]

export function getCompanyDetail(slug: string) {
  return companyDetails.find((detail) => detail.slug === slug)
}

export function getCompanyDetailByName(company: string) {
  return getCompanyDetail(slugify(company))
}
