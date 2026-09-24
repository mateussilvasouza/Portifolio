import Link from 'next/link'
import { Download, Lock } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { getSetting } from '@/db/queries'

const navLinks = [
  { href: '/#impacto', label: 'Impacto' },
  { href: '/#pensamento', label: 'Como penso' },
  { href: '/#cases', label: 'Cases' },
  { href: '/#experiencia', label: 'Experiência' },
  { href: '/projetos', label: 'Projetos' },
  { href: '/blog', label: 'Blog' },
]

export async function Navbar() {
  const cvUrl = (await getSetting('cv_url')) ?? 'Currículo.pdf'

  return (
    <nav className="sticky top-0 z-100 h-[72px] border-b border-border bg-background/72 backdrop-blur-xl">
      <Container className="flex h-full items-center justify-between">
        <Link href="/#sobre" className="font-black tracking-[-0.055em]">
          Mateus Souza<span className="text-accent not-italic">.Dev</span>
        </Link>

        <div className="hidden gap-6.5 text-xs text-muted-foreground md:flex lg:gap-8 lg:text-sm">
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

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <a href={cvUrl} download>
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
