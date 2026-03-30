'use client'

import { useMemo, useState } from 'react'
import attachmentsData from '@/data/attachments.json'
import gripsData from '@/data/grips.json'
import magazinesData from '@/data/magazines.json'
import muzzlesData from '@/data/muzzles.json'
import stocksData from '@/data/stocks.json'
import weaponsData from '@/data/weapons.json'
import { calculateSetupStats, type WeaponSetup } from '@/utils/calculateScore'
import type { Attachment, Grip, Magazine, Muzzle, Stock, Weapon } from '@/types/items'

type SmallCardItem = {
  name: string
  image: string
  attachableTo: string[]
}

type ItemSection = {
  title: string
  items: SmallCardItem[]
}

const leftSections: ItemSection[] = [
  {
    title: 'Прицелы',
    items: attachmentsData.scopes.map(item => ({
      name: item.name,
      image: item.image,
      attachableTo: item.attachableTo ?? [],
    })),
  },
  {
    title: 'Дульные насадки',
    items: muzzlesData.muzzles.map(item => ({
      name: item.name,
      image: item.image,
      attachableTo: item.attachableTo ?? [],
    })),
  },
]

const rightSections: ItemSection[] = [
  {
    title: 'Магазины',
    items: magazinesData.magazines.map(item => ({
      name: item.name,
      image: item.image,
      attachableTo: item.attachableTo ?? [],
    })),
  },
  {
    title: 'Рукоятки',
    items: gripsData.grips.map(item => ({
      name: item.name,
      image: item.image,
      attachableTo: item.attachableTo ?? [],
    })),
  },
]

const stockSections: ItemSection[] = [
  {
    title: 'Приклады',
    items: stocksData.stocks.map(item => ({
      name: item.name,
      image: item.image,
      attachableTo: item.attachableTo ?? [],
    })),
  },
]

