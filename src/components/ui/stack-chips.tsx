export function StackChips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-sm border border-border px-2 py-0.5 font-mono text-[13px] text-muted-foreground"
        >
          {item}
        </li>
      ))}
    </ul>
  )
}
