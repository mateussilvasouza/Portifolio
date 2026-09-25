import { notFound } from 'next/navigation'
import { getExperienceById } from '@/db/queries'
import { ExperienceForm } from '../../ExperienceForm'
import { updateExperience } from '../../actions'

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const experience = await getExperienceById(Number(id))

  if (!experience) notFound()

  return (
    <div>
      <h1 className="mb-6 text-2xl tracking-[-0.03em]">Editar experiência</h1>
      <ExperienceForm
        action={updateExperience.bind(null, experience.id)}
        initialValues={{
          company: experience.company,
          role: experience.role,
          period: experience.period,
          duration: experience.duration ?? '',
          product: experience.product ?? '',
          description: experience.description ?? '',
          highlights: experience.highlights,
          technologies: experience.technologies,
          order: experience.order,
        }}
      />
    </div>
  )
}
