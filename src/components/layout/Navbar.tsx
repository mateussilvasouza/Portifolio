import Link from 'next/link'
import { Download } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'

const navLinks = [
  { href: '/#sobre', label: 'Sobre' },
  { href: '/#experiencia', label: 'Experiência' },
  { href: '/#projetos', label: 'Projetos' },
  { href: '/#estudando', label: 'Estudando' },
  { href: '/#canal', label: 'Canal' },
]

const cvUrl = '/Currículo.pdf'

export function Navbar() {
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
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              <span className="mr-1.5 font-mono text-[11px] text-accent">
                {String(index + 1).padStart(2, '0')}
              </span>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
            <a href={cvUrl} download>
              <Download />
              Download CV
            </a>
          </Button>

          <Button variant="primary" size="sm" asChild>
            <Link href="/#contato">Contato</Link>
          </Button>
        </div>
      </Container>
    </nav>
  )
}
