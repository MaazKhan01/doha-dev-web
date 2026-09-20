'use client'

import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'

import { Diamond } from '@/components/ui/Diamond'
import { cn } from '@/lib/utils/cn'
import type { FaqItem } from '@/types/content'

/** Plus that loses its upright stroke when the row opens, becoming a minus. */
function Marker({ open }: { open: boolean }) {
  return (
    <Diamond
      spin={open}
      className="size-6 bg-ink text-sand group-hover:bg-flame md:size-7"
    >
      <span className="relative block size-3">
        <span className="absolute top-1/2 left-0 h-[1.5px] w-full -translate-y-1/2 rounded-full bg-current" />
        <span
          className={cn(
            'absolute top-0 left-1/2 h-full w-[1.5px] -translate-x-1/2 rounded-full bg-current',
            'transition-opacity duration-500 ease-[var(--ease-brand)]',
            open ? 'opacity-0' : 'opacity-100',
          )}
        />
      </span>
    </Diamond>
  )
}

export function Accordion({ items }: { items: FaqItem[] }) {
  const [openValue, setOpenValue] = useState<string>(items[0]?.id ?? '')
  const shouldReduceMotion = useReducedMotion()

  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      value={openValue}
      onValueChange={setOpenValue}
      className="border-t border-hairline"
    >
      {items.map((item) => {
        const open = openValue === item.id

        return (
          <AccordionPrimitive.Item
            key={item.id}
            value={item.id}
            className="border-b border-hairline"
          >
            <AccordionPrimitive.Header>
              <AccordionPrimitive.Trigger
                className={cn(
                  'group flex w-full items-center justify-between gap-5 py-5 text-start md:py-6',
                  'transition-colors duration-300 hover:text-flame',
                )}
              >
                <span className="text-sm leading-snug md:text-base">{item.question}</span>
                <Marker open={open} />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>

            <AnimatePresence initial={false}>
              {open && (
                <AccordionPrimitive.Content forceMount asChild>
                  <motion.div
                    key="content"
                    initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="type-lead max-w-3xl pb-7 text-muted md:pb-8">{item.answer}</p>
                  </motion.div>
                </AccordionPrimitive.Content>
              )}
            </AnimatePresence>
          </AccordionPrimitive.Item>
        )
      })}
    </AccordionPrimitive.Root>
  )
}
