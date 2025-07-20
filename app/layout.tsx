import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Jesús Gil - Desarrollador Web Fullstack | Portfolio",
  description:
    "Portfolio profesional de Jesús Gil, Desarrollador Web Fullstack especializado en React, Next.js, Node.js y tecnologías modernas. 10+ certificaciones de Coderhouse.",
  keywords: "desarrollador web, fullstack, react, nextjs, nodejs, javascript, typescript, portfolio, jesús gil",
  authors: [{ name: "Jesús Gil" }],
  creator: "Jesús Gil",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://jesusgilportfolio.com",
    title: "Jesús Gil - Desarrollador Web Fullstack",
    description: "Portfolio profesional de Jesús Gil, creando experiencias digitales extraordinarias",
    siteName: "Jesús Gil Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jesús Gil - Desarrollador Web Fullstack",
    description: "Portfolio profesional de Jesús Gil, creando experiencias digitales extraordinarias",
    creator: "@jesusgildev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://jesusgilportfolio.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
