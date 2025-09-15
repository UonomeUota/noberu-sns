"use client"

import { X, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PostCard } from "@/components/post-card"

interface Post {
  id: string
  user: {
    id: string
    name: string
    username: string
    avatar: string
  }
  content: string
  timestamp: string
  likes: number
  replies: number
  shares: number
  isLiked: boolean
  thread: Post[]
}

interface ReadingModalProps {
  threadId: string
  posts: Post[]
  onClose: () => void
}

export function ReadingModal({ threadId, posts, onClose }: ReadingModalProps) {
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set())

  const mainPost = posts.find((p) => p.id === threadId)
  if (!mainPost) return null

  const toggleReplies = (postId: string) => {
    const newExpanded = new Set(expandedReplies)
    if (newExpanded.has(postId)) {
      newExpanded.delete(postId)
    } else {
      newExpanded.add(postId)
    }
    setExpandedReplies(newExpanded)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-card z-10 p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold">読書モード</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Main post */}
          <div className="bg-muted/20 rounded-2xl p-6">
            <PostCard post={mainPost} onProfileClick={() => {}} onReadThread={() => {}} />
          </div>

          {/* Thread */}
          {mainPost.thread.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">続きの物語</h3>
                <Button variant="outline" size="sm" onClick={() => toggleReplies(mainPost.id)}>
                  {expandedReplies.has(mainPost.id) ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-2" />
                      折りたたむ
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-2" />
                      すべて展開
                    </>
                  )}
                </Button>
              </div>

              <div className="space-y-4">
                {mainPost.thread.map((reply, index) => (
                  <div key={reply.id} className="relative">
                    {/* Connection line */}
                    {index < mainPost.thread.length - 1 && (
                      <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-accent/30" />
                    )}

                    <div className="bg-gradient-to-r from-accent/5 to-transparent rounded-2xl p-4">
                      <PostCard post={reply} onProfileClick={() => {}} onReadThread={() => {}} isReply={true} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue story button */}
              <div className="text-center pt-4">
                <Button variant="outline" className="border-accent text-accent hover:bg-accent/10 bg-transparent">
                  この物語に続きを書く
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
