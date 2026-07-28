"use client"

import { useMemo, useState } from "react"
import { BookOpen, MessageCircle, Sparkles, Trophy } from "lucide-react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { PostCard } from "@/components/post-card"
import { FloatingButton } from "@/components/floating-button"
import { ProfileModal } from "@/components/profile-modal"
import { ReadingModal } from "@/components/reading-modal"
import { NewPostModal } from "@/components/new-post-modal"
import { Button } from "@/components/ui/button"
import type { StoryPost } from "@/lib/post-types"

// Mock data for posts
const mockPosts: StoryPost[] = [
  {
    id: "1",
    user: {
      id: "1",
      name: "桜井美咲",
      username: "@misakis",
      avatar: "/anime-pink-hair-girl.png",
    },
    content:
      "雨の日の図書館で、彼女は古い本の匂いに包まれながら、新しい物語の始まりを感じていた。窓の外では雨粒が踊り、心の中では言葉たちが踊っていた。",
    timestamp: "2時間前",
    likes: 24,
    replies: 8,
    shares: 3,
    isLiked: false,
    thread: [
      {
        id: "1-1",
        user: {
          id: "2",
          name: "田中太郎",
          username: "@taro_t",
          avatar: "/young-man-glasses.png",
        },
        content:
          "その時、図書館の奥から聞こえてきた足音が、彼女の集中を破った。振り返ると、見知らぬ青年が古い文学書を手に立っていた。",
        timestamp: "1時間前",
        likes: 12,
        replies: 2,
        shares: 1,
        isLiked: true,
        thread: [],
      },
    ],
  },
  {
    id: "2",
    user: {
      id: "3",
      name: "山田花子",
      username: "@hanako_y",
      avatar: "/placeholder-292ce.png",
    },
    content:
      "夜空に浮かぶ星たちが、今夜も私たちの秘密を知っている。この街の片隅で、小さな奇跡が起ころうとしていることを。",
    timestamp: "4時間前",
    likes: 56,
    replies: 15,
    shares: 8,
    isLiked: true,
    thread: [],
  },
  {
    id: "3",
    user: {
      id: "4",
      name: "佐藤健",
      username: "@ken_sato",
      avatar: "/dark-haired-man.png",
    },
    content:
      "カフェの角の席で、彼は毎日同じ時間に現れる。コーヒーの香りと共に、彼の物語も少しずつ明かされていく。今日もまた、新しい章が始まる。",
    timestamp: "6時間前",
    likes: 89,
    replies: 23,
    shares: 12,
    isLiked: false,
    thread: [
      {
        id: "3-1",
        user: {
          id: "5",
          name: "鈴木麗",
          username: "@rei_suzuki",
          avatar: "/placeholder-8xv2q.png",
        },
        content:
          "そのカフェの店員である私は、彼の注文を覚えている。ブラックコーヒー、砂糖なし。そして、いつも持参する古いノートに何かを書き続けている。",
        timestamp: "5時間前",
        likes: 34,
        replies: 7,
        shares: 2,
        isLiked: false,
        thread: [],
      },
      {
        id: "3-2",
        user: {
          id: "6",
          name: "高橋誠",
          username: "@makoto_h",
          avatar: "/middle-aged-bearded-man.png",
        },
        content:
          "ある日、風が強くて彼のノートのページがめくれた。そこに書かれていたのは、この街の人々の物語だった。私たち一人一人が、彼の小説の登場人物だったのだ。",
        timestamp: "4時間前",
        likes: 67,
        replies: 18,
        shares: 9,
        isLiked: true,
        thread: [],
      },
    ],
  },
]

