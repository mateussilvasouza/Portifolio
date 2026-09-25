import Link from 'next/link'
import { getAllExperiences } from '@/db/queries'
import { Button } from '@/components/ui/button'
import { deleteExperience } from './actions'

export const dynamic = 'force-dynamic'

export default async function AdminExperiencePage() {
  const allExperiences = await getAllExperiences()

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl tracking-[-0.03em]">Experiência</h1>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/experience/new">Nova experiência</Link>
        </Button>
      </div>

      <div className="mt-6 divide-y rounded-[14px] border">
        {allExperiences.map((experience) => (
          <div
            key={experience.id}
            className="flex items-center justify-between gap-4 p-4"
          >
            <div className="min-w-0">
              <span className="font-medium">{experience.company}</span>
              <p className="truncate text-xs text-muted-foreground">
                {experience.role} · {experience.period}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/admin/experience/${experience.id}/edit`}>
                  Editar
                </Link>
              </Button>
              <form action={deleteExperience.bind(null, experience.id)}>
                <Button variant="ghost" size="sm" type="submit">
                  Apagar
                </Button>
              </form>
            </div>
          </div>
        ))}

        {allExperiences.length === 0 && (
          <p className="p-4 text-sm text-muted-foreground">
            Nenhuma experiência ainda.
          </p>
        )}
      </div>
    </div>
  )
}
