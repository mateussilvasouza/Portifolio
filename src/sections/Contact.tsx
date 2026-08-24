import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Reveal'
import { socialLinks } from '@/data/social'

export function Contact() {
  return (
    <section id="contato" className="py-[70px] sm:py-[105px]">
      <Container>
        <Reveal className="rounded-[25px] border bg-card bg-[radial-gradient(circle_at_50%_0,rgba(139,156,255,.14),transparent_45%)] px-7.5 py-17.5 text-center">
          <div className="text-[10px] font-black tracking-[0.16em] text-accent uppercase">
            06 / contato
          </div>
          <h2 className="text-[clamp(35px,5vw,55px)] tracking-[-0.06em]">
            <span className="block">Vamos construir algo</span>
            <span className="text-gradient block">
              que funcione de verdade?
            </span>
          </h2>
          <p className="mx-auto mt-3.25 mb-6.25 max-w-[600px] text-[13px] text-muted-foreground">
            Aberto a oportunidades e desafios envolvendo backend, sistemas
            distribuídos, arquitetura, performance e produtos digitais.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {socialLinks.map((link) => {
              const isEmail = link.name === 'E-mail'
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target={isEmail ? undefined : '_blank'}
                  rel={isEmail ? undefined : 'noopener'}
                  className="rounded-[9px] border px-3 py-2.25 text-[11px] text-[#c6ceda]"
                >
                  {isEmail ? `✉ ${link.label}` : `${link.name} ↗`}
                </a>
              )
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