export default function BuildPage() {
  const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null)
  const [selectedAttachment, setSelectedAttachment] = useState<Attachment | undefined>(undefined)
  const [selectedMuzzle, setSelectedMuzzle] = useState<Muzzle | undefined>(undefined)
  const [selectedMagazine, setSelectedMagazine] = useState<Magazine | undefined>(undefined)
  const [selectedGrip, setSelectedGrip] = useState<Grip | undefined>(undefined)
  const [selectedStock, setSelectedStock] = useState<Stock | undefined>(undefined)

  const setupStats = useMemo(() => {
    if (!selectedWeapon) {
      return null
    }

    const setup: WeaponSetup = {
      weapon: selectedWeapon,
      attachment: selectedAttachment,
      muzzle: selectedMuzzle,
      magazine: selectedMagazine,
      grip: selectedGrip,
      stock: selectedStock,
    }

    return calculateSetupStats(setup)
  }, [selectedAttachment, selectedGrip, selectedMagazine, selectedMuzzle, selectedStock, selectedWeapon])

  const sortedWeapons = useMemo(
    () =>
      [...weaponsData.weapons].sort((a, b) => {
        if (b.damage !== a.damage) {
          return b.damage - a.damage
        }

        return a.name.localeCompare(b.name)
      }),
    [],
  )

  const selectWeapon = (weapon: Weapon) => {
    setSelectedWeapon(weapon)
    setSelectedAttachment(undefined)
    setSelectedMuzzle(undefined)
    setSelectedMagazine(undefined)
    setSelectedGrip(undefined)
    setSelectedStock(undefined)
  }

  const isItemAttachable = (item: SmallCardItem) => {
    if (!selectedWeapon) {
      return false
    }

    if (!item.attachableTo.length) {
      return true
    }

    return item.attachableTo.includes(selectedWeapon.type)
  }

  return (
    <section className="pubg-section">
      <div className="pubg-container__build ">
        <h2 className="pubg-title -mt-4 mb-10 text-center text-2xl md:text-3xl">Собрать свой набор</h2>

        <div className="pubg-card mb-6 p-4">
          <h3 className="pubg-title mb-3 text-lg">Все оружие</h3>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8">
            {sortedWeapons.map(weapon => (
              <button
                key={weapon.name}
                type="button"
                onClick={() => selectWeapon(weapon as Weapon)}
                className={`rounded-md border px-2 py-2 text-left text-xs transition ${
                  selectedWeapon?.name === weapon.name ? 'border-[#f0b90b] bg-[#2a2412]' : 'border-[#444] bg-[#1f1f1f]'
                }`}>
                <p className="font-semibold text-[#f5f5f5]">{weapon.name}</p>
                <p className="text-[#cfcfcf]">Урон: {weapon.damage}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <aside className="pubg-card p-4">
            {leftSections.map(section => (
              <div key={section.title} className="mb-6 last:mb-0">
                <h3 className="pubg-title mb-3 text-lg">{section.title}</h3>
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-sm text-[#cfcfcf]">
                  {section.items.map(item => {
                    const isScopeSection = section.title === 'Прицелы'
                    const isSelected = isScopeSection
                      ? selectedAttachment?.name === item.name
                      : selectedMuzzle?.name === item.name
                    const isAttachable = isItemAttachable(item)

                    return (
                      <li
                        key={item.name}
                        className={`rounded-md border px-2 py-2 ${
                          isSelected
                            ? 'border-[#f0b90b] bg-[#2a2412]'
                            : isAttachable
                              ? 'border-[#444] bg-[#1f1f1f]'
                              : 'border-[#333] bg-[#191919] opacity-50'
                        }`}>
                        <button
                          type="button"
                          onClick={() => {
                            if (!isAttachable) {
                              return
                            }

                            if (isScopeSection) {
                              const scope = attachmentsData.scopes.find(scopeItem => scopeItem.name === item.name)
                              setSelectedAttachment(
                                selectedAttachment?.name === item.name ? undefined : (scope as Attachment | undefined),
                              )
                            } else {
                              const muzzle = muzzlesData.muzzles.find(muzzleItem => muzzleItem.name === item.name)
                              setSelectedMuzzle(
                                selectedMuzzle?.name === item.name ? undefined : (muzzle as Muzzle | undefined),
                              )
                            }
                          }}
                          disabled={!isAttachable}
                          title={isAttachable ? item.name : 'Не подходит для выбранного оружия'}
                          className={`flex w-full items-center gap-2 text-left ${isAttachable ? '' : 'cursor-not-allowed'}`}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-8 w-8 rounded object-contain scale-120 translate-y-1"
                          />
                          <span className="text-xs leading-tight">{item.name}</span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </aside>

          <main className="pubg-card flex min-h-110 flex-col p-4">
            <h3 className="pubg-title mb-3 text-lg">Конструктор</h3>

            <div className="relative flex min-h-84 items-center justify-center overflow-hidden rounded-md border border-[#444] bg-[#151515] p-4">
              {selectedWeapon ? (
                <>
                  {selectedStock && (
                    <img
                      src={selectedStock.image}
                      alt={selectedStock.name}
                      className="pointer-events-none absolute right-[5%] top-[65%] z-0 h-20 w-20 -translate-y-1/2 object-contain opacity-90 md:h-24 md:w-24"
                    />
                  )}
                  {selectedMuzzle && (
                    <img
                      src={selectedMuzzle.image}
                      alt={selectedMuzzle.name}
                      className="pointer-events-none absolute left-[8%] top-[40%] z-20 h-16 w-16 -translate-y-1/2 object-contain md:h-20 md:w-20"
                    />
                  )}
                  <img
                    src={selectedWeapon.image}
                    alt={selectedWeapon.name}
                    className="relative z-10 max-h-44 w-full max-w-xs object-contain md:max-h-52 md:max-w-sm"
                  />
                  {selectedAttachment && (
                    <img
                      src={selectedAttachment.image}
                      alt={selectedAttachment.name}
                      className="pointer-events-none absolute left-1/2 top-[30%] z-30 h-16 w-16 -translate-x-[8%] -translate-y-1/2 object-contain md:h-20 md:w-20"
                    />
                  )}
                  {selectedGrip && (
                    <img
                      src={selectedGrip.image}
                      alt={selectedGrip.name}
                      className="pointer-events-none absolute left-[30%] bottom-[15%] z-20 h-16 w-16 -translate-x-[4%] -translate-y-1/2 object-contain md:h-20 md:w-20"
                    />
                  )}
                  {selectedMagazine && (
                    <img
                      src={selectedMagazine.image}
                      alt={selectedMagazine.name}
                      className="pointer-events-none absolute left-[47%] top-[70%] z-20 h-16 w-16 -translate-x-1/2 -translate-y-1/2 object-contain md:h-20 md:w-20"
                    />
                  )}
                  <div className="absolute left-2 top-2 rounded bg-[#0f0f0f]/80 px-2 py-1 text-xs text-[#cfcfcf]">
                    {selectedWeapon.name}
                  </div>
                </>
              ) : (
                <p className="text-center text-sm text-[#b3b3b3]">Выбери оружие сверху, чтобы оно появилось здесь.</p>
              )}
            </div>

            <div className="mt-4 rounded-lg border-2 border-yellow-400/10 bg-[#1a1a1a] p-4 shadow-[0_0_20px_rgba(245,158,11,0.25)]">
              <h4 className="pubg-title mb-3 text-base font-bold text-yellow-400">Итог сборки</h4>

              {setupStats ? (
                <div className="grid grid-cols-2 gap-2 text-sm text-[#d9d9d9] sm:grid-cols-3">
                  <div className="rounded bg-[#121212] px-2 py-1">Урон: {setupStats.damage}</div>
                  <div className="rounded bg-[#121212] px-2 py-1">Отдача V: {setupStats.recoilVertical}</div>
                  <div className="rounded bg-[#121212] px-2 py-1">Отдача H: {setupStats.recoilHorizontal}</div>
                  <div className="rounded bg-[#121212] px-2 py-1">Точность: +{setupStats.accuracy}</div>
                  <div className="rounded bg-[#121212] px-2 py-1">Стабильность: +{setupStats.stability}</div>
                  <div className="rounded bg-[#121212] px-2 py-1">
                    ADS: {setupStats.adsSpeed >= 0 ? '+' : ''}
                    {setupStats.adsSpeed}
                  </div>
                  <div className="rounded bg-[#121212] px-2 py-1">Магазин: +{setupStats.capacityBonus}</div>
                  <div className="rounded bg-[#121212] px-2 py-1">
                    Перезарядка: {setupStats.reloadSpeedBonus >= 0 ? '+' : ''}
                    {setupStats.reloadSpeedBonus}
                  </div>
                  <div className="rounded bg-[#121212] px-2 py-1">Тихость: +{setupStats.soundReduction}</div>
                  <div className="rounded bg-[#121212] px-2 py-1">Вес: {setupStats.weight}</div>
                  <div className="rounded col-span-2 h-15 text-base flex items-center justify-center text-center border border-[#5a4712] bg-[#221b0d] px-2 py-1 text-[#ffd24a]">
                    Общий рейтинг: {setupStats.score}
                  </div>
                </div>
              ) : (
                <p className="text-xs text-[#b3b3b3]">Параметры появятся после выбора оружия.</p>
              )}
            </div>

            <div className="mt-4 rounded-md border border-[#444] bg-[#1a1a1a] p-3">
              {stockSections.map(section => (
                <div key={section.title}>
                  <h4 className="pubg-title mb-3 text-sm">{section.title}</h4>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 text-sm text-[#cfcfcf]">
                    {section.items.map(item => {
                      const isSelected = selectedStock?.name === item.name
                      const isAttachable = isItemAttachable(item)

                      return (
                        <li
                          key={item.name}
                          className={`rounded-md border px-2 py-2 ${
                            isSelected
                              ? 'border-[#f0b90b] bg-[#2a2412]'
                              : isAttachable
                                ? 'border-[#444] bg-[#1f1f1f]'
                                : 'border-[#333] bg-[#191919] opacity-50'
                          }`}>
                          <button
                            type="button"
                            onClick={() => {
                              if (!isAttachable) {
                                return
                              }
                              const stock = stocksData.stocks.find(stockItem => stockItem.name === item.name)
                              setSelectedStock(
                                selectedStock?.name === item.name ? undefined : (stock as Stock | undefined),
                              )
                            }}
                            disabled={!isAttachable}
                            title={isAttachable ? item.name : 'Не подходит для выбранного оружия'}
                            className={`flex w-full items-center gap-2 text-left ${isAttachable ? '' : 'cursor-not-allowed'}`}>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-8 w-8 rounded object-contain scale-120 translate-y-1"
                            />
                            <span className="text-xs leading-tight">{item.name}</span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </main>

          <aside className="pubg-card p-4">
            {rightSections.map(section => (
              <div key={section.title} className="mb-6 last:mb-0">
                <h3 className="pubg-title mb-3 text-lg">{section.title}</h3>
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-sm text-[#cfcfcf]">
                  {section.items.map(item => {
                    let isSelected = false

                    if (section.title === 'Магазины') {
                      isSelected = selectedMagazine?.name === item.name
                    } else if (section.title === 'Рукоятки') {
                      isSelected = selectedGrip?.name === item.name
                    }

                    const isAttachable = isItemAttachable(item)

                    return (
                      <li
                        key={item.name}
                        className={`rounded-md border px-2 py-2 ${
                          isSelected
                            ? 'border-[#f0b90b] bg-[#2a2412]'
                            : isAttachable
                              ? 'border-[#444] bg-[#1f1f1f]'
                              : 'border-[#333] bg-[#191919] opacity-50'
                        }`}>
                        <button
                          type="button"
                          onClick={() => {
                            if (!isAttachable) {
                              return
                            }

                            if (section.title === 'Магазины') {
                              const magazine = magazinesData.magazines.find(
                                magazineItem => magazineItem.name === item.name,
                              )
                              setSelectedMagazine(
                                selectedMagazine?.name === item.name ? undefined : (magazine as Magazine | undefined),
                              )
                            } else if (section.title === 'Рукоятки') {
                              const grip = gripsData.grips.find(gripItem => gripItem.name === item.name)
                              setSelectedGrip(selectedGrip?.name === item.name ? undefined : (grip as Grip | undefined))
                            }
                          }}
                          disabled={!isAttachable}
                          title={isAttachable ? item.name : 'Не подходит для выбранного оружия'}
                          className={`flex w-full items-center gap-2 text-left ${isAttachable ? '' : 'cursor-not-allowed'}`}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-8 w-8 rounded object-contain scale-120 translate-y-1"
                          />
                          <span className="text-xs leading-tight">{item.name}</span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </section>
  )
}