export default function HomePage() {
  const [posts, setPosts] = useState<StoryPost[]>(mockPosts)
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null)
  const [selectedThread, setSelectedThread] = useState<string | null>(null)
  const [showNewPost, setShowNewPost] = useState(false)
  const [activeTab, setActiveTab] = useState("home")
  const [searchQuery, setSearchQuery] = useState("")

  const visiblePosts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLocaleLowerCase("ja")
    const filtered = normalizedQuery
      ? posts.filter((post) =>
          [post.content, post.user.name, post.user.username].some((value) =>
            value.toLocaleLowerCase("ja").includes(normalizedQuery),
          ),
        )
      : posts

    return activeTab === "ranking" ? [...filtered].sort((a, b) => b.likes - a.likes) : filtered
  }, [activeTab, posts, searchQuery])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    if (tab === "profile") setSelectedProfile("1")
  }

  const handleCreatePost = (content: string) => {
    const newPost: StoryPost = {
      id: `post-${Date.now()}`,
      user: {
        id: "current-user",
        name: "あなた",
        username: "@you",
        avatar: "/diverse-user-avatars.png",
      },
      content,
      timestamp: "たった今",
      likes: 0,
      replies: 0,
      shares: 0,
      isLiked: false,
      thread: [],
    }
    setPosts((current) => [newPost, ...current])
    setActiveTab("home")
    setShowNewPost(false)
  }

  return (
    <div id="top" className="min-h-screen bg-background">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onMessagesClick={() => setActiveTab("messages")}
        onProfileClick={() => setSelectedProfile("1")}
      />

      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />

      <main className="flex justify-center px-3 pb-28 pt-5 sm:px-6 lg:ml-[calc(var(--sidebar-left-gap)+16rem)] lg:pb-10">
        <div className="w-full max-w-2xl space-y-5">
          <section className="overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-primary/10 via-card to-accent/10 p-5 shadow-sm sm:p-7">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary">
              <Sparkles className="size-4" aria-hidden="true" />
              みんなで紡ぐ、ひとつの物語
            </div>
            <h1 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">一文から始まる、予想できない物語。</h1>
            <p className="mt-3 text-pretty text-sm leading-7 text-muted-foreground sm:text-base">
              書き出しを投稿し、誰かの続きを読み、次の展開を提案する。投票で選ばれた言葉が物語を前へ進めます。
            </p>
          </section>

          <div className="flex items-center justify-between gap-3 px-1">
            <div>
              <p className="text-sm font-semibold text-primary">{activeTab === "ranking" ? "Popular stories" : "Story feed"}</p>
              <h2 className="text-xl font-bold">{activeTab === "ranking" ? "人気の物語" : "新着の物語"}</h2>
            </div>
            {activeTab === "ranking" && <Trophy className="size-6 text-primary" aria-hidden="true" />}
          </div>

          {activeTab === "messages" ? (
            <section className="rounded-3xl border bg-card p-8 text-center shadow-sm">
              <MessageCircle className="mx-auto mb-4 size-9 text-primary" aria-hidden="true" />
              <h2 className="text-xl font-semibold">メッセージ機能は準備中です</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">現在は物語の投稿・閲覧・投票をお楽しみください。</p>
              <Button className="mt-5" onClick={() => setActiveTab("home")}>物語を読む</Button>
            </section>
          ) : visiblePosts.length > 0 ? (
            visiblePosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onProfileClick={() => setSelectedProfile(post.user.id)}
                onReadThread={() => setSelectedThread(post.id)}
              />
            ))
          ) : (
            <section className="rounded-3xl border bg-card p-8 text-center shadow-sm">
              <BookOpen className="mx-auto mb-4 size-9 text-primary" aria-hidden="true" />
              <h2 className="text-xl font-semibold">該当する物語がありません</h2>
              <p className="mt-2 text-sm text-muted-foreground">検索語を変えてもう一度お試しください。</p>
            </section>
          )}
        </div>
      </main>

      <FloatingButton onClick={() => setShowNewPost(true)} />

      {selectedProfile && <ProfileModal userId={selectedProfile} onClose={() => setSelectedProfile(null)} />}

      {selectedThread && (
        <ReadingModal threadId={selectedThread} posts={posts} onClose={() => setSelectedThread(null)} />
      )}

      {showNewPost && <NewPostModal onClose={() => setShowNewPost(false)} onSubmit={handleCreatePost} />}
    </div>
  )
}
