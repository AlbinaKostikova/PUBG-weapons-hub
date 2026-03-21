export default function WeaponCard({ weapon }: any) {
  return (
    <div className="bg-zinc-900 p-4 rounded-xl">
      <h2 className="text-xl font-bold">{weapon.name}</h2>
      <p>{weapon.description}</p>

      <div className="mt-2 text-sm">
        Damage: {weapon.damage}
        <br />
        Recoil: {weapon.recoil}
        <br />
        Range: {weapon.range}
      </div>
    </div>
  )
}