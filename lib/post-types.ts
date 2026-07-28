export type StoryUser = {
  id: string
  name: string
  username: string
  avatar: string
}

export type StoryPost = {
  id: string
  user: StoryUser
  content: string
  timestamp: string
  likes: number
  replies: number
  shares: number
  isLiked: boolean
  thread: StoryPost[]
}
