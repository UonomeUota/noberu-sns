"use client"

import { X, MapPin, Calendar, LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ProfileModalProps {
  userId: string
  onClose: () => void
}

// Mock user data
const mockUser = {
  id: "1",
  name: "桜井美咲",
  username: "@misakis",
  avatar: "/anime-pink-hair-girl.png",
  banner: "/cherry-blossoms-and-books.jpg",
  bio: "物語を愛する人。雨の日の図書館と、コーヒーの香りが好き。みんなで紡ぐ物語の世界で、新しい出会いを楽しんでいます。",
  location: "東京, 日本",
  joinDate: "2023年3月",
  website: "https://misakis-stories.com",
  following: 234,
  followers: 1205,
  posts: 89,
}

export function ProfileModal({ userId, onClose }: ProfileModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl">
        {/* Header with close button */}
        <div className="sticky top-0 bg-card z-10 p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold">プロフィール</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Banner */}
        <div className="relative h-48 bg-gradient-to-r from-primary/20 to-accent/20">
          <img
            src={mockUser.banner || "/placeholder.svg"}
            alt="Profile banner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <Avatar className="h-20 w-20 border-4 border-card -mt-10 relative z-10">
              <AvatarImage src={mockUser.avatar || "/placeholder.svg"} alt={mockUser.name} />
              <AvatarFallback className="bg-accent text-accent-foreground text-2xl">
                {mockUser.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" className="mt-2 bg-transparent">
              フォロー
            </Button>
          </div>

          <div className="space-y-3">
            <div>
              <h3 className="text-xl font-bold text-balance">{mockUser.name}</h3>
              <p className="text-muted-foreground">{mockUser.username}</p>
            </div>

            <p className="text-foreground leading-relaxed text-pretty">{mockUser.bio}</p>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {mockUser.location}
              </div>
              <div className="flex items-center gap-1">
                <LinkIcon className="h-4 w-4" />
                <a href={mockUser.website} className="text-primary hover:underline">
                  {mockUser.website.replace("https://", "")}
                </a>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {mockUser.joinDate}に参加
              </div>
            </div>

            <div className="flex gap-6 text-sm">
              <div>
                <span className="font-semibold text-foreground">{mockUser.following}</span>
                <span className="text-muted-foreground ml-1">フォロー中</span>
              </div>
              <div>
                <span className="font-semibold text-foreground">{mockUser.followers}</span>
                <span className="text-muted-foreground ml-1">フォロワー</span>
              </div>
              <div>
                <span className="font-semibold text-foreground">{mockUser.posts}</span>
                <span className="text-muted-foreground ml-1">投稿</span>
              </div>
            </div>
          </div>
        </div>

        {/* Posts section */}
        <div className="border-t p-6">
          <h4 className="font-semibold mb-4">最近の投稿</h4>
          <div className="space-y-4">
            <div className="p-4 bg-muted/30 rounded-xl">
              <p className="text-sm text-muted-foreground mb-2">2時間前</p>
              <p className="text-foreground leading-relaxed">
                雨の日の図書館で、彼女は古い本の匂いに包まれながら、新しい物語の始まりを感じていた。
              </p>
            </div>
            <div className="p-4 bg-muted/30 rounded-xl">
              <p className="text-sm text-muted-foreground mb-2">1日前</p>
              <p className="text-foreground leading-relaxed">
                街角のカフェで出会った不思議な老人が語った話は、まるで魔法のようだった。
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
