"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FloatingButtonProps {
  onClick: () => void
}

export function FloatingButton({ onClick }: FloatingButtonProps) {
  return (
    <Button
      onClick={onClick}
      size="icon"
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 animate-float z-50"
    >
      <Plus className="h-6 w-6" />
    </Button>
  )
}
