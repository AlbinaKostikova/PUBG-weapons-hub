'use client';
import React from "react";
import { weapons } from "../data/weapons.json";

export default function Home() {
  const sortedWeapons = [...weapons].sort(
    (a, b) => b.damage - a.damage
  );
  return (
    <div className="w-full m-6">
      {/* <section className="pubg-section">
        <div className="pubg-container">
          <h2 className="pubg-title mb-3 text-center text-2xl md:text-3xl">Выбери подготовку</h2>
          <p className="pubg-subtitle mb-10 text-center">
            Подготовься к королевской битве
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { title: "Собрать свой набор", link: "/build" },
              { title: "Битва оружий", link: "/battle" },
              { title: "Вероятность найти оружие", link: "/possibility" },
              { title: "Реальные цены", link: "/prices" },
            ].map((btn, idx) => (
              <a
                key={idx}
                href={btn.link}
                className="pubg-hero-action relative flex h-20 w-60 items-center justify-center p-3 text-center text-xs md:h-40 md:w-40 md:text-sm"
              >
                {btn.title}
                          <span className="absolute inset-0 border-4 border-yellow-400 animate-ping"></span>

              </a>
            ))}
          </div>
        </div>
      </section> */}

      <section className="pubg-section bg-[#171717]">
        <div className="pubg-container">
          <h2 className="pubg-title mb-10 text-center text-2xl md:text-3xl">Категории оружия</h2>
          <div className="grid grid-cols-2 gap-7 md:grid-cols-4">
            {sortedWeapons.map((weapon, idx) => (
              <div
                key={idx}
                className="pubg-card flex flex-col items-center p-4"
              >
                <img
                  src={weapon.image}
                  alt={weapon.name}
                  className="mb-4 h-24 w-24 object-contain"
                />
                <h3 className="pubg-title text-center text-base">{weapon.name}</h3>
                <p className="mt-1 text-sm text-[#cdcdcd]">Урон: {weapon.damage}</p>
                <p className="text-sm text-[#9f9f9f]">Тип: {weapon.type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}