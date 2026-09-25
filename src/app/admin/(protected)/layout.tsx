import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { logout } from './actions'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <nav className="border-b">
        <Container className="flex h-16 w-[min(960px,calc(100%-42px))] items-center justify-between gap-3">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin">Posts</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/projects">Projetos</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/experience">Experiência</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/events">Eventos</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/contact">Contato</Link>
            </Button>
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/settings">Configurações</Link>
            </Button>
            <form action={logout}>
              <Button variant="ghost" size="sm" type="submit">
                Sair
              </Button>
            </form>
          </div>
        </Container>
      </nav>

      <main className="mx-auto w-[min(960px,calc(100%-42px))] py-10">
        {children}
      </main>
    </div>
  )
}
