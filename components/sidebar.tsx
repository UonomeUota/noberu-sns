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
    <>
    <aside className="fixed left-[var(--sidebar-left-gap)] top-24 z-40 hidden h-[calc(100vh-6rem)] w-64 border-r border-border bg-card p-4 lg:block">
      <nav className="space-y-2" aria-label="サイドナビゲーション">
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
    <nav aria-label="モバイルナビゲーション" className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-4 border-t bg-card/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] backdrop-blur lg:hidden">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = activeTab === item.id
        return (
          <button
            key={item.id}
            type="button"
            aria-current={isActive ? "page" : undefined}
            onClick={() => onTabChange?.(item.id)}
            className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-medium transition-colors ${isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"}`}
          >
            <Icon className="size-5" aria-hidden="true" />
            {item.label}
          </button>
        )
      })}
    </nav>
    </>
  )
}
