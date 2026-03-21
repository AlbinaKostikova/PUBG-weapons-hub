import './globals.css'
import { ReactNode } from 'react'
import Header from '@/components/Header' 
import Footer from '@/components/Footer' 

export const metadata = {
  title: "PUBG Weapon Hub",
  description: "Информация о оружии, аксессуарах и их реальных ценах",
}
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white font-sans">
        <Header />
        <main className="min-h-screen bg-gray-900 text-white font-sans">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}