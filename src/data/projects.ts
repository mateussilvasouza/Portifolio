export interface Project {
  category: string
  title: string
  description: string
  technologies: string[]
  flow: string[]
  result: string
  repoUrl: string
}

export const projects: Project[] = [
  {
    category: 'CLOUD · AWS',
    title: 'Fundamentos de Cloud com AWS',
    description:
      'Dois laboratórios práticos do bootcamp GFT (Digital Innovation One): uma arquitetura DevOps com EC2, EKS e infraestrutura como código, e um pipeline serverless completo que exporta os 1025 Pokémon da PokeAPI para CSV, orquestrado com Step Functions.',
    technologies: [
      'AWS',
      'EC2',
      'EKS',
      'CloudFormation',
      'Step Functions',
      'Lambda',
    ],
    flow: ['PokeAPI', 'Lambda', 'Step Functions', 'S3', 'CSV'],
    result: 'Pipeline validado localmente com LocalStack antes do deploy',
    repoUrl:
      'https://github.com/mateussilvasouza/GFT---Fundamentos-de-Cloud-com-AWS',
  },
]
