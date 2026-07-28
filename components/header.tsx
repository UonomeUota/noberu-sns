"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Bell, BookOpen, ChevronDown, MessageCircle, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type HeaderProps = {
  searchQuery: string
  onSearchChange: (query: string) => void
  onMessagesClick: () => void
  onProfileClick: () => void
}

export function Header({ searchQuery, onSearchChange, onMessagesClick, onProfileClick }: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-primary-foreground/15 bg-primary text-primary-foreground shadow-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-2 px-3 sm:gap-4 sm:px-4">
        <a href="#top" aria-label="Noberu ホーム" className="shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
          <Image src="/noberu-logo-new.svg" alt="Noberu" width={184} height={56} className="h-9 w-auto sm:h-11" priority />
        </a>
        <Image src="/noberu-character.svg" alt="みんなで紡ぐ物語" width={120} height={56} className="hidden h-11 w-auto md:block" />

        <div className="relative ml-auto min-w-0 flex-1 sm:max-w-md">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-primary-foreground/70" aria-hidden="true" />
          <Input
            type="search"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            aria-label="物語や作者を検索"
            placeholder="物語や作者を検索"
            className="h-9 border-white/20 bg-white/10 pl-9 text-primary-foreground placeholder:text-primary-foreground/65 focus:bg-white/20"
          />
        </div>

        <div className="hidden items-center gap-1 sm:flex">
          <Button type="button" variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10" disabled title="通知機能は準備中です" aria-label="通知機能は準備中">
            <Bell aria-hidden="true" />
          </Button>
          <Button type="button" variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10" onClick={onMessagesClick} aria-label="メッセージ">
            <MessageCircle aria-hidden="true" />
          </Button>
        </div>

        <div className="relative" ref={dropdownRef}>
          <Button
            type="button"
            variant="ghost"
            className="gap-1 p-1.5 text-primary-foreground hover:bg-white/10"
            onClick={() => setIsDropdownOpen((open) => !open)}
            aria-label="アカウントメニュー"
            aria-expanded={isDropdownOpen}
          >
            <span className="flex size-8 items-center justify-center rounded-full border border-white/35 bg-white/20 text-sm font-semibold">あ</span>
            <ChevronDown className="hidden size-4 sm:block" aria-hidden="true" />
          </Button>
          {isDropdownOpen && (
            <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl border bg-card p-1.5 text-card-foreground shadow-xl">
              <button
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-muted"
                onClick={() => {
                  onProfileClick()
                  setIsDropdownOpen(false)
                }}
              >
                <User className="size-4" aria-hidden="true" />
                プロフィールを見る
              </button>
              <div className="my-1 border-t" />
              <p className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground">
                <BookOpen className="size-4" aria-hidden="true" />
                現在はデモモードです
              </p>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
