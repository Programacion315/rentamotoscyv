import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-full border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-[opacity,transform,background-color,border-color,color] duration-200 outline-none select-none focus-visible:ring-2 focus-visible:ring-primary/25 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 font-[family-name:var(--font-inter)]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-transparent hover:opacity-90 shadow-whisper",
        outline:
          "border-[#e5e5e5] bg-eggshell text-ink hover:bg-warm-taupe",
        secondary:
          "bg-warm-taupe text-ink border-transparent hover:bg-stone",
        ghost:
          "border-[#e5e5e5] bg-transparent text-ink hover:bg-warm-taupe",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:ring-destructive/20",
        link: "text-ink underline-offset-4 hover:underline border-transparent rounded-none",
      },
      size: {
        default: "h-10 gap-2 px-4 has-data-[icon=inline-end]:pr-3.5 has-data-[icon=inline-start]:pl-3.5",
        xs: "h-7 gap-1 px-2.5 text-xs",
        sm: "h-8 gap-1.5 px-3.5 text-[0.8rem]",
        lg: "h-11 gap-2 px-5",
        icon: "size-10",
        "icon-xs": "size-7",
        "icon-sm": "size-8",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  nativeButton,
  render,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  // When rendering as Link/<a>, Base UI requires nativeButton={false}
  const isNative = nativeButton ?? render == null

  return (
    <ButtonPrimitive
      data-slot="button"
      nativeButton={isNative}
      render={render}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
