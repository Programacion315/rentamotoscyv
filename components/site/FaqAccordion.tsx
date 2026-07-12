"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type FaqItem = { q: string; a: string }

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div
            key={item.q}
            className={cn(
              "overflow-hidden rounded-[20px] border border-stone bg-eggshell transition-colors duration-200",
              isOpen && "bg-warm-taupe/40"
            )}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
            >
              <span className="font-body font-medium text-ink">{item.q}</span>
              <span
                className={cn(
                  "material-symbols-outlined shrink-0 text-smoke transition-transform duration-300 ease-out motion-reduce:transition-none",
                  isOpen && "rotate-180"
                )}
              >
                expand_more
              </span>
            </button>
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl px-5 pb-5 font-body-sm leading-relaxed text-smoke md:px-6 md:pb-6">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
