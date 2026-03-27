export interface ItemPrice {
  name: string
  priceUSD: number
}
export interface Weapon {
  id?: string
  name: string
  type: string
  ammo: string
  damage: number
  image: string
  prices?: ItemPrice[]
}

export interface Stock {
  id?: number
  name: string
  type: string
  recoilVertical: number
  recoilHorizontal: number
  adsSpeed: number
  weight: number
  image: string
  attachableTo?: string[]
  prices?: ItemPrice[]
}
export interface Muzzle {
  id: number
  name: string
  type: string
  recoilVertical: number
  recoilHorizontal: number
  soundReduction: number
  weight: number
  image: string
  attachableTo?: string[]
  prices?: ItemPrice[]
}
export interface Magazine {
  id: number
  name: string
  type: string
  capacityBonus: number
  reloadSpeedBonus: number
  weight: number
  image: string
  attachableTo?: string[]
  prices?: ItemPrice[]
}
export interface Grip {
  id: number
  name: string
  recoilVertical: number
  recoilHorizontal: number
  stability: number
  adsSpeed: number
  image: string
  attachableTo?: string[]
  prices?: ItemPrice[]
}
export interface Attachment {
  id: number
  name: string
  zoom: number
  accuracyBonus: number
  recoilControl: number
  weight: number
  image: string
  attachableTo?: string[]
  prices?: ItemPrice[]
}
