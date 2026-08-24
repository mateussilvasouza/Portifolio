import { Container } from '@/components/layout/Container'

const navLinks = [
  { href: '#impacto', label: 'impacto' },
  { href: '#pensamento', label: 'engenharia' },
  { href: '#cases', label: 'cases' },
  { href: '#experiencia', label: 'experiência' },
]

export function Navbar() {
  return (
    <nav className="sticky top-0 z-100 h-[72px] border-b border-border bg-background/72 backdrop-blur-xl">
      <Container className="flex h-full items-center justify-between">
        <a href="#sobre" className="font-black tracking-[-0.055em]">
          mateus<span className="text-accent not-italic">.dev</span>
        </a>

        <div className="hidden gap-6.5 text-xs text-muted-foreground md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="Curriculo_Mateus_Final_v3.docx"
          download
          className="rounded-[9px] border border-border bg-white/2.5 px-3.5 py-2.5 text-[11px] text-foreground/90"
        >
          DOWNLOAD CV
        </a>
      </Container>
    </nav>
  )
}
