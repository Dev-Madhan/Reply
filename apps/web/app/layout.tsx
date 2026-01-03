import { Geist, Geist_Mono } from "next/font/google"
import dynamic from "next/dynamic"

import "@workspace/ui/globals.css"

const Providers = dynamic(
  () => import("@/components/providers").then(m => m.Providers),
  { ssr: false }
)

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
