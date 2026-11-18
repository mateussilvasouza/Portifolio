export interface StudyTopic {
  short: string
  name: string
  note: string
}

/** Seção "Em estudo": o que está sendo estudado agora (do currículo). */
export const studying: StudyTopic[] = [
  { short: 'PY', name: 'Python', note: 'Linguagem' },
  { short: 'JAVA', name: 'Java', note: 'Linguagem' },
  { short: 'NG', name: 'Angular', note: 'Front-end' },
  { short: 'BI', name: 'Power BI', note: 'Dados e dashboards' },
  { short: 'ETL', name: 'Processos de ETL', note: 'Engenharia de dados' },
]
