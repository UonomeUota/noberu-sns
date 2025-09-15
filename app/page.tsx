"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { PostCard } from "@/components/post-card"
import { FloatingButton } from "@/components/floating-button"
import { ProfileModal } from "@/components/profile-modal"
import { ReadingModal } from "@/components/reading-modal"
import { NewPostModal } from "@/components/new-post-modal"

// Mock data for posts
const mockPosts = [
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
      },
    ],
  },
]

export default function HomePage() {
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null)
  const [selectedThread, setSelectedThread] = useState<string | null>(null)
  const [showNewPost, setShowNewPost] = useState(false)
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="lg:ml-64 flex justify-center px-4 py-6">
        <div className="w-full max-w-2xl space-y-6">
          {mockPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onProfileClick={() => setSelectedProfile(post.user.id)}
              onReadThread={() => setSelectedThread(post.id)}
            />
          ))}
        </div>
      </main>

      <FloatingButton onClick={() => setShowNewPost(true)} />

      {selectedProfile && <ProfileModal userId={selectedProfile} onClose={() => setSelectedProfile(null)} />}

      {selectedThread && (
        <ReadingModal threadId={selectedThread} posts={mockPosts} onClose={() => setSelectedThread(null)} />
      )}

      {showNewPost && <NewPostModal onClose={() => setShowNewPost(false)} />}
    </div>
  )
}
