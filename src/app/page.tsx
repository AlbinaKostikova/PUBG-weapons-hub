'use client';
import React from "react";
import weaponsData from "../data/weapons.json"; 
import WeaponCard from "@/components/WeaponCard";

export default function Home() {
  const sortedWeapons = [...weaponsData.weapons].sort(
    (a, b) => b.damage - a.damage
  ).slice(0, 20);

  return (
    <div className="w-full m-6">

      <section className="pubg-section">
        <div className="pubg-container">
          <h2 className="pubg-title mb-3 text-center text-2xl md:text-3xl">
            Выбери подготовку
          </h2>

          <p className="pubg-subtitle mb-10 text-center">
            Подготовься к королевской битве
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-15 max-w-4xl mx-auto">
            {[
              { title: "Собрать набор", link: "/build", img: '/img/sborka.jpg' },
              { title: "Битва оружий", link: "/battle", img: '/img/compare.jpg'},
              { title: "Карта оружий", link: "/possibility", img: '/img/map.jpg' },
              { title: "Реальные цены", link: "/prices", img: '/img/prices.jpg' },
            ].map((btn, idx) => (
              <div key={idx} className="relative">
                <a
                  href={btn.link}
                  className="pubg-hero-action relative flex flex-col w-full h-30 items-center text-center text-xs md:h-40 md:text-sm z-10"
                >
                  <img className="h-30 mb-2" alt={btn.title} src={btn.img} />
                  {btn.title}
                </a>
                <div className="absolute -inset-1.5 rounded-lg bg-yellow-400 via-orange-500 to-transparent animate-ping-slow opacity-70 blur-md z-0"></div>
                <div className="absolute -inset-0.75 rounded-lg bg-yellow-500 via-orange-400 to-transparent animate-ping-slow opacity-50 blur-sm z-0"></div>
                <div className="absolute -inset-px rounded-lg  bg-yellow-300 via-orange-300 to-transparent animate-ping-slow opacity-30 blur-[2px] z-0"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pubg-section bg-[#171717]">
        <div className="pubg-container">
          <h2 className="pubg-title mb-10 text-center text-2xl md:text-3xl">
            Категории оружия
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