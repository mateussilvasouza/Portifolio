import { notFound } from 'next/navigation'
import { getProjectById } from '@/db/queries'
import type { ProjectLink } from '@/db/schema'
import { ProjectForm } from '../../ProjectForm'
import { updateProject } from '../../actions'

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = await getProjectById(Number(id))

  if (!project) notFound()

  return (
    <div>
      <h1 className="mb-6 text-2xl tracking-[-0.03em]">Editar projeto</h1>
      <ProjectForm
        action={updateProject.bind(null, project.id)}
        initialValues={{
          kind: project.kind,
          title: project.title,
          description: project.description,
          period: project.period ?? '',
          company: project.company ?? '',
          role: project.role ?? '',
          stack: project.stack,
          links: project.links as ProjectLink[],
          metricValue: project.metricValue ?? '',
          metricLabel: project.metricLabel ?? '',
          privateNote: project.privateNote ?? '',
          order: project.order,
        }}
      />
    </div>
  )
}
