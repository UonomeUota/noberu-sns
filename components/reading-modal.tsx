"use client"

import { X, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PostCard } from "@/components/post-card"
import type { StoryPost } from "@/lib/post-types"

interface ReadingModalProps {
  threadId: string
  posts: StoryPost[]
  onClose: () => void
}

export function ReadingModal({ threadId, posts, onClose }: ReadingModalProps) {
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set())

  const mainPost = posts.find((p) => p.id === threadId)
  if (!mainPost) return null

  const isExpanded = expandedReplies.has(mainPost.id)
  const visibleReplies = isExpanded ? mainPost.thread : mainPost.thread.slice(0, 1)

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
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/55 p-3 backdrop-blur-sm sm:p-4" role="dialog" aria-modal="true" aria-labelledby="reading-title">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-card z-10 p-4 border-b flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Reading mode</p>
            <h2 id="reading-title" className="text-xl font-semibold">物語を通して読む</h2>
          </div>
          <Button type="button" variant="ghost" size="icon" onClick={onClose} aria-label="読書モードを閉じる">
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
                {mainPost.thread.length > 1 && <Button type="button" variant="outline" size="sm" onClick={() => toggleReplies(mainPost.id)} aria-expanded={isExpanded}>
                  {isExpanded ? (
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
                </Button>}
              </div>

              <div className="space-y-4">
                {visibleReplies.map((reply, index) => (
                  <div key={reply.id} className="relative">
                    {/* Connection line */}
                    {index < visibleReplies.length - 1 && (
                      <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-accent/30" />
                    )}

                    <div className="bg-gradient-to-r from-accent/5 to-transparent rounded-2xl p-4">
                      <PostCard post={reply} onProfileClick={() => {}} onReadThread={() => {}} isReply={true} />
                    </div>
                  </div>
                ))}
              </div>

              {!isExpanded && mainPost.thread.length > 1 && (
                <p className="text-center text-sm text-muted-foreground">ほか {mainPost.thread.length - 1} 件の続きを表示できます。</p>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
