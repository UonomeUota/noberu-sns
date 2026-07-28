"use client"

import { Check, Heart, MessageCircle, Share, MoreHorizontal, Eye, PenTool } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useEffect, useMemo, useState } from "react"
import type { StoryPost } from "@/lib/post-types"

type ContinuationCandidate = {
  id: string
  text: string
  votes: number
}

interface PostCardProps {
  post: StoryPost
  onProfileClick: () => void
  onReadThread: () => void
  isReply?: boolean
}

export function PostCard({ post, onProfileClick, onReadThread, isReply = false }: PostCardProps) {
  const [showContinueForm, setShowContinueForm] = useState(false)
  const [continueText, setContinueText] = useState("")
  const [candidates, setCandidates] = useState<ContinuationCandidate[]>([])
  const [votedCandidateId, setVotedCandidateId] = useState<string | null>(null)
  const [isLiked, setIsLiked] = useState(post.isLiked)
  const [likeCount, setLikeCount] = useState(post.likes)
  const [shareCount, setShareCount] = useState(post.shares)
  const [isShared, setIsShared] = useState(false)

  const voteStorageKey = useMemo(() => `vote-${post.id}`, [post.id])

  useEffect(() => {
    try {
      const saved = localStorage.getItem(voteStorageKey)
      if (saved) {
        const parsed = JSON.parse(saved) as { candidateId: string }
        setVotedCandidateId(parsed.candidateId)
      }
    } catch {}
  }, [voteStorageKey])

  const handleContinueSubmit = () => {
    const text = continueText.trim()
    if (!text) return
    const newCandidate: ContinuationCandidate = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      text,
      votes: 0,
    }
    setCandidates((prev) => [...prev, newCandidate])
    setShowContinueForm(false)
    setContinueText("")
  }

  const handleVote = (candidateId: string) => {
    if (votedCandidateId) return
    setCandidates((prev) => prev.map((c) => (c.id === candidateId ? { ...c, votes: c.votes + 1 } : c)))
    setVotedCandidateId(candidateId)
    try {
      localStorage.setItem(voteStorageKey, JSON.stringify({ candidateId }))
    } catch {}
  }

  const leadingCandidate = useMemo(() => {
    if (candidates.length === 0) return null
    return [...candidates].sort((a, b) => b.votes - a.votes)[0]
  }, [candidates])

  const toggleLike = () => {
    setIsLiked((liked) => {
      setLikeCount((count) => count + (liked ? -1 : 1))
      return !liked
    })
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: "Noberuの物語", text: post.content, url: window.location.href })
      } else {
        await navigator.clipboard.writeText(`${post.content}\n${window.location.href}`)
      }
      if (!isShared) setShareCount((count) => count + 1)
      setIsShared(true)
    } catch {
      // The share sheet may be dismissed by the user; no state change is needed.
    }
  }

  return (
    <Card
      className={cn(
        "rounded-3xl border-border/60 p-4 shadow-sm transition-all duration-200 hover:shadow-md sm:p-6",
        isReply && "ml-3 border-l-4 border-l-accent sm:ml-8",
      )}
    >
      <div className="flex space-x-3">
        {/* Avatar */}
        <button type="button" onClick={onProfileClick} className="h-fit shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label={`${post.user.name}のプロフィールを見る`}>
          <Avatar className="size-11 sm:size-12">
            <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
            <AvatarFallback className="bg-accent text-accent-foreground">{post.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </button>

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
              <Button type="button" variant="ghost" size="icon" className="ml-auto size-7" disabled title="その他の操作は準備中です" aria-label="その他の操作は準備中">
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

          {/* Continuation candidates voting */}
          {candidates.length > 0 && (
            <div className="mb-4 p-4 bg-muted/30 rounded-xl border border-border/50 space-y-3">
              <div className="text-sm text-muted-foreground">
                みんなが提案した続きです。最も票を集めた候補が次の展開になります。
              </div>
              {leadingCandidate && (
                <div className="text-xs text-accent -mt-2">
                  現在の有力候補: {leadingCandidate.text.slice(0, 48)}
                  {leadingCandidate.text.length > 48 ? "…" : ""}
                </div>
              )}
              <div className="space-y-2">
                {candidates.map((c) => (
                  <div key={c.id} className="flex items-start gap-3">
                    <div className="flex-1 text-sm text-foreground/90">{c.text}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground tabular-nums">{c.votes}</span>
                      <Button
                        size="sm"
                        variant={votedCandidateId === c.id ? "secondary" : "outline"}
                        disabled={!!votedCandidateId}
                        onClick={() => handleVote(c.id)}
                        className={cn("h-7 px-3", votedCandidateId ? "opacity-70" : "")}
                      >
                        {votedCandidateId === c.id ? "投票済み" : "投票"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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
                    候補として追加
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="grid max-w-md grid-cols-4 gap-1">
            <Button type="button" variant="ghost" size="sm" onClick={onReadThread} disabled={post.replies === 0} aria-label={`${post.replies}件の返信を読む`} className="px-2 text-foreground/70 hover:bg-accent/10 hover:text-accent">
              <MessageCircle className="h-4 w-4 sm:mr-2" />
              <span className="font-medium">{post.replies}</span>
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={toggleLike}
              aria-label={isLiked ? "いいねを取り消す" : "いいねする"}
              aria-pressed={isLiked}
              className={cn(
                "px-2 text-foreground/70 hover:bg-accent/10",
                isLiked ? "text-accent" : "hover:text-accent",
              )}
            >
              <Heart className={cn("h-4 w-4 sm:mr-2", isLiked && "fill-current")} />
              <span className="font-medium">{likeCount}</span>
            </Button>

            <Button type="button" variant="ghost" size="sm" onClick={handleShare} aria-label={isShared ? "共有しました" : "物語を共有"} className="px-2 text-foreground/70 hover:bg-accent/10 hover:text-accent">
              {isShared ? <Check className="h-4 w-4 sm:mr-2" /> : <Share className="h-4 w-4 sm:mr-2" />}
              <span className="font-medium">{shareCount}</span>
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowContinueForm(!showContinueForm)}
              aria-expanded={showContinueForm}
              className="px-2 text-foreground/70 hover:bg-accent/10 hover:text-accent"
            >
              <PenTool className="h-4 w-4 sm:mr-2" />
              <span className="hidden font-medium sm:inline">紡ぐ</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
