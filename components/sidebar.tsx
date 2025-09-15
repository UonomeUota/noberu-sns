"use client"

import { Home, MessageCircle, Trophy, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  activeTab?: string
  onTabChange?: (tab: string) => void
}

export function Sidebar({ activeTab = "home", onTabChange }: SidebarProps) {
  const navItems = [
    { id: "home", label: "ホーム", icon: Home },
    { id: "messages", label: "メッセージ", icon: MessageCircle },
    { id: "ranking", label: "ランキング", icon: Trophy },
    { id: "profile", label: "プロフィール", icon: User },
  ]

  return (
    <aside className="fixed left-0 top-28 h-[calc(100vh-7rem)] w-64 bg-card border-r border-border p-4 hidden lg:block z-40">
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start gap-3 h-12 text-base ${
                isActive ? "bg-primary text-primary-foreground" : "hover:bg-accent hover:text-accent-foreground"
              }`}
              onClick={() => onTabChange?.(item.id)}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Button>
          )
        })}
      </nav>
    </aside>
  )
}
