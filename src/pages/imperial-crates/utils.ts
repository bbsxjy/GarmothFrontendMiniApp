export interface AlchemyMasteryEntry {
  imperialAlchemyProfit: number
}

export interface CookingMasteryEntry {
  maxDishesChance: number
  higherGradeChance: number
  massCookingChance: number
  imperialCookingProfit: number
}

export interface ImperialCratesData {
  box: number
  stock: number
  img: string
  lang: string | null
  price: number
  amount: number
  mode: 'cook' | 'alch'
  grade: number
}

export type MasteryModifier = CookingMasteryEntry | AlchemyMasteryEntry

const crateCosts = [52000, 80000, 120000, 160000, 220000, 320000]

export const cookingMasteryLookup: { [key: number]: CookingMasteryEntry } = {
  0: { maxDishesChance: 0, higherGradeChance: 0, massCookingChance: 0, imperialCookingProfit: 0 },
  50: { maxDishesChance: 0.64, higherGradeChance: 0.25, massCookingChance: 10.89, imperialCookingProfit: 1.85 },
  100: { maxDishesChance: 0.96, higherGradeChance: 0.36, massCookingChance: 11.76, imperialCookingProfit: 2.96 },
  150: { maxDishesChance: 1.35, higherGradeChance: 0.36, massCookingChance: 11.67, imperialCookingProfit: 4.33 },
  200: { maxDishesChance: 1.8, higherGradeChance: 0.64, massCookingChance: 13.62, imperialCookingProfit: 5.95 },
  250: { maxDishesChance: 2.31, higherGradeChance: 0.81, massCookingChance: 14.59, imperialCookingProfit: 7.84 },
  300: { maxDishesChance: 2.89, higherGradeChance: 1, massCookingChance: 15.6, imperialCookingProfit: 9.99 },
  350: { maxDishesChance: 3.53, higherGradeChance: 1.21, massCookingChance: 16.65, imperialCookingProfit: 12.39 },
  400: { maxDishesChance: 4.24, higherGradeChance: 1.44, massCookingChance: 17.72, imperialCookingProfit: 15.05 },
  450: { maxDishesChance: 5.02, higherGradeChance: 1.69, massCookingChance: 18.84, imperialCookingProfit: 17.98 },
  500: { maxDishesChance: 5.86, higherGradeChance: 1.96, massCookingChance: 19.98, imperialCookingProfit: 21.16 },
  550: { maxDishesChance: 6.76, higherGradeChance: 2.25, massCookingChance: 21.16, imperialCookingProfit: 24.6 },
  600: { maxDishesChance: 7.73, higherGradeChance: 2.56, massCookingChance: 22.37, imperialCookingProfit: 28.3 },
  650: { maxDishesChance: 8.76, higherGradeChance: 2.89, massCookingChance: 23.62, imperialCookingProfit: 32.26 },
  700: { maxDishesChance: 9.86, higherGradeChance: 3.24, massCookingChance: 24.9, imperialCookingProfit: 36.48 },
  750: { maxDishesChance: 11.02, higherGradeChance: 3.61, massCookingChance: 26.21, imperialCookingProfit: 40.96 },
  800: { maxDishesChance: 12.25, higherGradeChance: 4, massCookingChance: 27.56, imperialCookingProfit: 45.7 },
  850: { maxDishesChance: 13.54, higherGradeChance: 4.41, massCookingChance: 28.94, imperialCookingProfit: 50.69 },
  900: { maxDishesChance: 14.9, higherGradeChance: 4.84, massCookingChance: 30.58, imperialCookingProfit: 55.95 },
  950: { maxDishesChance: 16.32, higherGradeChance: 5.29, massCookingChance: 32.26, imperialCookingProfit: 61.47 },
  1000: { maxDishesChance: 17.81, higherGradeChance: 5.76, massCookingChance: 33.99, imperialCookingProfit: 67.24 },
  1050: { maxDishesChance: 19.36, higherGradeChance: 6.25, massCookingChance: 35.76, imperialCookingProfit: 73.27 },
  1100: { maxDishesChance: 20.98, higherGradeChance: 6.76, massCookingChance: 37.58, imperialCookingProfit: 79.57 },
  1150: { maxDishesChance: 22.66, higherGradeChance: 7.29, massCookingChance: 39.44, imperialCookingProfit: 86.12 },
  1200: { maxDishesChance: 24.4, higherGradeChance: 7.84, massCookingChance: 41.34, imperialCookingProfit: 92.93 },
  1250: { maxDishesChance: 26.21, higherGradeChance: 8.41, massCookingChance: 44.22, imperialCookingProfit: 95.84 },
  1300: { maxDishesChance: 28.09, higherGradeChance: 9, massCookingChance: 47.2, imperialCookingProfit: 98.8 },
  1350: { maxDishesChance: 30.03, higherGradeChance: 9.61, massCookingChance: 50.27, imperialCookingProfit: 101.81 },
  1400: { maxDishesChance: 32.04, higherGradeChance: 10.24, massCookingChance: 53.44, imperialCookingProfit: 104.86 },
  1450: { maxDishesChance: 34.11, higherGradeChance: 10.89, massCookingChance: 56.7, imperialCookingProfit: 107.95 },
  1500: { maxDishesChance: 36.24, higherGradeChance: 11.56, massCookingChance: 60.06, imperialCookingProfit: 111.09 },
  1550: { maxDishesChance: 38.44, higherGradeChance: 12.25, massCookingChance: 63.52, imperialCookingProfit: 114.28 },
  1600: { maxDishesChance: 40.7, higherGradeChance: 12.96, massCookingChance: 67.08, imperialCookingProfit: 117.51 },
  1650: { maxDishesChance: 43.03, higherGradeChance: 13.69, massCookingChance: 70.73, imperialCookingProfit: 120.78 },
  1700: { maxDishesChance: 45.43, higherGradeChance: 14.44, massCookingChance: 74.48, imperialCookingProfit: 124.1 },
  1750: { maxDishesChance: 47.89, higherGradeChance: 15.21, massCookingChance: 78.32, imperialCookingProfit: 127.46 },
  1800: { maxDishesChance: 50.41, higherGradeChance: 16, massCookingChance: 82.26, imperialCookingProfit: 130.87 },
  1850: { maxDishesChance: 53, higherGradeChance: 16.81, massCookingChance: 86.3, imperialCookingProfit: 134.83 },
  1900: { maxDishesChance: 55.65, higherGradeChance: 17.64, massCookingChance: 90.44, imperialCookingProfit: 137.83 },
  1950: { maxDishesChance: 58.37, higherGradeChance: 18.49, massCookingChance: 99.5, imperialCookingProfit: 141.37 },
  2000: { maxDishesChance: 61.15, higherGradeChance: 19.36, massCookingChance: 100, imperialCookingProfit: 144.96 },
}

