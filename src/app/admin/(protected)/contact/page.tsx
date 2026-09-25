import Link from 'next/link'
import { getAllContactLinks } from '@/db/queries'
import { Button } from '@/components/ui/button'
import { deleteContactLink } from './actions'

export const dynamic = 'force-dynamic'

export default async function AdminContactPage() {
  const links = await getAllContactLinks()

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl tracking-[-0.03em]">Formas de contato</h1>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/contact/new">Novo link</Link>
        </Button>
      </div>

      <div className="mt-6 divide-y rounded-[14px] border">
        {links.map((link) => (
          <div
            key={link.id}
            className="flex items-center justify-between gap-4 p-4"
          >
            <div className="min-w-0">
              <span className="font-medium">{link.label}</span>
              <p className="truncate text-xs text-muted-foreground">
                {link.handle} · {link.href}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/admin/contact/${link.id}/edit`}>Editar</Link>
              </Button>
              <form action={deleteContactLink.bind(null, link.id)}>
                <Button variant="ghost" size="sm" type="submit">
                  Apagar
                </Button>
              </form>
            </div>
          </div>
        ))}

        {links.length === 0 && (
          <p className="p-4 text-sm text-muted-foreground">
            Nenhum link ainda.
          </p>
        )}
      </div>
    </div>
  )
}
