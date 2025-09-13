"use client"

import * as React from "react"

interface CollapsibleProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

interface CollapsibleTriggerProps {
  asChild?: boolean
  children: React.ReactNode
  onClick?: () => void
}

interface CollapsibleContentProps {
  children: React.ReactNode
}

const Collapsible = React.forwardRef<
  HTMLDivElement,
  CollapsibleProps
>(({ open, onOpenChange, children }, ref) => {
  const [isOpen, setIsOpen] = React.useState(open ?? false)

  React.useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open)
    }
  }, [open])

  const handleToggle = () => {
    const newOpen = !isOpen
    setIsOpen(newOpen)
    onOpenChange?.(newOpen)
  }

  return (
    <div ref={ref} data-state={isOpen ? "open" : "closed"}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === CollapsibleTrigger) {
          return React.cloneElement(child as React.ReactElement, {
            onClick: handleToggle
          })
        }
        if (React.isValidElement(child) && child.type === CollapsibleContent) {
          return isOpen ? child : null
        }
        return child
      })}
    </div>
  )
})

const CollapsibleTrigger = React.forwardRef<
  HTMLButtonElement,
  CollapsibleTriggerProps
>(({ asChild, children, onClick, ...props }, ref) => {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      ref,
      onClick: (e: React.MouseEvent) => {
        onClick?.()
        children.props.onClick?.(e)
      }
    })
  }

  return (
    <button ref={ref} onClick={onClick} {...props}>
      {children}
    </button>
  )
})

const CollapsibleContent = React.forwardRef<
  HTMLDivElement,
  CollapsibleContentProps
>(({ children }, ref) => {
  return (
    <div ref={ref} className="overflow-hidden">
      {children}
    </div>
  )
})

Collapsible.displayName = "Collapsible"
CollapsibleTrigger.displayName = "CollapsibleTrigger"
CollapsibleContent.displayName = "CollapsibleContent"

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
