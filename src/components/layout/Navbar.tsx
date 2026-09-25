import Link from 'next/link'
import { Download, Lock } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { getSetting } from '@/db/queries'

const navLinks = [
  { href: '/#impacto', label: 'Impacto' },
  { href: '/#pensamento', label: 'Como penso' },
  { href: '/#projetos', label: 'Projetos' },
  { href: '/#experiencia', label: 'Experiência' },
  { href: '/#eventos', label: 'Eventos' },
  { href: '/#fotos', label: 'Fotos' },
  { href: '/blog', label: 'Blog' },
]

export async function Navbar() {
  const cvUrl = (await getSetting('cv_url')) ?? 'Currículo.pdf'

  return (
    <nav className="sticky top-0 z-100 h-[72px] border-b border-border bg-background/92 backdrop-blur-xl">
      <Container className="flex h-full items-center justify-between gap-6">
        <Link
          href="/#sobre"
          className="flex shrink-0 items-center gap-2 font-display text-xl font-extrabold tracking-[-0.04em]"
        >
          <span className="size-2.5 rounded-full bg-lime" />
          mateus
        </Link>

        <div className="hidden gap-6.5 text-xs font-medium text-muted-foreground md:flex lg:gap-8 lg:text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Button variant="ghost" size="sm" asChild>
            <a href={cvUrl} download>
              <Download />
              Download CV
            </a>
          </Button>

          <Button variant="ghost" size="icon-sm" asChild aria-label="Admin">
            <Link href="/admin">
              <Lock />
            </Link>
          </Button>
        </div>
      </Container>
    </nav>
  )
}
