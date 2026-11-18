import { ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Reveal'
import { Button } from '@/components/ui/button'
import { GithubIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import { profile, trail } from '@/data/profile'
import { getContactLinks } from '@/data/contact'

/** Email e WhatsApp mostram o próprio contato; os outros, o nome da rede. */
function heroContactText(link: { label: string; handle: string; href: string }) {
  const showHandle = link.href.startsWith('mailto:') || link.href.includes('wa.me')
  return showHandle ? link.handle : link.label
}

export function Hero() {
  const contactLinks = getContactLinks()
  const github = contactLinks.find((link) => link.label === 'GitHub')
  const heroLinks = contactLinks.filter((link) => link.label !== 'GitHub')

  return (
    <section id="sobre" className="pt-12 pb-8 lg:pt-16 lg:pb-12">
      <Container>
        <Reveal>
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 self-start rounded-full border border-border py-1.5 pr-3.5 pl-2.5 text-sm text-muted-foreground">
                <span className="size-2 rounded-full bg-lime shadow-[0_0_0_4px_var(--accent-soft)]" />
                {profile.availability}
              </div>

              <div className="font-mono text-xs tracking-[0.12em] text-accent uppercase">
                {profile.eyebrow}
              </div>

              <h1 className="font-display text-[56px] leading-[0.92] font-bold tracking-[-0.035em] lg:text-[88px]">
                {profile.shortName}
              </h1>

              <p className="max-w-[52ch] text-xl leading-[1.55] text-muted-foreground">
                Aprendo em público e entrego em produção. Do suporte técnico à{' '}
                <span className="mark-lime">arquitetura de microsserviços</span>{' '}
                em 3 anos, construindo APIs, interfaces e integrações para
                sistemas de alto volume.
              </p>

              <div className="flex flex-wrap gap-3">
                <Button variant="primary" asChild className="group">
                  <a href="#projetos">
                    Ver projetos
                    <ArrowUpRight className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </Button>
                {github && (
                  <Button variant="ghost" asChild>
                    <a href={github.href} target="_blank" rel="noopener noreferrer">
                      <GithubIcon className="size-4" />
                      GitHub
                    </a>
                  </Button>
                )}
              </div>

              {heroLinks.length > 0 && (
                <ul
                  aria-label="Contato"
                  className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[13px] font-medium"
                >
                  {heroLinks.map((link) => {
                    const external = !link.href.startsWith('mailto:') && !link.href.startsWith('#')
                    return (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target={external ? '_blank' : undefined}
                          rel={external ? 'noopener noreferrer' : undefined}
                          className="text-muted-foreground transition-colors hover:text-accent"
                        >
                          {heroContactText(link)}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>

            <div className="overflow-hidden rounded-lg border border-border bg-card">
              <div className="flex flex-col gap-3 px-6 pt-8 pb-2 sm:px-8">
                <span className="font-mono text-xs tracking-[0.12em] text-muted-foreground uppercase">
                  Minha trilha · {trail.period}
                </span>
                <div className="font-display text-[32px] leading-[1.05] font-bold tracking-[-0.03em] sm:text-[40px]">
                  {trail.title}
                </div>
                <div className="font-mono text-[13px] text-muted-foreground">
                  {trail.summary}
                </div>
              </div>
              <ol className="grid grid-cols-2 gap-x-1 gap-y-4 px-6 pt-5 pb-8 sm:grid-cols-6 sm:px-8">
                {trail.steps.map((step, index) => (
                  <li key={step} className="flex min-w-0 flex-col gap-3">
                    <span aria-hidden="true" className="h-1.5 rounded-[3px] bg-lime" />
                    <span className="font-mono text-[11px] leading-[1.35] tracking-[0.04em] text-muted-foreground hyphens-auto [overflow-wrap:anywhere]">
                      <b className="block font-medium text-foreground">
                        {String(index + 1).padStart(2, '0')}
                      </b>
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-2 border-t border-border sm:grid-cols-4">
            {profile.stats.map((stat, index) => (
              <div
                key={stat.label}
                className={cn(
                  'pt-6 pr-6',
                  index > 0 && index !== 2 && 'border-l border-border pl-6',
                  index === 2 && 'sm:border-l sm:border-border sm:pl-6'
                )}
              >
                <b className="block font-display text-[40px] leading-none tracking-[-0.03em]">
                  {stat.value}
                </b>
                <span className="mt-2 block text-sm text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
