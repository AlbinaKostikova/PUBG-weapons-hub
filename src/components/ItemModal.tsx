'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'

type StatEntry = { label: string; value: string | number; positive?: boolean }
type AnyItem = Record<string, any>

export type ModalCategory = 'scope' | 'grip' | 'magazine' | 'muzzle' | 'stock'

const CATEGORY_CONFIG: Record<ModalCategory, { label: string; getStats: (item: AnyItem) => StatEntry[] }> = {
  scope: {
    label: 'Прицел',
    getStats: item => [
      { label: 'Зум', value: `${item.zoom}x` },
      { label: 'Бонус точности', value: `+${item.accuracyBonus}%`, positive: true },
      { label: 'Контроль отдачи', value: `+${item.recoilControl}%`, positive: true },
      { label: 'Вес', value: `${item.weight} kg` },
    ],
  },
  grip: {
    label: 'Рукоятка',
    getStats: item => [
      { label: 'Снижение верт. отдачи', value: `+${item.recoilVertical}%`, positive: true },
      { label: 'Снижение гор. отдачи', value: `+${item.recoilHorizontal}%`, positive: true },
      { label: 'Стабильность', value: `+${item.stability}%`, positive: true },
      {
        label: 'Скорость прицела',
        value: item.adsSpeed >= 0 ? `+${item.adsSpeed}%` : `${item.adsSpeed}%`,
        positive: item.adsSpeed >= 0,
      },
    ],
  },
  magazine: {
    label: 'Магазин',
    getStats: item => [
      { label: 'Бонус ёмкости', value: `+${item.capacityBonus} патр.`, positive: true },
      {
        label: 'Скорость перезарядки',
        value: item.reloadSpeedBonus >= 0 ? `+${item.reloadSpeedBonus}%` : `${item.reloadSpeedBonus}%`,
        positive: item.reloadSpeedBonus >= 0,
      },
      { label: 'Вес', value: `${item.weight} kg` },
    ],
  },
  muzzle: {
    label: 'Дульная насадка',
    getStats: item => [
      { label: 'Снижение верт. отдачи', value: `+${item.recoilVertical}%`, positive: true },
      { label: 'Снижение гор. отдачи', value: `+${item.recoilHorizontal}%`, positive: true },
      { label: 'Снижение звука', value: `${item.soundReduction}%`, positive: item.soundReduction > 0 },
      { label: 'Вес', value: `${item.weight} kg` },
    ],
  },
  stock: {
    label: 'Приклад',
    getStats: item => [
      { label: 'Снижение верт. отдачи', value: `+${item.recoilVertical}%`, positive: true },
      { label: 'Снижение гор. отдачи', value: `+${item.recoilHorizontal}%`, positive: true },
      {
        label: 'Скорость прицела',
        value: item.adsSpeed >= 0 ? `+${item.adsSpeed}%` : `${item.adsSpeed}%`,
        positive: item.adsSpeed >= 0,
      },
      { label: 'Вес', value: `${item.weight} kg` },
    ],
  },
}

interface Props {
  item: AnyItem
  category: ModalCategory
  onClose: () => void
}

export default function ItemModal({ item, category, onClose }: Props) {
  const config = CATEGORY_CONFIG[category]
  const stats = config.getStats(item)
  const prices: { name: string; priceUSD: number }[] = item.prices ?? []
  const attachableTo: string[] = item.attachableTo ?? []

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/70"
      onClick={onClose}>
      <div
        className="relative w-full max-w-2xl rounded-2xl border border-[#2a2a2a] bg-[#141414] shadow-[0_0_60px_rgba(245,158,11,0.18)] overflow-y-auto max-h-[90vh] animate-[fadeInScale_0.2s_ease]"
        onClick={e => e.stopPropagation()}>
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-yellow-400/60 to-transparent" />
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[#333] bg-[#1a1a1a] text-gray-400 hover:border-yellow-400 hover:text-yellow-400 transition">
          ✕
        </button>

        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col items-center">
            <div className="relative w-full rounded-2xl border border-[#2a2a2a] bg-[#1a1a1a] p-8 flex items-center justify-center min-h-52 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(245,158,11,0.12),transparent_70%)]" />
              <img
                src={item.image}
                alt={item.name}
                className="relative w-full max-h-44 object-contain drop-shadow-[0_0_24px_rgba(245,158,11,0.35)]"
              />
            </div>
            <Link
              href="/build"
              onClick={onClose}
              className="mt-4 flex items-center justify-center gap-2 w-full rounded-xl border border-yellow-400/60 bg-yellow-400/10 py-4 text-xs font-bold uppercase tracking-widest text-yellow-400 transition hover:bg-yellow-400/20 hover:border-yellow-400 hover:shadow-[0_0_18px_rgba(245,158,11,0.25)]">
              Собрать →
            </Link>
          </div>

          <div className="space-y-6">
            <div>
              <span className="inline-block mb-2 rounded-full border border-yellow-400/40 px-3 py-0.5 text-xs uppercase tracking-widest text-yellow-400">
                {config.label}
              </span>
              <h2 className="pubg-title text-xl md:text-2xl text-white">{item.name}</h2>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">Характеристики</p>
              <div className="grid grid-cols-2 gap-2">
                {stats.map(stat => (
                  <div key={stat.label} className="rounded-xl border border-[#2a2a2a] bg-[#1e1e1e] px-3 py-2.5">
                    <p className="text-[11px] text-gray-500 mb-0.5">{stat.label}</p>
                    <p
                      className={`text-sm font-bold ${
                        stat.positive === true
                          ? 'text-green-400'
                          : stat.positive === false
                            ? 'text-red-400'
                            : 'text-white'
                      }`}>
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {attachableTo.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">Совместимо с</p>
                <div className="flex flex-wrap gap-2">
                  {attachableTo.map(wType => (
                    <span
                      key={wType}
                      className="rounded-full border border-yellow-400/30 bg-yellow-400/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-yellow-300">
                      {wType}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {prices.length > 0 && (
          <div className="px-6 md:px-8 pb-8">
            <div className="h-px w-full bg-[#2a2a2a] mb-6" />
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">Реальные цены</p>
            <div className="space-y-2">
              {prices.map(price => (
                <div
                  key={price.name}
                  className="flex items-center justify-between rounded-xl border border-[#2a2a2a] bg-[#1e1e1e] px-4 py-3">
                  <span className="text-sm text-gray-300">{price.name}</span>
                  <span className="text-sm font-bold text-yellow-400 ml-4 shrink-0">${price.priceUSD.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
