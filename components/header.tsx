"use client"

import { Search, Bell, MessageCircle, Settings, LogOut, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"

export function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Image
              src="/noberu-logo-new.svg"
              alt="Noberu Logo"
              width={0}
              height={56}
              className="rounded-lg w-auto h-10 md:h-14"
            />
            <Image
              src="/noberu-character.svg"
              alt="Noberu Character"
              width={120}
              height={56}
              className="hidden sm:block h-10 md:h-14"
            />
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xs md:max-w-md mx-2 md:mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="小説や作者を検索..."
                className="pl-10 bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/70 focus:bg-white/20"
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10">
              <MessageCircle className="h-5 w-5" />
            </Button>
            <div className="relative" ref={dropdownRef}>
              <Button
                variant="ghost"
                className="flex items-center space-x-1 text-primary-foreground hover:bg-white/10 p-2"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center border border-white/40">
                  <span className="text-sm font-medium text-primary">あ</span>
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                  <div className="py-1">
                    <button
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        console.log("設定がクリックされました")
                        setIsDropdownOpen(false)
                      }}
                    >
                      <Settings className="h-4 w-4" />
                      <span>設定</span>
                    </button>
                    <button
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        console.log("ログアウトがクリックされました")
                        setIsDropdownOpen(false)
                      }}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>ログアウト</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
