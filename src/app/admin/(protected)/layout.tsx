import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { logout } from './actions'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <nav className="flex h-16 items-center justify-between border-b px-6">
        <Link href="/admin" className="font-black tracking-[-0.055em]">
          admin<span className="text-accent">.</span>
        </Link>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/posts/new">Novo post</Link>
          </Button>
          <form action={logout}>
            <Button variant="outline" size="sm" type="submit">
              Sair
            </Button>
          </form>
        </div>
      </nav>

      <main className="mx-auto w-[min(960px,calc(100%-42px))] py-10">
        {children}
      </main>
    </div>
  )
}
