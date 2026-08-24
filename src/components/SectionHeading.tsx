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
    <div className="mb-10.5 max-w-[760px]">
      <div className="text-[10px] font-black tracking-[0.16em] text-accent uppercase">
        {kicker}
      </div>
      <h2 className="mt-2.5 text-[clamp(32px,5vw,54px)] leading-none tracking-[-0.06em]">
        {title}
      </h2>
      {description && (
        <p className="mt-3.5 text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
