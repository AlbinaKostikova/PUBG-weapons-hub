'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import attachmentsData from '../data/attachments.json'
import gripsData from '../data/grips.json'
import magazinesData from '../data/magazines.json'
import muzzlesData from '../data/muzzles.json'
import stocksData from '../data/stocks.json'
import weaponsData from '../data/weapons.json'
import WeaponCard from '@/components/WeaponCard'
import ItemModal, { ModalCategory } from '@/components/ItemModal'

type AttachmentPreview = {
  id?: number
  name: string
  image: string
  [key: string]: any
}

// Добавить корзину в страницу с ценами и увеличить картинки

export default function Home() {
  const weaponRows = 3
  const weaponsPerRow = 4
  const sortedWeapons = [...weaponsData.weapons]
    .sort((a, b) => b.damage - a.damage)
    .slice(0, weaponRows * weaponsPerRow)

  const [modalItem, setModalItem] = useState<{ item: AttachmentPreview; category: ModalCategory } | null>(null)

  const attachmentSections: { title: string; category: ModalCategory; items: AttachmentPreview[] }[] = [
    {
      title: 'Приклады',
      category: 'stock',
      items: stocksData.stocks,
    },
    {
      title: 'Рукоятки',
      category: 'grip',
      items: gripsData.grips,
    },
    {
      title: 'Магазины',
      category: 'magazine',
      items: magazinesData.magazines,
    },
    {
      title: 'Дульные насадки',
      category: 'muzzle',
      items: muzzlesData.muzzles,
    },
    {
      title: 'Прицелы',
      category: 'scope',
      items: attachmentsData.scopes,
    },
  ]

  return (
    <div className="w-full">
      <section className="pubg-section pb-6">
        <div className="w-full bg-[#121212]/80 py-8 shadow-[0_0_20px_rgba(245,158,11,0.08)]">
          <blockquote className="text-center px-6 md:px-10">
            <div className="mx-auto max-w-4xl">
              <p className="text-lg md:text-2xl font-light leading-relaxed text-gray-300">
                «В PUBG выживает не самый быстрый, а тот, кто действует хладнокровно и метко до последнего круга.»
              </p>

              <footer className="mt-4 text-xs uppercase tracking-[0.2em] text-yellow-400/70">
                PlayerUnknown&apos;s Battlegrounds
              </footer>
            </div>
          </blockquote>
        </div>
      </section>

      <section className="pubg-section">
        <div className="pubg-container">
          <h2 className="pubg-title mb-3 text-center text-2xl md:text-3xl">Выбери подготовку</h2>

          <p className="pubg-subtitle mb-10 text-center">Подготовься к королевской битве</p>

          <div className="grid grid-cols-1 my-10 gap-10 sm:grid-cols-2 max-w-5xl mx-auto">
            {[
              { title: 'Собрать набор', link: '/build', img: '/img/sborka.jpg' },
              { title: 'Битва оружий', link: '/battle', img: '/img/compare.jpg' },
              { title: 'Карта оружий', link: '/possibility', img: '/img/map.jpg' },
              { title: 'Реальные цены', link: '/prices', img: '/img/prices.jpg' },
            ].map((btn, idx) => (
              <div key={idx} className="group relative">
                <a
                  href={btn.link}
                  className="relative z-10 block w-full overflow-hidden rounded-2xl border border-yellow-400/25 bg-[#1a1a1a]/80 transition duration-300 hover:-translate-y-1 hover:border-yellow-400/70 hover:shadow-[0_0_30px_rgba(245,158,11,0.35)]">
                  <img
                    className="h-36 w-full object-cover object-center transition duration-500 group-hover:scale-105"
                    alt={btn.title}
                    src={btn.img}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/35 to-transparent"></div>
                  <div className="absolute inset-x-4 bottom-4">
                    <p className="text-start text-lg font-bold uppercase tracking-wider text-yellow-400 drop-shadow-md md:text-xl">
                      {btn.title}
                    </p>
                  </div>
                </a>
                <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-linear-to-r from-yellow-500/20 via-orange-500/25 to-yellow-500/20 opacity-70 blur-md transition duration-300 group-hover:opacity-100"></div>
                <div className="pointer-events-none absolute inset-0 z-20 rounded-2xl ring-1 ring-inset ring-yellow-400/20 group-hover:ring-yellow-400/40"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pubg-section bg-[#171717]">
        <div className="pubg-container pb-15 space-y-12">
          <div>
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="pubg-title text-2xl md:text-3xl">Оружие</h2>
              <Link
                href="/build"
                className="inline-flex items-center gap-2 rounded-full border border-yellow-400/50 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-yellow-400 transition hover:border-yellow-300 hover:text-yellow-300">
                Все
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-7 md:grid-cols-4">
              {sortedWeapons.map(weapon => (
                <WeaponCard key={weapon.name} weapon={weapon} />
              ))}
            </div>
          </div>

          <div>
            {attachmentSections.map(section => (
              <div key={section.title} className="mb-12 last:mb-0">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <h3 className="pubg-title text-xl md:text-2xl">{section.title}</h3>
                  <Link
                    href="/build"
                    className="inline-flex items-center gap-2 rounded-full border border-yellow-400/50 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-yellow-400 transition hover:border-yellow-300 hover:text-yellow-300">
                    Все
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-7 md:grid-cols-4">
                  {section.items.slice(0, 8).map(item => (
                    <button
                      key={item.name}
                      onClick={() => setModalItem({ item, category: section.category })}
                      className="group relative w-full max-w-60 mx-auto text-left">
                      <div className="absolute -inset-0.5 rounded-2xl bg-linear-to-r from-yellow-500/0 via-yellow-500/40 to-yellow-500/0 blur opacity-0 transition duration-500 group-hover:opacity-100"></div>
                      <div className="relative flex h-full min-h-50 flex-col items-center rounded-2xl border border-[#2a2a2a] bg-[#1a1a1a] px-3 pt-4 pb-5 transition duration-300 group-hover:scale-105 group-hover:border-yellow-400">
                        <div className="relative h-44 w-full overflow-hidden rounded-xl bg-[radial-gradient(circle,rgba(255,230,150,0.18)_0%,rgba(255,255,255,0.08)_40%,rgba(0,0,0,0)_70%)]">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-contain translate-y-7 transition duration-300"
                          />
                        </div>
                        <h4 className="mt-3 text-center text-sm font-semibold tracking-wide text-white transition group-hover:text-yellow-400">
                          {item.name}
                        </h4>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {modalItem && (
        <ItemModal item={modalItem.item} category={modalItem.category} onClose={() => setModalItem(null)} />
      )}
    </div>
  )
}
