import { cn } from '@/lib/utils/cn'
import type { HeadingLine } from '@/types/content'

type DisplayHeadingProps = {
  lines: HeadingLine[]
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  /** Colour applied to non-accent lines. Accent lines are always flame. */
  tone?: 'ink' | 'sand'
}

/**
 * Renders a line-by-line display heading. Accent lines come from the content
 * layer, so editors control which lines turn orange without touching code.
 */
export function DisplayHeading({
  lines,
  as: Tag = 'h2',
  className,
  tone = 'ink',
}: DisplayHeadingProps) {
  return (
    <Tag className={cn('type-display', tone === 'sand' ? 'text-sand' : 'text-ink', className)}>
      {lines.map((line, index) => (
        <span key={`${line.text}-${index}`} className="block">
          <span className={line.accent ? 'text-flame' : undefined}>{line.text}</span>
        </span>
      ))}
    </Tag>
  )
}
