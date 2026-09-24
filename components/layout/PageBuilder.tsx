import type { ComponentType } from 'react'

import { Committee } from '@/components/sections/Committee'
import { Faq } from '@/components/sections/Faq'
import { Hero } from '@/components/sections/Hero'
import { Intro } from '@/components/sections/Intro'
import { Statement } from '@/components/sections/Statement'
import { ValueProps } from '@/components/sections/ValueProps'
import type { PageSection, SectionDataMap, SectionType } from '@/types/content'

/**
 * Section type → component. The type makes this exhaustive: a section added to
 * `SectionDataMap` fails the build until it has a component here.
 */
const sections: { [K in SectionType]: ComponentType<{ data: SectionDataMap[K] }> } = {
  hero: Hero,
  intro: Intro,
  statement: Statement,
  valueProps: ValueProps,
  committee: Committee,
  faq: Faq,
}

/**
 * Renders a page's sections in CMS order. Server component: the data is
 * already resolved and mapped by `lib/cms/`, so nothing here fetches.
 */
export function PageBuilder({ sections: items }: { sections: PageSection[] }) {
  return items.map((section) => {
    // TS cannot correlate `type` with `data` through the lookup; the map's type guarantees it.
    const Section = sections[section.type] as ComponentType<{ data: PageSection['data'] }>
    return <Section key={section.id} data={section.data} />
  })
}
