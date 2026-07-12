"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

type FormSelectOption = { value: string; label: string }

type FormSelectProps = {
  id?: string
  name: string
  placeholder: string
  options: FormSelectOption[]
  required?: boolean
  disabled?: boolean
  className?: string
} & (
  | { defaultValue?: string | null; value?: never; onValueChange?: never }
  | {
      value: string | null
      onValueChange?: (value: string | null | undefined) => void
      defaultValue?: never
    }
)

export function FormSelect({
  id,
  name,
  placeholder,
  options,
  required,
  disabled,
  className,
  ...valueProps
}: FormSelectProps) {
  const selectValueProps =
    "value" in valueProps && valueProps.value !== undefined
      ? {
          value: valueProps.value || null,
          onValueChange: valueProps.onValueChange,
        }
      : {
          defaultValue: valueProps.defaultValue || null,
        }

  return (
    <Select
      name={name}
      required={required}
      disabled={disabled}
      items={options}
      {...selectValueProps}
    >
      <SelectTrigger
        id={id}
        className={cn(
          "h-auto w-full rounded-[4px] border border-input bg-eggshell px-3 py-2.5 text-base md:text-sm",
          className
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
