import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

type AlertDestructiveProps = {
  title: string
  description: string
  className?: string
}

export function AlertDestructive({ title, description, className }: AlertDestructiveProps) {
  return (
    <Alert variant="destructive" className={className}>
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle className="font-semibold">{title}</AlertTitle>
      <AlertDescription className="text-xs">
        {description}
      </AlertDescription>
    </Alert>
  )
}
