import { title } from 'process'

// src/app/components/Header.tsx
export default function Header() {
  return (
    <header className="p-10 h-130 text-center bg-[#111111] bg-[url('/img/main-bg.jpg')] bg-cover bg-top">
      <h1 className="text-5xl font-bold m-10">PUBG Weapon Hub</h1>
      <p className="text-gray-400">Сравнивай оружие, аксессуары и реальные цены</p>
      <div className="flex justify-evenly">{[
        { title: 'Собрать свой набор' },
        { title: 'Битва оружий' },
        { title: 'Вероятность найти оружие' },
        { title: 'Реальные цены' },
      ].map((btn, idx) => (
        <button
          key={idx}
          className="w-50 h-14 text-lg rounded-b-sm bg-[#23232379] hover:bg-[#f0bb0bae] hover:text-black transition-transform transform hover:scale-105">
          {btn.title}
        </button>
      ))}
      </div>
    </header>
  )
}
