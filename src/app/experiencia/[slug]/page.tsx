import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { StackChips } from '@/components/ui/stack-chips'
import { Tag } from '@/components/ui/tag'
import { companyDetails, getCompanyDetail } from '@/data/deliveries'

export const dynamicParams = false

export function generateStaticParams() {
  return companyDetails.map((detail) => ({ slug: detail.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const detail = getCompanyDetail(slug)
  if (!detail) return {}
  return {
    title: `${detail.company} — Mateus Silva Souza`,
    description: detail.summary,
  }
}

function Summary({ text, highlight }: { text: string; highlight?: string }) {
  if (!highlight || !text.includes(highlight)) return <>{text}</>
  const [before, after] = text.split(highlight)
  return (
    <>
      {before}
      <strong className="font-medium text-foreground">{highlight}</strong>
      {after}
    </>
  )
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const detail = getCompanyDetail(slug)
  if (!detail) notFound()

  return (
    <main>
      <section className="pt-12 pb-10">
        <Container>
          <Link
            href="/#experiencia"
            className="inline-flex items-center gap-2 font-mono text-[13px] text-accent hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            Voltar para a experiência
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Tag tone="company">Empresa</Tag>
            <span className="font-mono text-[13px] text-muted-foreground">
              {detail.period} · {detail.duration} · {detail.deliveries.length} entregas
            </span>
          </div>
          <h1 className="my-4 font-display text-[44px] leading-[0.95] font-bold tracking-[-0.035em] lg:text-[72px]">
            {detail.company}
          </h1>
          <p className="max-w-[62ch] text-xl leading-[1.55] text-muted-foreground">
            <Summary text={detail.summary} highlight={detail.summaryHighlight} />
          </p>
        </Container>
      </section>

      <section className="pb-24">
        <Container className="flex flex-wrap items-start gap-12">
          <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-4">
            <h2 className="mb-2 font-mono text-xs tracking-[0.12em] text-accent uppercase">
              Entregas
            </h2>
            <ol className="flex flex-col gap-4">
              {detail.deliveries.map((delivery, index) => (
                <li
                  key={delivery.title}
                  className="grid grid-cols-1 gap-2 rounded-lg border border-border bg-card p-4 transition-all duration-200 ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-0.5 hover:bg-background-2 sm:grid-cols-[72px_minmax(0,1fr)] sm:gap-6"
                >
                  <span
                    aria-hidden="true"
                    className="pt-0.5 font-display text-[44px] leading-none font-extrabold tracking-[-0.04em] text-muted-foreground-2"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <span className="font-mono text-xs tracking-[0.08em] text-accent uppercase">
                      {delivery.area}
                    </span>
                    <h3 className="mt-1 mb-1.5 font-display text-xl leading-[1.25] font-semibold tracking-[-0.01em]">
                      {delivery.title}
                    </h3>
                    <p className="mb-2.5 text-[15px] leading-[1.55] text-muted-foreground">
                      {delivery.description}
                    </p>
                    <StackChips items={delivery.stack} />
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <aside className="flex flex-[1_1_300px] flex-col gap-4">
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="mb-3 font-mono text-xs tracking-[0.12em] text-accent uppercase">
                Evolução
              </h2>
              <ol>
                {detail.arc.map((step) => (
                  <li key={step} className="grid grid-cols-[20px_minmax(0,1fr)] items-start gap-3 pb-3.5">
                    <span
                      aria-hidden="true"
                      className="mt-1 size-3 rounded-full bg-lime shadow-[0_0_0_4px_var(--accent-soft)]"
                    />
                    <span className="text-[15px]">{step}</span>
                  </li>
                ))}
              </ol>
              <div className="border-t border-border pt-3 font-mono text-[13px] text-muted-foreground">
                {detail.arcNote}
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="mb-2 font-mono text-xs tracking-[0.12em] text-accent uppercase">
                Ficha técnica
              </h2>
              <dl>
                {detail.techSheet.map((row) => (
                  <div key={row.label} className="flex justify-between gap-4 border-t border-border py-2.5 text-sm">
                    <dt className="text-muted-foreground">{row.label}</dt>
                    <dd className="text-right">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {detail.next && (
              <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-6">
                <span className="text-[13px] text-muted-foreground">
                  Código privado · produto público
                </span>
                <Button variant="primary" size="sm" asChild className="self-start">
                  <Link href={detail.next.href}>
                    {detail.next.label}
                    <ArrowRight />
                  </Link>
                </Button>
              </div>
            )}
          </aside>
        </Container>
      </section>
    </main>
  )
}
