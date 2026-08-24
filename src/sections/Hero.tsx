import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Reveal'
import { Button } from '@/components/ui/button'
import { profile } from '@/data/profile'

const pipeline = [
  ['ReactJs', 'NextJs'],
  ['NodeJs', 'NestJS'],
  ['CI/CD','AWS'],
  ['Monolitic', 'Microsservice'],
  ['Development','Production']
]

export function Hero() {
  const heroStats = profile.stats.slice(0, 3)

  return (
    <section id="sobre" className="py-20 lg:py-28">
      <Container className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <div className="inline-flex items-center gap-2.5 text-[10px] font-extrabold tracking-[0.14em] text-accent uppercase">
            <span className="h-1.75 w-1.75 rounded-full bg-accent shadow-[0_0_0_6px_rgba(72,223,200,.08)]" />
            Full Stack · Backend · Systems
          </div>

          <h1 className="my-5.5 text-[clamp(48px,7.2vw,82px)] leading-[0.94] tracking-[-0.075em]">
            Da <span className="text-gradient">interface</span> à
            infraestrutura.
          </h1>

          <p className="max-w-[690px] text-lg text-muted-foreground">
            Sou <strong className="font-semibold text-foreground">{profile.name}</strong>,{' '}
            {profile.description}
          </p>

          <div className="mt-7.5 flex flex-wrap gap-2.5">
            <Button variant="gradient" size="lg" asChild>
              <a href="#cases">Explorar minha engenharia ↓</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#contato">Entrar em contato</a>
            </Button>
          </div>

          <div className="mt-10.5 flex flex-wrap gap-7">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <b className="block text-[23px] tracking-[-0.05em]">
                  {stat.value}
                </b>
                <span className="text-[10px] tracking-[0.08em] text-muted-foreground-2 uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal
          className="overflow-hidden rounded-[22px] border border-border bg-card/90 shadow-[0_35px_90px_rgba(0,0,0,.38)] transition-transform duration-500 [transform:perspective(900px)_rotateY(-3deg)] hover:[transform:perspective(900px)_rotateY(0deg)]"
        >
          <div className="flex h-10.5 items-center gap-1.75 border-b border-border px-4">
            <span className="h-2 w-2 rounded-full bg-[#3a4354]" />
            <span className="h-2 w-2 rounded-full bg-[#3a4354]" />
            <span className="h-2 w-2 rounded-full bg-[#3a4354]" />
            <span className="ml-2 font-mono text-[10px] text-muted-foreground-2">
              architecture.ts
            </span>
          </div>

          <div className="px-6 pt-6 pb-7.5 font-mono text-xs leading-[2] text-[#c8d0dc]">
            <div className="text-[#657188]">// how I build</div>
            <div>
              <span className="text-[#9ca9ff]">const</span> engineer = {'{'}
            </div>
            <div>&nbsp;&nbsp;focus: <span className="text-[#65e2cf]">"reliable systems"</span>,</div>
            <div>&nbsp;&nbsp;architecture: <span className="text-[#65e2cf]">"simple & scalable"</span>,</div>
            <div>&nbsp;&nbsp;quality: <span className="text-[#65e2cf]">"tests + review"</span>,</div>
            <div>&nbsp;&nbsp;delivery: <span className="text-[#65e2cf]">"continuous"</span></div>
            <div>{'}'};</div>

            <div className="my-7 grid gap-2.5">
              {pipeline.map(([from, to]) => (
                <div key={from} className="flex items-center gap-2.5">
                  <span className="rounded-lg border border-border bg-white/3.5 px-2.5 py-2 text-[10px] whitespace-nowrap text-[#cbd3e0]">
                    {from}
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-primary to-accent opacity-60" />
                  <span className="rounded-lg border border-border bg-white/3.5 px-2.5 py-2 text-[10px] whitespace-nowrap text-[#cbd3e0]">
                    {to}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-[#657188]">// production mindset</div>
            <div>
              <span className="text-[#9ca9ff]">return</span>{' '}
              <span className="text-[#f2bd7b]">"build → measure → improve"</span>;
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
