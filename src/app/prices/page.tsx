'use client'
import React, { useState } from 'react'
import weaponsData from '@/data/weapons.json'
import attachmentsData from '@/data/attachments.json'
import gripsData from '@/data/grips.json'
import muzzlesData from '@/data/muzzles.json'
import magazinesData from '@/data/magazines.json'
import stocksData from '@/data/stocks.json'
import ItemModal, { ModalCategory } from '@/components/ItemModal'

type PriceAttachmentItem = {
  name: string
  image: string
  [key: string]: any
}

export default function Prices() {
  const [modalItem, setModalItem] = useState<{ item: PriceAttachmentItem; category: ModalCategory } | null>(null)

  const renderPrice = (value?: number) =>
    value !== undefined ? <p className="pubg-price mt-2">Цена: ${value}</p> : null

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 mt-8 z-40 border-b border-[#2a2a2a] bg-[#111111]/95 backdrop-blur-sm shadow-[0_2px_20px_rgba(0,0,0,0.6)]">
        <div className="pubg-container">
          <ul className="flex items-center justify-center gap-1 overflow-x-auto py-1 scrollbar-none">
            {[
              { href: '#weapons', label: 'Оружие' },
              { href: '#scopes', label: 'Прицелы' },
              { href: '#grips', label: 'Рукоятки' },
              { href: '#muzzles', label: 'Дульные насадки' },
              { href: '#magazines', label: 'Магазины' },
              { href: '#stocks', label: 'Приклады' },
            ].map((item, idx, arr) => (
              <li key={item.href} className="flex items-center shrink-0">
                <a
                  href={item.href}
                  className="group relative flex items-center px-4 py-4 text-sm font-bold uppercase tracking-[0.15em] text-[#888] transition-colors duration-200 hover:text-yellow-400">
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-yellow-400 transition-all duration-300 group-hover:w-full" />
                  {item.label}
                </a>
                {idx < arr.length - 1 && <span className="h-3 w-px shrink-0 bg-[#333]" />}
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <section className="pubg-section" id="weapons">
        <div className="pubg-container">
          <h2 className="pubg-title mb-8 text-2xl md:text-3xl">Оружие и цены</h2>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {weaponsData.weapons.map(weapon => (
              <div key={weapon.name} className="pubg-card flex flex-col items-center p-4">
                <img src={weapon.image} alt={weapon.name} className="mb-4 h-28 w-full object-contain" />
                <h3 className="pubg-title text-center text-base">{weapon.name}</h3>
                <p className="text-sm text-[#cfcfcf]">Урон: {weapon.damage}</p>
                <p className="text-sm text-[#a3a3a3]">Тип: {weapon.type}</p>
                {renderPrice(weapon.prices[0]?.priceUSD)}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pubg-section bg-[#171717]" id="scopes">
        <div className="pubg-container">
          <h2 className="pubg-title mb-8 text-2xl md:text-3xl">Прицелы</h2>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {attachmentsData.scopes.map(scope => (
              <button
                key={scope.id}
                onClick={() => setModalItem({ item: scope, category: 'scope' })}
                className="pubg-card flex flex-col items-center p-4">
                <img src={scope.image} alt={scope.name} className="mb-4 h-28 w-full object-contain" />
                <h3 className="pubg-title text-center text-base">{scope.name}</h3>
                <p className="text-sm text-[#cfcfcf]">Zoom: {scope.zoom}x</p>
                <p className="text-sm text-[#a3a3a3]">Accuracy: +{scope.accuracyBonus}</p>
                {renderPrice(scope.prices[0]?.priceUSD)}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pubg-section" id="grips">
        <div className="pubg-container">
          <h2 className="pubg-title mb-8 text-2xl md:text-3xl">Рукоятки</h2>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {gripsData.grips.map(grip => (
              <button
                key={grip.id}
                onClick={() => setModalItem({ item: grip, category: 'grip' })}
                className="pubg-card flex flex-col items-center p-4">
                <img src={grip.image} alt={grip.name} className="mb-4 h-28 w-full object-contain" />
                <h3 className="pubg-title text-center text-base">{grip.name}</h3>
                <p className="text-sm text-[#cfcfcf]">Вертикальная отдача: -{grip.recoilVertical}</p>
                <p className="text-sm text-[#a3a3a3]">Горизонтальная отдача: -{grip.recoilHorizontal}</p>
                {renderPrice(grip.prices[0]?.priceUSD)}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pubg-section bg-[#171717]" id="muzzles">
        <div className="pubg-container">
          <h2 className="pubg-title mb-8 text-2xl md:text-3xl">Дульные насадки</h2>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {muzzlesData.muzzles.map(muzzle => (
              <button
                key={muzzle.id}
                onClick={() => setModalItem({ item: muzzle, category: 'muzzle' })}
                className="pubg-card flex flex-col items-center p-4">
                <img src={muzzle.image} alt={muzzle.name} className="mb-4 h-28 w-full object-contain" />
                <h3 className="pubg-title text-center text-base">{muzzle.name}</h3>
                <p className="text-sm text-[#cfcfcf]">Вертикальная отдача: -{muzzle.recoilVertical}</p>
                <p className="text-sm text-[#a3a3a3]">Горизонтальная отдача: -{muzzle.recoilHorizontal}</p>
                {muzzle.soundReduction > 0 && (
                  <p className="text-sm text-[#a3a3a3]">Снижение звука: {muzzle.soundReduction}</p>
                )}
                {renderPrice(muzzle.prices[0]?.priceUSD)}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pubg-section" id="magazines">
        <div className="pubg-container">
          <h2 className="pubg-title mb-8 text-2xl md:text-3xl">Магазины</h2>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {magazinesData.magazines.map(mag => (
              <button
                key={mag.id}
                onClick={() => setModalItem({ item: mag, category: 'magazine' })}
                className="pubg-card flex flex-col items-center p-4">
                <img src={mag.image} alt={mag.name} className="mb-4 h-28 w-full object-contain" />
                <h3 className="pubg-title text-center text-base">{mag.name}</h3>
                <p className="text-sm text-[#cfcfcf]">Вместимость: +{mag.capacityBonus}</p>
                <p className="text-sm text-[#a3a3a3]">Скорость перезарядки: +{mag.reloadSpeedBonus}</p>
                {renderPrice(mag.prices[0]?.priceUSD)}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pubg-section bg-[#171717]" id="stocks">
        <div className="pubg-container">
          <h2 className="pubg-title mb-8 text-2xl md:text-3xl">Приклады</h2>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {stocksData.stocks.map(stock => (
              <button
                key={stock.id}
                onClick={() => setModalItem({ item: stock, category: 'stock' })}
                className="pubg-card flex flex-col items-center p-4">
                <img src={stock.image} alt={stock.name} className="mb-4 h-28 w-full object-contain" />
                <h3 className="pubg-title text-center text-base">{stock.name}</h3>
                <p className="text-sm text-[#cfcfcf]">Вертикальная отдача: -{stock.recoilVertical}</p>
                <p className="text-sm text-[#a3a3a3]">Горизонтальная отдача: -{stock.recoilHorizontal}</p>
                <p className="text-sm text-[#a3a3a3]">ADS Speed: {stock.adsSpeed}</p>
                {renderPrice(stock.prices[0]?.priceUSD)}
              </button>
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
