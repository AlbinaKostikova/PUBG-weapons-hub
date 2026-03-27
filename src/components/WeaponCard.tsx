'use client';
import Link from 'next/link'
import React from "react";
import { Weapon } from "../types/items";

interface Props {
  weapon: Weapon;
}

export default function WeaponCard({ weapon }: Props) {
  return (
    <Link
      href={`/build?weapon=${encodeURIComponent(weapon.name)}`}
      className="group relative w-full max-w-55"
    >
      <div className="absolute -inset-0.5 rounded-2xl bg-linear-to-r from-yellow-500/0 via-yellow-500/40 to-yellow-500/0 blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
      <div className="relative bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl pt-2 pb-4 flex flex-col items-center transition duration-300 group-hover:border-yellow-400 group-hover:scale-105">
        <div className="relative w-full h-52 rounded-t-2xl overflow-hidden
  bg-[radial-gradient(circle,rgba(255,230,150,0.18)_0%,rgba(255,255,255,0.08)_40%,rgba(0,0,0,0)_70%)]">
          <img
            src={weapon.image}
            alt={weapon.name}
            className="w-full h-full object-contain scale-125 transition duration-300 group-hover:scale-130"
          />
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-3 
                          bg-yellow-400/20 blur-xl"></div>
        </div>
        <h3 className="mt-3 text-center text-sm font-semibold tracking-wide text-white group-hover:text-yellow-400 transition">
          {weapon.name}
        </h3>

        <div className="mt-2 text-center text-xs text-gray-400 space-y-1">
          <p>Тип: <span className="text-gray-200">{weapon.type}</span></p>
          <p>Урон: <span className="text-gray-200">{weapon.damage}</span></p>
        </div>

        <div className="mt-3 h-0.5 w-full bg-linear-to-r from-transparent via-yellow-400 to-transparent opacity-40 group-hover:opacity-100 transition"></div>

        <button className="mt-4 text-xs uppercase tracking-widest text-yellow-400 opacity-0 group-hover:opacity-100 transition">
          Подробнее →
        </button>
      </div>
    </Link>
  );
}