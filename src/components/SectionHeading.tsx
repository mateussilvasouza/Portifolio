interface SectionHeadingProps {
  kicker: string
  title: string
  description?: string
}

export function SectionHeading({
  kicker,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mb-12 max-w-[760px]">
      <div className="font-mono text-xs tracking-[0.12em] text-accent uppercase">
        {kicker}
      </div>
      <h2 className="mt-3 font-display text-[40px] leading-none font-bold tracking-[-0.03em] lg:text-[56px]">
        {title}
      </h2>
      {description && (
        <p className="mt-3.5 text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
