import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://noberu-sns.vercel.app"),
  title: "Noberu | みんなで紡ぐ物語SNS",
  description: "物語の書き出しを投稿し、続きを提案し、投票で次の展開を選ぶ共同創作SNSです。",
  openGraph: {
    title: "Noberu | みんなで紡ぐ物語SNS",
    description: "一文から始まる、予想できない物語。みんなで続きを紡ぐ共同創作SNS。",
    type: "website",
    locale: "ja_JP",
    images: ["/noberu-logo-new.svg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
