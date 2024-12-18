import React from 'react'
import { Image, ScrollView, Text, View } from '@tarojs/components'
import type {
  AlchemyMasteryEntry,
  CookingMasteryEntry,
  ImperialCratesData,
  MasteryModifier,
} from '@/types'
import './DataTable.less'
import { Loading } from '@nutui/icons-react-taro'

const crateCosts = [52000, 80000, 120000, 160000, 220000, 320000]

const cookingMasteryLookup = {
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

const alchemyMasteryLookup = {
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

const skillLevelName: { [key: number]: { name: string, lang: string } } = {
  0: { name: 'beginner', lang: '初级' },
  0.5: { name: 'apprentice', lang: '见习' },
  1: { name: 'skilled', lang: '熟练' },
  2: { name: 'professional', lang: '专家' },
  3: { name: 'artisan', lang: '匠人' },
  4: { name: 'master', lang: '名匠' },
  5: { name: 'guru', lang: '道人' },
}

export function calculateCrateProfit(item: any, contributionPoints: number, masteryModifier: number) {
  const priceOfMaterial = item.price
  const baseAmountOfMaterial = item.amount
  const priceOfCrate = crateCosts[item.box]
  const numOfCrate = contributionPoints / 2
  const totalAmountOfCrates = baseAmountOfMaterial * numOfCrate
  return (
    numOfCrate * priceOfCrate * (2.5 + masteryModifier / 100)
    - totalAmountOfCrates * priceOfMaterial
  )
}

export function getMasteryModifier(
  skill: number,
  mode: 'cook' | 'alch',
): MasteryModifier {
  if (skill >= 2000)
    skill = 2000
  const skillBracket = Math.floor(skill / 50) * 50

  if (mode === 'cook') {
    const lookup = cookingMasteryLookup as { [key: number]: CookingMasteryEntry }
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
    const lookup = alchemyMasteryLookup as { [key: number]: AlchemyMasteryEntry }
    return lookup[skillBracket] || { imperialAlchemyProfit: 0 }
  }
}

interface DataTableProps {
  data: ImperialCratesData[]
  contributionPoints: number
  skill: number
  onSort: (column: keyof ImperialCratesData | 'profit') => void
  sortColumn: keyof ImperialCratesData | 'profit'
  sortOrder: 'asc' | 'desc'
  loading: boolean
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  contributionPoints,
  skill,
  onSort,
  sortColumn,
  sortOrder,
  loading = false,
}) => {
  if (loading) {
    return (
      <View className="flex justify-center items-center">
        <Loading />
      </View>
    )
  }
  return (
    <ScrollView className="w-full overflow-x-auto" scrollX>
      <View className="min-w-max">
        <View className="flex bg-gray-700 text-gray-300">
          {[
            { label: '箱子等级', key: 'box', width: 'w-32' },
            { label: '可做箱子', key: 'stock', width: 'w-32' },
            { label: '图标', key: '', width: 'w-24' },
            { label: '加工原料', key: 'lang', width: 'w-32' },
            { label: '成本/个', key: 'price', width: 'w-32' },
            { label: '所需数量', key: 'amount', width: 'w-32' },
            { label: '总利润', key: 'profit', width: 'w-32' },
          ].map(column => (
            <View
              key={column.key}
              className={`px-6 py-3 cursor-pointer ${column.width} border-r border-blue-400`}
              onClick={() => column.key && onSort(column.key as keyof ImperialCratesData | 'profit')}
            >
              <View className="flex items-center justify-between">
                <Text className="text-md font-semibold">{column.label}</Text>
                {column.key === sortColumn && (
                  <Text className="text-sm">
                    {sortOrder === 'asc' ? '↑' : '↓'}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </View>
        <View>
          {data
            .filter(item => item.lang !== null)
            .map((item, index) => {
              const masteryModifier = getMasteryModifier(skill, item.mode)

              let profit: number
              if (item.mode === 'cook') {
                const cookingModifier = masteryModifier as CookingMasteryEntry
                profit = calculateCrateProfit(
                  item,
                  contributionPoints,
                  cookingModifier.imperialCookingProfit,
                )
              }
              else {
                const alchemyModifier = masteryModifier as AlchemyMasteryEntry
                profit = calculateCrateProfit(
                  item,
                  contributionPoints,
                  alchemyModifier.imperialAlchemyProfit,
                )
              }

              const profitColor = profit < 0 ? 'text-green-500' : 'text-red-500'
              const skillLvlName = skillLevelName[item.box].lang
              const skillLevelColor = `text-${skillLevelName[item.box].name}`
              const itemGradeColor = `text-${skillLevelName[item.grade - 1].name}`
              const borderGradeColor = `border-${skillLevelName[item.grade - 1].name}`

              return (
                <View
                  key={index}
                  className={`flex border-b last:border-b-0 ${index % 2 === 0 ? '' : 'bg-gray-700'
                  }`}
                >
                  <View className={`px-6 py-3 ${skillLevelColor} w-32`}>
                    {skillLvlName}
                  </View>
                  <View className="px-6 py-3 w-32">
                    {Math.floor(contributionPoints / 2).toLocaleString()}
                  </View>
                  <View className="px-6 py-3 w-24">
                    <Image
                      src={`https://assets.garmoth.com/img/${item.img}`}
                      mode="aspectFill"
                      className={`w-8 h-8 rounded ${borderGradeColor}`}
                    />
                  </View>
                  <View className={`px-6 py-3 ${itemGradeColor} w-32`}>
                    <Text className="text-sm">
                      {item.lang.length > 10
                        ? (
                            <Text className="whitespace-nowrap overflow-ellipsis">
                              {item.lang}
                            </Text>
                          )
                        : (
                            item.lang
                          )}
                    </Text>
                  </View>
                  <View className="px-6 py-3 w-32">
                    {item.price.toLocaleString()}
                  </View>
                  <View className="px-6 py-3 w-32">
                    {Math.floor(
                      (item.amount * contributionPoints) / 2,
                    ).toLocaleString()}
                  </View>
                  <View className={`px-6 py-3 font-semibold ${profitColor} w-32`}>
                    {profit.toLocaleString()}
                  </View>
                </View>
              )
            })}
        </View>
      </View>
    </ScrollView>
  )
}

export default DataTable
