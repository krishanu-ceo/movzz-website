import type { Metadata } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import CursorSpotlight from '@/components/CursorSpotlight'
import ScrollProgress from '@/components/ScrollProgress'
import BootOverlay from '@/components/BootOverlay'
import AchievementToast from '@/components/AchievementToast'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Movzz — Never Miss a Ride Again',
  description:
    'India\'s first AI-powered ride reliability platform. One app. Every provider. 96% success rate. Launching in Chennai, March 2026.',
  keywords: ['ride hailing', 'Uber', 'Ola', 'Rapido', 'Chennai', 'AI', 'reliable rides'],
  openGraph: {
    title: 'Movzz — Never Miss a Ride Again',
    description:
      'Stop switching between Uber, Ola and Rapido. Movzz AI picks the most reliable provider and confirms your ride in 8 seconds.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="antialiased bg-navy-900 text-white overflow-x-hidden">
        <ScrollProgress />
        <BootOverlay />
        <AchievementToast />
        <CursorSpotlight />
        {children}
      </body>
    </html>
  )
}
