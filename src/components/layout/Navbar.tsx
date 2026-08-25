import Link from 'next/link'
import { Download, Lock } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'

const navLinks = [
  { href: '#impacto', label: 'Impacto' },
  { href: '#pensamento', label: 'Engenharia' },
  { href: '#cases', label: 'Cases' },
  { href: '#experiencia', label: 'Experiência' },
  { href: '/blog', label: 'Blog' },
]

export function Navbar() {
  return (
    <nav className="sticky top-0 z-100 h-[72px] border-b border-border bg-background/72 backdrop-blur-xl">
      <Container className="flex h-full items-center justify-between">
        <a href="#sobre" className="font-black tracking-[-0.055em]">
          mateus<span className="text-accent not-italic">.dev</span>
        </a>

        <div className="hidden gap-6.5 text-xs text-muted-foreground md:flex">
          {navLinks.map((link) =>
            link.href.startsWith('#') ? (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ),
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <a href="Curriculo_Mateus_Final_v3.docx" download>
              <Download />
              Download CV
            </a>
          </Button>

          <Button variant="outline" size="icon-sm" asChild aria-label="Admin">
            <Link href="/admin">
              <Lock />
            </Link>
          </Button>
        </div>
      </Container>
    </nav>
  )
}
