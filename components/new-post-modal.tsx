"use client"

import { useEffect, useState } from "react"
import { PenLine, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type NewPostModalProps = {
  onClose: () => void
  onSubmit: (content: string) => void
}

export function NewPostModal({ onClose, onSubmit }: NewPostModalProps) {
  const [content, setContent] = useState("")
  const maxLength = 280

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  const submitPost = () => {
    const trimmedContent = content.trim()
    if (!trimmedContent) return
    onSubmit(trimmedContent)
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="new-post-title">
      <Card className="w-full max-w-2xl rounded-3xl shadow-2xl">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">New story</p>
            <h2 id="new-post-title" className="text-xl font-semibold">物語の書き出しを投稿</h2>
          </div>
          <Button type="button" variant="ghost" size="icon" onClick={onClose} aria-label="投稿画面を閉じる">
            <X aria-hidden="true" />
          </Button>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex gap-3">
            <Avatar className="size-11 shrink-0">
              <AvatarImage src="/diverse-user-avatars.png" alt="あなた" />
              <AvatarFallback className="bg-accent text-accent-foreground">あ</AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1 space-y-4">
              <Textarea
                autoFocus
                aria-label="物語の書き出し"
                placeholder="読んだ人が続きを書きたくなる、物語の始まりをどうぞ。"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                className="min-h-36 resize-none border-border/70 text-base leading-7"
                maxLength={maxLength}
              />

              <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <PenLine className="size-4 text-primary" aria-hidden="true" />
                  280文字まで
                </div>
                <div className="flex items-center justify-between gap-3 sm:justify-end">
                  <span className={`text-sm tabular-nums ${content.length > maxLength * 0.9 ? "text-destructive" : "text-muted-foreground"}`} aria-live="polite">
                    {content.length}/{maxLength}
                  </span>
                  <Button type="button" className="bg-primary hover:bg-primary/90" disabled={!content.trim()} onClick={submitPost}>
                    投稿する
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
