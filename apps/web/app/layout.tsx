import { Inter, Bebas_Neue } from "next/font/google"
import "@workspace/ui/globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { Metadata } from "next"
import { Providers } from "../components/providers"

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
})

const fontDisplay = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400"],
})

export const metadata: Metadata = {
  title: "Reply",
  description: "A smart customer support platform designed to resolve faster.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontDisplay.variable} font-sans antialiased`}
      >
        <ClerkProvider>
          <Providers>
            {children}
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  )
}
