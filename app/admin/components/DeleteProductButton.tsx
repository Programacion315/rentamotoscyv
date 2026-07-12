"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function DeleteProductButton({
  id,
  name,
  action,
}: {
  id: string
  name: string
  action: (formData: FormData) => Promise<void>
}) {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="border-destructive/30 text-destructive hover:bg-destructive/5"
          />
        }
      >
        <span className="material-symbols-outlined text-[18px]">delete</span>
        Eliminar
      </DialogTrigger>
      <DialogContent className="rounded-[20px] bg-eggshell sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading-sm text-[22px]">¿Eliminar {name}?</DialogTitle>
          <DialogDescription className="font-body-sm text-smoke">
            Se quitará del catálogo y se borrará su foto. No se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <form action={action}>
            <input type="hidden" name="id" value={id} />
            <Button type="submit" variant="destructive" size="lg">
              Sí, eliminar
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
