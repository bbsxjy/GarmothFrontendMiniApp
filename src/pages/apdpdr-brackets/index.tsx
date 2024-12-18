import React, { useEffect, useState } from 'react'
import { Button, Input, Text, View } from '@tarojs/components'

import BracketsTable from './BracketsTable'
import { useGetBracketsDataQuery } from '@/api'
import type { APRow, DPRow, DRRow } from '@/types'
import { BracketsData } from '@/types'
import Spinner from '@/components/Loading'

const Brackets: React.FC = () => {
  const [currentTable, setCurrentTable] = useState<'AP' | 'DP' | 'DR'>('AP')
  const [apValue, setAPValue] = useState<number>(0)
  const [apGoal, setAPGoal] = useState<number>(0)
  const [dpValue, setDPValue] = useState<number>(0)
  const [dpGoal, setDPGoal] = useState<number>(0)

  const { data, isLoading, error } = useGetBracketsDataQuery()

  const APData: APRow[] = data?.[0]?.ap ?? []
  const DPData: DPRow[] = data?.[0]?.dp ?? []
  const DRData: DRRow[] = data?.[0]?.dr ?? []

  const handleTableChange = (table: 'AP' | 'DP' | 'DR') => {
    setCurrentTable(table)
  }

  const handleAPChange = (amount: number) => {
    setAPValue(prev => Math.max(0, prev + amount))
  }

  const handleDPChange = (amount: number) => {
    setDPValue(prev => Math.max(0, prev + amount))
  }

  if (isLoading) {
    return (
      <Spinner />
    )
  }

  if (error) {
    return (
      <View>
        <View className="flex justify-center items-center h-full">
          <Text className="text-red-500">加载数据出错</Text>
        </View>
      </View>
    )
  }

  return (
    <View>
      <View className="container mx-auto flex flex-col gap-3 p-3">

        <View className="mb-3 flex justify-center gap-3">
          <View
            className={`cursor-pointer rounded border bg-gray-600 px-3 py-2 ${currentTable === 'AP' ? 'border-green-500' : 'border-gray-500'
            }`}
            onClick={() => handleTableChange('AP')}
          >
            <Text className="text-center">攻击力</Text>
          </View>
          <View
            className={`cursor-pointer rounded border bg-gray-600 px-3 py-2 ${currentTable === 'DP' ? 'border-green-500' : 'border-gray-500'
            }`}
            onClick={() => handleTableChange('DP')}
          >
            <Text className="text-center">防御力</Text>
          </View>
          <View
            className={`cursor-pointer rounded border bg-gray-600 px-3 py-2 ${currentTable === 'DR' ? 'border-green-500' : 'border-gray-500'
            }`}
            onClick={() => handleTableChange('DR')}
          >
            <Text className="text-center">闪避</Text>
          </View>
        </View>

        {/* 当前表格内容 */}
        <View className="mx-auto w-full xl:w-1/2">
          {currentTable === 'AP' && (
            <BracketsTable
              type="AP"
              data={APData}
              value={apValue}
              goal={apGoal}
              onChangeValue={handleAPChange}
              onChangeGoal={setAPGoal}
            />
          )}
          {currentTable === 'DP' && (
            <BracketsTable
              type="DP"
              data={DPData}
              value={dpValue}
              goal={dpGoal}
              onChangeValue={handleDPChange}
              onChangeGoal={setDPGoal}
            />
          )}
          {currentTable === 'DR' && (
            <BracketsTable
              type="DR"
              data={DRData}
              value={dpValue}
              goal={dpGoal}
              onChangeValue={handleDPChange}
              onChangeGoal={setDPGoal}
            />
          )}
        </View>
      </View>
    </View>
  )
}

export default Brackets
