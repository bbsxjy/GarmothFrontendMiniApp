export interface ImperialCratesLevel {
  label: string
  color: string
}

export interface ImperialCratesData {
  type: string
  level: number
  lang: string
  img: string
  rarity: number
  profit: number
  stock: number
  price: number

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
export interface SkillAddon {
  _id: string
  class_id: number
  type: string
  level: number
  addon: number
  name: string
  addon_popularity_0: Record<string, number>
  addon_popularity_1: Record<string, number>
  id: number
  img: string
  lang: string
}

// Define types for the additional API responses
export interface SkillAddonDetail {
  _id: string
  id: number
  name: string
  lang: string
}

export interface Skill {
  _id: string
  type: string
  levels: {
    skill_id: number
    stats: {
      chc: number
    }
    req: number
  }[]
  classes: number[]
  name: string
  skill_id: number
  img: string
  lang: string
}
