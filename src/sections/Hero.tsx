import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Reveal'
import { Button } from '@/components/ui/button'
import { GithubIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import { profile } from '@/data/profile'
import { getAllContactLinks } from '@/db/queries'

export async function Hero() {
  const contactLinks = await getAllContactLinks()
  const github = contactLinks.find((link) => link.label === 'GitHub')

  return (
    <section id="sobre" className="pt-12 pb-8 lg:pt-16 lg:pb-12">
      <Container>
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-border py-1.5 pr-3.5 pl-2.5 text-sm text-muted-foreground">
            <span className="size-2 rounded-full bg-lime shadow-[0_0_0_4px_var(--accent-soft)]" />
            {profile.availability}
          </div>

          <h1 className="my-6 font-display text-[56px] leading-[0.92] font-bold tracking-[-0.035em] lg:text-[88px]">
            {profile.shortName}
          </h1>

          <div className="font-mono text-[13px] tracking-[0.12em] text-accent uppercase">
            {profile.role}
          </div>

          <p className="mt-6 mb-8 max-w-[60ch] text-xl leading-[1.55] text-muted-foreground">
            3+ anos construindo{' '}
            <strong className="font-medium text-foreground">
              interfaces, APIs e microsserviços
            </strong>{' '}
            para produtos em produção — do suporte e dados ao frontend,
            backend e <span className="mark-lime">arquitetura</span>.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button variant="primary" asChild className="group">
              <a href="#projetos">
                Ver projetos
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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

          <div className="mt-12 grid grid-cols-2 border-t border-border sm:grid-cols-4">
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
