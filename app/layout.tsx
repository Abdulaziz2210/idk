import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import '../styles/globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ƭᴏᴘ ꜱᴘᴇᴇᴅ 亗 CDI Mock test",
  description: "Ƭᴏᴘ ꜱᴘᴇᴇᴅ 亗 CDI Mock test",
  icons: {
    icon: "/dreamzone.png",
    apple: "/dreamzone.png",
  },
  generator: "TopSpeed",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
