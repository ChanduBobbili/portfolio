interface SectionLabelProps {
  /** Label text without the // prefix */
  children: string
  className?: string
}

export function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <p className={`font-sans text-xs font-medium tracking-[0.12em] uppercase text-brand mb-3 ${className}`}>
      {`// ${children}`}
    </p>
  )
}
