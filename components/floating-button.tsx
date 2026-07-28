"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FloatingButtonProps {
  onClick: () => void
}

export function FloatingButton({ onClick }: FloatingButtonProps) {
  return (
    <Button
      type="button"
      onClick={onClick}
      size="icon"
      aria-label="新しい物語を書く"
      className="fixed bottom-20 right-4 z-40 h-14 w-14 rounded-full bg-primary shadow-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-xl sm:right-6 lg:bottom-6"
    >
      <Plus className="h-6 w-6" />
    </Button>
  )
}
