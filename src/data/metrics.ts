export interface Metric {
  value: string
  label: string
}

export const metrics: Metric[] = [
  {
    value: '100k+',
    label: 'requisições diárias em plataforma logística',
  },
  {
    value: '97%',
    label: 'SLA entregue contra meta contratual de 92%',
  },
  {
    value: '60s',
    label: 'ganho em views materializadas PostgreSQL',
  },
  {
    value: '30%',
    label: 'menos Lambda Functions no pipeline',
  },
]
