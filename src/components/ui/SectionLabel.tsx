interface SectionLabelProps {
  /** Label text without the // prefix */
  children: string
  className?: string
}

export function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <p className={`label-mission mb-3 ${className}`}>
      {`// ${children}`}
    </p>
  )
}
