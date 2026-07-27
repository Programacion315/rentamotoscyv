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
              "overflow-hidden rounded-[16px] border bg-eggshell transition-all duration-300",
              isOpen
                ? "border-brand/30 shadow-[0_4px_16px_rgba(51,63,123,0.08)]"
                : "border-stone hover:border-stone/80"
            )}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className={cn(
                "font-body font-medium transition-colors duration-200",
                isOpen ? "text-brand" : "text-ink"
              )}>
                {item.q}
              </span>
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                  isOpen
                    ? "bg-brand text-white rotate-180"
                    : "bg-warm-taupe text-smoke"
                )}
              >
                <span className="material-symbols-outlined text-[18px]">expand_more</span>
              </span>
            </button>
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <div className="border-t border-stone/60 px-6 py-5">
                  <p className="max-w-2xl font-body-sm leading-relaxed text-smoke">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
