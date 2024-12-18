export interface PostItem {
  id: number
  link?: string
  backgroundImageUrl?: string
  title?: string
  badgeText?: string
  timeAgo?: string
  className?: string
}

export interface CouponCardItem {
  dateTime: string | number
  expiration: string | number
  code: string
  imgSrc?: string
  imgCount?: number
  className?: string
}

export interface ImperialCratesLevel {
  label: string
  color: string
}

export interface ImperialCratesData {
  mode: 'cook' | 'alch'
  lang: string
  img: string
  stock: number
  amount: number
  price: number
  main_key: number
  box: number
  grade: number
  name: string
}

export function skillLevels() {
  return [
    { id: 0, name: '初级' },
    { id: 0.5, name: '见习' },
    { id: 1, name: '熟练' },
    { id: 2, name: '专家' },
    { id: 3, name: '匠人' },
    { id: 4, name: '名匠' },
    { id: 5, name: '道人' },
  ]
}

export interface CookingMasteryEntry {
  maxDishesChance: number
  higherGradeChance: number
  massCookingChance: number
  imperialCookingProfit: number
}

export interface AlchemyMasteryEntry {
  imperialAlchemyProfit: number
}

export type MasteryModifier = CookingMasteryEntry | AlchemyMasteryEntry
