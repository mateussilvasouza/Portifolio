import type { Metadata, Viewport } from 'next'
import '@/index.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Mateus Silva Souza — Software Engineer',
  description:
    'Mateus Silva Souza — Desenvolvedor Full Stack. APIs, microsserviços, arquitetura, performance e produtos em produção.',
  icons: { icon: '/favicon.png' },
}

export const viewport: Viewport = {
  themeColor: '#0b0c0e',
}

const themeInitScript = `
  try {
    if (localStorage.getItem('theme') === 'light') {
      document.documentElement.classList.add('light')
    }
  } catch (e) {}
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
