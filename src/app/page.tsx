'use client';
import React from "react";
import weaponsData from "../data/weapons.json"; 
import WeaponCard from "@/components/WeaponCard";

export default function Home() {
  const sortedWeapons = [...weaponsData.weapons].sort(
    (a, b) => b.damage - a.damage
  ).slice(0, 20);

  return (
    <div className="w-full">
      <section className="pubg-section">
        <div className="pubg-container">
          <h2 className="pubg-title mb-3 text-center text-2xl md:text-3xl">
            Выбери подготовку
          </h2>

          <p className="pubg-subtitle mb-10 text-center">
            Подготовься к королевской битве
          </p>

          <div className="grid grid-cols-1 my-10 gap-10 sm:grid-cols-2 max-w-5xl mx-auto">
            {[
              { title: "Собрать набор", link: "/build", img: '/img/sborka.jpg' },
              { title: "Битва оружий", link: "/battle", img: '/img/compare.jpg'},
              { title: "Карта оружий", link: "/possibility", img: '/img/map.jpg' },
              { title: "Реальные цены", link: "/prices", img: '/img/prices.jpg' },
            ].map((btn, idx) => (
              <div key={idx} className="group relative">
                <a
                  href={btn.link}
                  className="relative z-10 block w-full overflow-hidden rounded-2xl border border-yellow-400/25 bg-[#1a1a1a]/80 transition duration-300 hover:-translate-y-1 hover:border-yellow-400/70 hover:shadow-[0_0_30px_rgba(245,158,11,0.35)]"
                >
                  <img
                    className="h-36 w-full object-cover transition duration-500 group-hover:scale-110"
                    alt={btn.title}
                    src={btn.img}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/35 to-transparent"></div>
                  <div className="absolute inset-x-4 bottom-4">
                    <p className="text-center text-xl font-bold uppercase tracking-wider text-yellow-400 drop-shadow-md md:text-base">
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
        <div className="pubg-container">
          <h2 className="pubg-title mb-10 text-center text-2xl md:text-3xl">
            Оружие
          </h2>

          <div className="grid grid-cols-2 gap-7 md:grid-cols-4">
            {sortedWeapons.map((weapon) => (
              <WeaponCard key={weapon.name} weapon={weapon} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}