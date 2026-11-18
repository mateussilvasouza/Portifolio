import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Reveal'
import { getContactLinks } from '@/data/contact'

export function Contact() {
  const links = getContactLinks()

  return (
    <section id="contato" className="py-[70px] sm:py-24">
      <Container>
        <Reveal className="grid items-end gap-8 rounded-lg border border-border bg-card px-8 py-16 lg:grid-cols-[1fr_auto]">
          <div>
            <div className="font-mono text-xs tracking-[0.12em] text-accent uppercase">
              07 / Contato
            </div>
            <h2 className="mt-3 font-display text-[44px] leading-[0.95] font-bold tracking-[-0.035em] lg:text-[64px]">
              Vamos construir algo juntos?
            </h2>
            <p className="mt-4 max-w-[520px] text-sm text-muted-foreground">
              Aberto a oportunidades e desafios envolvendo backend, sistemas
              distribuídos, arquitetura, performance e produtos digitais.
            </p>
          </div>

          <ul className="grid gap-1">
            {links.map((link) => {
              const isEmail = link.href.startsWith('mailto:')
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={isEmail ? undefined : '_blank'}
                    rel={isEmail ? undefined : 'noopener noreferrer'}
                    className="group flex items-center justify-between gap-8 border-b border-border py-3 font-medium"
                  >
                    {link.label}
                    <span className="font-mono text-[13px] text-muted-foreground group-hover:text-accent">
                      {link.handle}
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}
