import Link from 'next/link'
import { getAllProjects } from '@/db/queries'
import { Button } from '@/components/ui/button'
import { deleteProject } from './actions'

export const dynamic = 'force-dynamic'

export default async function AdminProjectsPage() {
  const allProjects = await getAllProjects()

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl tracking-[-0.03em]">Projetos</h1>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/projects/new">Novo projeto</Link>
        </Button>
      </div>

      <div className="mt-6 divide-y rounded-[14px] border">
        {allProjects.map((project) => (
          <div
            key={project.id}
            className="flex items-center justify-between gap-4 p-4"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="truncate font-medium">{project.title}</span>
                <span className="shrink-0 rounded-md bg-accent/10 px-1.5 py-0.5 text-[10px] font-bold text-accent uppercase">
                  {project.kind === 'company' ? 'empresa' : 'estudo'}
                </span>
              </div>
              <p className="truncate text-xs text-muted-foreground">
                {project.company ?? project.period ?? '—'}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/admin/projects/${project.id}/edit`}>
                  Editar
                </Link>
              </Button>
              <form action={deleteProject.bind(null, project.id)}>
                <Button variant="ghost" size="sm" type="submit">
                  Apagar
                </Button>
              </form>
            </div>
          </div>
        ))}

        {allProjects.length === 0 && (
          <p className="p-4 text-sm text-muted-foreground">
            Nenhum projeto ainda.
          </p>
        )}
      </div>
    </div>
  )
}
