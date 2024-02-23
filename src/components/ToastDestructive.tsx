"use client"

import { Button } from "@/components/ui/button"
import { ToastAction, ToastActionElement } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

type ToastDestructiveProps = {
  title: string
  description: string
  action?: ToastActionElement
}

export function ToastDestructive({ title, description, action }: ToastDestructiveProps) {
  const { toast } = useToast()

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          variant: "destructive",
          title: title,
          description: description,
          action: action ? action : undefined,
        })
      }}
    >
      Show Toast
    </Button>
  )
}
