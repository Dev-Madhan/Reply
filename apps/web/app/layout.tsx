import { Geist, Geist_Mono } from "next/font/google"
import "@workspace/ui/globals.css"
import {ClerkProvider} from "@clerk/nextjs";
import { Providers } from "@/components/providers";
import {Metadata} from "next";


const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Reply",
  description: "A smart customer support platform designed to resolve faster.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
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