export const alchemyMasteryLookup: { [key: number]: AlchemyMasteryEntry } = {
  0: { imperialAlchemyProfit: 0 },
  50: { imperialAlchemyProfit: 2.7 },
  100: { imperialAlchemyProfit: 3.15 },
  150: { imperialAlchemyProfit: 3.63 },
  200: { imperialAlchemyProfit: 4.15 },
  250: { imperialAlchemyProfit: 4.7 },
  300: { imperialAlchemyProfit: 5.29 },
  350: { imperialAlchemyProfit: 5.91 },
  400: { imperialAlchemyProfit: 6.57 },
  450: { imperialAlchemyProfit: 7.26 },
  500: { imperialAlchemyProfit: 7.99 },
  550: { imperialAlchemyProfit: 8.75 },
  600: { imperialAlchemyProfit: 9.54 },
  650: { imperialAlchemyProfit: 10.37 },
  700: { imperialAlchemyProfit: 11.24 },
  750: { imperialAlchemyProfit: 12.13 },
  800: { imperialAlchemyProfit: 13.07 },
  850: { imperialAlchemyProfit: 14.04 },
  900: { imperialAlchemyProfit: 15.04 },
  950: { imperialAlchemyProfit: 16.07 },
  1000: { imperialAlchemyProfit: 17.15 },
  1050: { imperialAlchemyProfit: 18.25 },
  1100: { imperialAlchemyProfit: 19.39 },
  1150: { imperialAlchemyProfit: 20.57 },
  1200: { imperialAlchemyProfit: 21.78 },
  1250: { imperialAlchemyProfit: 23.02 },
  1300: { imperialAlchemyProfit: 24.3 },
  1350: { imperialAlchemyProfit: 25.61 },
  1400: { imperialAlchemyProfit: 26.96 },
  1450: { imperialAlchemyProfit: 28.96 },
  1500: { imperialAlchemyProfit: 29.76 },
  1550: { imperialAlchemyProfit: 31.21 },
  1600: { imperialAlchemyProfit: 32.7 },
  1650: { imperialAlchemyProfit: 34.22 },
  1700: { imperialAlchemyProfit: 35.77 },
  1750: { imperialAlchemyProfit: 37.36 },
  1800: { imperialAlchemyProfit: 38.99 },
  1850: { imperialAlchemyProfit: 40.65 },
  1900: { imperialAlchemyProfit: 42.34 },
  1950: { imperialAlchemyProfit: 44.07 },
  2000: { imperialAlchemyProfit: 45.83 },
}

export const skillLevelName: { [key: number]: { name: string, lang: string } } = {
  0: { name: 'beginner', lang: '初级' },
  0.5: { name: 'apprentice', lang: '见习' },
  1: { name: 'skilled', lang: '熟练' },
  2: { name: 'professional', lang: '专家' },
  3: { name: 'artisan', lang: '匠人' },
  4: { name: 'master', lang: '名匠' },
  5: { name: 'guru', lang: '道人' },
}

export function calculateCrateProfit(
  item: ImperialCratesData,
  contributionPoints: number,
  masteryModifier: number,
): number {
  const priceOfMaterial = item.price
  const baseAmountOfMaterial = item.amount
  const priceOfCrate = crateCosts[item.box]
  const numOfCrate = contributionPoints / 2
  const totalAmountOfCrates = baseAmountOfMaterial * numOfCrate
  return numOfCrate * priceOfCrate * (2.5 + masteryModifier / 100) - totalAmountOfCrates * priceOfMaterial
}

export function getMasteryModifier(skill: number, mode: 'cook' | 'alch'): MasteryModifier {
  if (skill >= 2000)
    skill = 2000
  const skillBracket = Math.floor(skill / 50) * 50

  if (mode === 'cook') {
    const lookup = cookingMasteryLookup
    return (
      lookup[skillBracket] || {
        maxDishesChance: 0,
        higherGradeChance: 0,
        massCookingChance: 0,
        imperialCookingProfit: 0,
      }
    )
  }
  else {
    const lookup = alchemyMasteryLookup
    return lookup[skillBracket] || { imperialAlchemyProfit: 0 }
  }
}
