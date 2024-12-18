import React, { useEffect, useState } from 'react'
import { Button, Input, ScrollView, Text, View } from '@tarojs/components'
import { AtButton, AtInput } from 'taro-ui'
import { debounce } from 'lodash'
import { Loading } from '@nutui/icons-react-taro'
import type { AlchemyMasteryEntry, CookingMasteryEntry, ImperialCratesData } from '../../types'
import DataTable, { calculateCrateProfit, getMasteryModifier } from './components/DataTable'
import FilterPanel from './components/FIlterPanel'
import { useGetImperialCratesDataQuery } from '@/api/imperial-crates/dataApi'

const ImperialCrates: React.FC = () => {
  const [cookingSkill, setCookingSkill] = useState(500) // Default to 500
  const [alchemySkill, setAlchemySkill] = useState(500) // Default for alchemy skill
  const [contributionPoints, setContributionPoints] = useState(200) // Default to 200
  const [selectedLevels, setSelectedLevels] = useState<string[]>([])
  const [tableData, setTableData] = useState<ImperialCratesData[]>([]) // Change from any[] | undefined to ImperialCratesData[]
  const [activeTab, setActiveTab] = useState('food') // Default tab for cooking
  const { data, isLoading, isError, error } = useGetImperialCratesDataQuery()
  const [searchTerm, setSearchTerm] = useState('') // State for search term
  const [sortColumn, setSortColumn] = useState<keyof ImperialCratesData | 'profit'>('lang') // State for sorting column
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [isSearching, setIsSearching] = useState(false)
  const cooking: ImperialCratesData[] = data ? data.filter(item => item.mode === 'cook') : []
  const alchemy: ImperialCratesData[] = data ? data.filter(item => item.mode === 'alch') : []
  const debouncedSearch = debounce((value: string) => setSearchTerm(value), 500)

  useEffect(() => {
    setTableData(activeTab === 'food' ? cooking : alchemy)
  }, [data, activeTab, cooking, alchemy])
  useEffect(() => {
    if (searchTerm) {
      setIsSearching(true)
      const timer = setTimeout(() => {
        setIsSearching(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [searchTerm])
  const handleSort = (column: keyof ImperialCratesData | 'profit') => {
    const order: 'asc' | 'desc' = sortOrder === 'asc' ? 'desc' : 'asc'
    setSortColumn(column)
    setSortOrder(order)

    const sortedData = [...tableData].sort((a, b) => {
      if (column === 'profit') {
        const skill = activeTab === 'food' ? cookingSkill : alchemySkill

        const masteryModifierA = getMasteryModifier(skill, a.mode)
        const masteryModifierB = getMasteryModifier(skill, b.mode)

        let profitA: number
        if (a.mode === 'cook') {
          const cookingModifierA = masteryModifierA as CookingMasteryEntry
          profitA = calculateCrateProfit(a, contributionPoints, cookingModifierA.imperialCookingProfit)
        }
        else {
          const alchemyModifierA = masteryModifierA as AlchemyMasteryEntry
          profitA = calculateCrateProfit(a, contributionPoints, alchemyModifierA.imperialAlchemyProfit)
        }

        let profitB: number
        if (b.mode === 'cook') {
          const cookingModifierB = masteryModifierB as CookingMasteryEntry
          profitB = calculateCrateProfit(b, contributionPoints, cookingModifierB.imperialCookingProfit)
        }
        else {
          const alchemyModifierB = masteryModifierB as AlchemyMasteryEntry
          profitB = calculateCrateProfit(b, contributionPoints, alchemyModifierB.imperialAlchemyProfit)
        }

        return order === 'asc' ? profitA - profitB : profitB - profitA
      }
      else {
        const valueA = a[column]
        const valueB = b[column]

        if (valueA === valueB)
          return 0

        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return order === 'asc' ? valueA - valueB : valueB - valueA
        }
        else {
          return order === 'asc'
            ? String(valueA).localeCompare(String(valueB))
            : String(valueB).localeCompare(String(valueA))
        }
      }
    })

    setTableData(sortedData)
  }

  const handleSearch = (value: string) => {
    debouncedSearch(value)
  }
  const filteredData = tableData.filter(
    item => item.lang?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (isError) {
    return (
      <View className="w-full flex items-center justify-center py-10">
        <Text className="text-red-500">
          数据加载失败:
          {error?.toString()}
        </Text>
      </View>
    )
  }

  return (
    <View className="imperial-crates container mx-auto p-4">
      <header className="">
        <h1 className="text-2xl font-bold text-center mb-2">皇室纳贡利润计算器</h1>
        <View className="flex justify-center">
          <View
            onClick={() => {
              setTableData(cooking)
              setActiveTab('food')
            }}
            className={`${activeTab === 'food' ? 'border-green-500 bg-green-500 ' : ''} bg-opacity-80 px-4 py-2 h-10 relative overflow-hidden font-normal border border-gray-300 rounded-md transition hover:brightness-125`}
          >
            烹饪
          </View>
          <View
            onClick={() => {
              setTableData(alchemy)
              setActiveTab('functional')
            }}
            className={`${activeTab === 'functional' ? 'border-green-500 bg-green-500 ' : ''} bg-opacity-80 px-4 py-2 h-10 relative overflow-hidden font-normal border border-gray-300 rounded-md transition hover:brightness-125`}
          >
            炼金
          </View>
        </View>

      </header>

      <View className="mt-2 pl-2 pr-2">
        <AtInput
          type="text"
          onChange={value => handleSearch(String(value))}
          placeholder="搜索原料..."
          name="searchTerms"
          value={searchTerm}
          className="border border-gray-300 rounded py-1 px-1"
          clear
        />
      </View>

      <View className="flex flex-col lg:flex-row gap-4">
        <View className="w-full lg:w-1/4">
          <FilterPanel
            skill={activeTab === 'food' ? cookingSkill : alchemySkill}
            setSkill={activeTab === 'food' ? setCookingSkill : setAlchemySkill}
            contributionPoints={contributionPoints}
            setContributionPoints={setContributionPoints}
            selectedLevels={selectedLevels}
            setSelectedLevels={setSelectedLevels}
            activeTab={activeTab}
          />
        </View>
        <View className="w-full lg:w-3/4">
          {isSearching && (
            <View className="flex justify-center">
              <Loading />
            </View>
          )}
          <DataTable
            data={filteredData}
            contributionPoints={contributionPoints}
            skill={activeTab === 'food' ? cookingSkill : alchemySkill}
            onSort={handleSort}
            sortColumn={sortColumn}
            sortOrder={sortOrder}
            loading={isLoading}
          />
        </View>
      </View>
    </View>
  )
}

export default ImperialCrates
