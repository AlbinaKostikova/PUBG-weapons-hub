export function calculateScore(weapon: any, mods: any[]) {
  let damage = weapon.damage
  let recoil = weapon.recoil
  let accuracy = weapon.range

  mods.forEach(mod => {
    if (mod.recoil) recoil += mod.recoil
    if (mod.accuracy) accuracy += mod.accuracy
  })

  const score =
    damage * 2 +
    accuracy * 1.5 -
    recoil * 1 +
    weapon.fireRate * 1.2

  return Math.round(score)
}