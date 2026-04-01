'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const heroNavGroups = [
  [
    { title: 'Собрать набор', link: '/build' },
    { title: 'Битва оружий', link: '/battle' },
  ],
  [
    { title: 'Оружие на карте', link: '/possibility' },
    { title: 'Реальные цены', link: '/prices' },
  ],
]

const stickyNavLinks = [{ title: 'Главная', link: '/' }, ...heroNavGroups.flat()]

type NavLink = {
  title: string
  link: string
}

function HeaderButton({ item }: { item: NavLink }) {
  return (
    <Link
      href={item.link}
      className="rounded-lg bg-[#232323cc] px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-transform duration-200 hover:scale-105 hover:bg-[#f0bb0bae] hover:text-black md:px-7 md:py-4">
      {item.title}
    </Link>
  )
}

export default function Header() {
  const headerRef = useRef<HTMLElement | null>(null)
  const [isStickyVisible, setIsStickyVisible] = useState(false)

  useEffect(() => {
    const updateStickyState = () => {
      const headerHeight = headerRef.current?.offsetHeight ?? 0
      const showAfter = Math.max(180, headerHeight - 120)
      setIsStickyVisible(window.scrollY > showAfter)
    }

    updateStickyState()
    window.addEventListener('scroll', updateStickyState, { passive: true })
    window.addEventListener('resize', updateStickyState)

    return () => {
      window.removeEventListener('scroll', updateStickyState)
      window.removeEventListener('resize', updateStickyState)
    }
  }, [])

  return (
    <>
      <div
        className={[
          'fixed inset-x-0 top-0 z-50 border-b border-[#2b2b2b] bg-[#0d0d0df2] shadow-[0_14px_35px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-300',
          isStickyVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-full opacity-0',
        ].join(' ')}>
        <div className="pubg-container flex flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between md:gap-6">
          <Link
            href="/"
            className="shrink-0 text-lg font-extrabold uppercase tracking-[0.2em] text-white transition-colors duration-200 hover:text-[#f0b90b]">
            PUBG Weapon Hub
          </Link>

          <nav className="overflow-x-auto">
            <ul className="flex min-w-max items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#d0d0d0] md:text-sm">
              {stickyNavLinks.map(item => (
                <li key={item.link}>
                  <Link
                    href={item.link}
                    className="block rounded-full border border-transparent px-3 py-2 transition-colors duration-200 hover:border-[#f0b90b55] hover:bg-[#f0b90b1a] hover:text-[#f0b90b]">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <header
        ref={headerRef}
        className="relative flex min-h-125 flex-col items-center justify-center overflow-hidden bg-[#111111] bg-[url('/img/main-bg.jpg')] bg-cover bg-top text-center">
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black/80 to-transparent pointer-events-none"></div>

        <Link
          href="/"
          className="absolute top-5 z-20 mb-6 text-4xl font-extrabold text-white drop-shadow-lg md:text-5xl lg:text-6xl">
          PUBG Weapon Hub
        </Link>

        <div className="absolute top-24 z-10 flex w-full flex-col gap-4 px-4 md:top-25 md:px-14 lg:flex-row lg:items-start lg:justify-between lg:px-24">
          {heroNavGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="flex flex-wrap justify-center gap-3 lg:justify-start">
              {group.map(item => (
                <HeaderButton key={item.link} item={item} />
              ))}
            </div>
          ))}
        </div>

        <p className="absolute bottom-15 z-10 max-w-3xl px-4 text-lg font-bold uppercase tracking-wider text-orange-400 md:text-2xl">
          Сравнивай оружие, аксессуары и реальные цены
        </p>
      </header>
    </>
  )
}
