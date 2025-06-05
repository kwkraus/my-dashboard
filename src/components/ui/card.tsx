import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border border-neutral-200 bg-white text-neutral-900 shadow-sm",
        className
      )}
      {...props}
    />
  )
)
Card.displayName = "Card"

export { Card }
