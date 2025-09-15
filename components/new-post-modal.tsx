"use client"

import { X, ImageIcon, Smile, Hash } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface NewPostModalProps {
  onClose: () => void
}

export function NewPostModal({ onClose }: NewPostModalProps) {
  const [content, setContent] = useState("")
  const maxLength = 280

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl rounded-2xl">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold">新しい物語を書く</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/diverse-user-avatars.png" />
              <AvatarFallback className="bg-accent text-accent-foreground">あ</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-4">
              <Textarea
                placeholder="今日はどんな物語を紡ぎますか？"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-32 resize-none border-none focus:ring-0 text-lg placeholder:text-muted-foreground/70"
                maxLength={maxLength}
              />

              {/* Character count */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Hash className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center space-x-4">
                  <span
                    className={`text-sm ${
                      content.length > maxLength * 0.9 ? "text-destructive" : "text-muted-foreground"
                    }`}
                  >
                    {content.length}/{maxLength}
                  </span>

                  <Button
                    className="bg-primary hover:bg-primary/90"
                    disabled={content.length === 0 || content.length > maxLength}
                  >
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
