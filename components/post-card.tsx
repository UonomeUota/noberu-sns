"use client"

import { Heart, MessageCircle, Share, MoreHorizontal, Eye, PenTool } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface User {
  id: string
  name: string
  username: string
  avatar: string
}

interface Post {
  id: string
  user: User
  content: string
  timestamp: string
  likes: number
  replies: number
  shares: number
  isLiked: boolean
  thread: Post[]
}

interface PostCardProps {
  post: Post
  onProfileClick: () => void
  onReadThread: () => void
  isReply?: boolean
}

export function PostCard({ post, onProfileClick, onReadThread, isReply = false }: PostCardProps) {
  const [showContinueForm, setShowContinueForm] = useState(false)
  const [continueText, setContinueText] = useState("")

  const handleContinueSubmit = () => {
    if (continueText.trim()) {
      // Here you would typically send the continuation to your backend
      console.log("Continue story:", continueText)
      setShowContinueForm(false)
      setContinueText("")
    }
  }

  return (
    <Card
      className={cn(
        "p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border-border/50",
        isReply && "ml-8 border-l-4 border-l-accent",
      )}
    >
      <div className="flex space-x-3">
        {/* Avatar */}
        <Avatar className="h-12 w-12 cursor-pointer" onClick={onProfileClick}>
          <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
          <AvatarFallback className="bg-accent text-accent-foreground">{post.user.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          {/* User Info */}
          <div className="mb-2">
            <div className="flex items-center space-x-2">
              <button
                onClick={onProfileClick}
                className="font-semibold text-foreground hover:text-primary transition-colors"
              >
                {post.user.name}
              </button>
              {/* Inline meta (desktop+) */}
              <span className="hidden lg:inline text-muted-foreground text-sm">{post.user.username}</span>
              <span className="hidden lg:inline text-muted-foreground text-sm">·</span>
              <span className="hidden lg:inline text-muted-foreground text-sm">{post.timestamp}</span>
              <Button variant="ghost" size="icon" className="h-6 w-6 ml-auto">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            {/* Stacked @ID (mobile/tablet) */}
            <div className="lg:hidden mt-0.5">
              <span className="text-muted-foreground text-sm block">{post.user.username}</span>
            </div>
          </div>

          {/* Content */}
          <div className="text-foreground leading-relaxed mb-4 text-pretty">{post.content}</div>

          {/* Thread indicator */}
          {post.thread && post.thread.length > 0 && (
            <div className="mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={onReadThread}
                className="text-accent hover:text-accent-foreground hover:bg-accent/10 border-accent/30 bg-transparent"
              >
                <Eye className="h-4 w-4 mr-2" />
                続きを読む ({post.thread.length}件の返信)
              </Button>
            </div>
          )}

          {showContinueForm && (
            <div className="mb-4 p-4 bg-muted/30 rounded-xl border border-border/50">
              <div className="flex items-center mb-3">
                <PenTool className="h-4 w-4 mr-2 text-accent" />
                <span className="text-sm font-medium text-foreground">この物語を紡ぐ...</span>
              </div>
              <Textarea
                value={continueText}
                onChange={(e) => setContinueText(e.target.value)}
                placeholder="物語の続きを書いてください..."
                className="min-h-[100px] mb-3 resize-none border-border/50 focus:border-accent"
                maxLength={280}
              />
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{continueText.length}/280</span>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowContinueForm(false)
                      setContinueText("")
                    }}
                  >
                    キャンセル
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleContinueSubmit}
                    disabled={!continueText.trim()}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    投稿
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between max-w-md">
            <Button variant="ghost" size="sm" className="text-foreground/70 hover:text-accent hover:bg-accent/10 -ml-2">
              <MessageCircle className="h-4 w-4 mr-2" />
              <span className="font-medium">{post.replies}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "text-foreground/70 hover:bg-accent/10",
                post.isLiked ? "text-accent" : "hover:text-accent",
              )}
            >
              <Heart className={cn("h-4 w-4 mr-2", post.isLiked && "fill-current")} />
              <span className="font-medium">{post.likes}</span>
            </Button>

            <Button variant="ghost" size="sm" className="text-foreground/70 hover:text-accent hover:bg-accent/10">
              <Share className="h-4 w-4 mr-2" />
              <span className="font-medium">{post.shares}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowContinueForm(!showContinueForm)}
              className="text-foreground/70 hover:text-accent hover:bg-accent/10"
            >
              <PenTool className="h-4 w-4 mr-2" />
              <span className="font-medium">紡ぐ</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
