import { Link } from "lucide-react";

export default function Header() {
  return (
    <header className="relative flex flex-col items-center justify-center min-h-125 text-center 
                       bg-[#111111] bg-[url('/img/main-bg.jpg')] bg-cover bg-top">
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black/80 to-transparent pointer-events-none"></div>
      <a href='/' className="z-20 text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg mb-6 absolute top-5">
        PUBG Weapon Hub
      </a>
      <div className="absolute top-25 z-10 flex w-full items-start justify-between px-6 md:px-14 lg:px-24">
        <div className="flex gap-4">
          {[{ title: 'Собрать набор', link: '/build' },
            { title: 'Битва оружий', link: '/battle' }
          ].map((btn, idx) => (
            <a
              key={idx}
              href={btn.link}
              className="px-6 py-3 md:px-8 md:py-4 bg-[#232323cc] hover:bg-[#f0bb0bae] text-white hover:text-black font-semibold rounded-lg uppercase tracking-wide transition-transform transform hover:scale-105"
            >
              {btn.title}
            </a>
          ))}
        </div>

        <div className="flex gap-4">
          {[{ title: 'Оружие на карте', link: '/possibility' },
            { title: 'Реальные цены', link: '/prices' }
          ].map((btn, idx) => (
            <a
              key={idx}
              href={btn.link}
              className="px-6 py-3 md:px-8 md:py-4 bg-[#232323cc] hover:bg-[#f0bb0bae] text-white hover:text-black font-semibold rounded-lg uppercase tracking-wide transition-transform transform hover:scale-105"
            >
              {btn.title}
            </a>
          ))}
        </div>
      </div>
      <p className="absolute text-lg md:text-2xl text-orange-400 font-bold uppercase tracking-wider bottom-15 z-10">
        Сравнивай оружие, аксессуары и реальные цены
      </p>
    </header>
  )
}