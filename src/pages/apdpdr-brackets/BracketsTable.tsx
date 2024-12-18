import React from 'react'
import { Button, Image, Input, Text, View } from '@tarojs/components'
import type { APRow, DPRow, DRRow } from '@/types'

interface BracketsTableProps {
  type: 'AP' | 'DP' | 'DR'
  data: APRow[] | DPRow[] | DRRow[]
  value: number
  goal: number
  onChangeValue: (amount: number) => void
  onChangeGoal: (amount: number) => void
}

const BracketsTable: React.FC<BracketsTableProps> = ({
  type,
  data,
  value,
  goal,
  onChangeValue,
  onChangeGoal,
}) => {
  const isAP = type === 'AP'
  const isDP = type === 'DP'
  const isDR = type === 'DR'

  // 根据类型设置标签和提示信息
  const label = isAP ? '攻击力' : isDP ? '防御力' : '闪避'
  const yourValueLabel = isAP ? '你的攻击力' : isDP ? '你的防御力' : '你的闪避'
  const goalLabel = isAP ? '目标攻击力' : isDP ? '目标防御力' : '目标闪避'
  const nextStageRequirement = isAP
    ? Math.max(0, 3 - value)
    : isDP
      ? Math.max(0, 1 - value)
      : Math.max(0, 2 - value)

  return (
    <View className="mb-3 rounded bg-gray-700 p-3">
      <Text className="text-center text-xl font-bold">{isAP ? '攻击力阶段' : isDP ? '防御力阶段' : '闪避阶段'}</Text>

      {/* 输入区域 */}
      <View className="mb-3 grid grid-cols-2 gap-3">
        {/* 当前值 */}
        <View>
          <Text className="text-center text-md mb-1">{yourValueLabel}</Text>
          <View className="flex">
            <Button
              className="flex-1 flex items-center justify-center px-2 bg-transparent border-0"
              onClick={() => onChangeValue(-1)}
            >
              -
            </Button>
            <Input
              type="number"
              className="flex-1 flex text-center justify-center px-2 bg-transparent border-0"
              placeholder={`Your ${label}`}
              value={value}
              style={{
                backgroundColor: 'transparent !important',
              }}
              onInput={e => onChangeValue(Number(e.detail.value) - value)}
            />
            <Button
              className="flex-1 flex items-center justify-center px-2 bg-transparent border-0"
              onClick={() => onChangeValue(1)}
            >
              +
            </Button>
          </View>
          <Text className="text-center text-sm text-gray-300 mt-1">
            到达下一个阶段所需的
            {label}
            :
            <Text className="font-semibold text-yellow-500">
              {' '}
              {nextStageRequirement}
              {' '}
              {label}
            </Text>
          </Text>
        </View>

        {/* 目标值 */}
        <View>
          <Text className="text-center text-md mb-1">目标</Text>
          <View className="flex">
            <Button
              className="flex-1 flex items-center justify-center px-2 bg-transparent border-0"
              onClick={() => onChangeGoal(-1)}
            >
              -
            </Button>
            <Input
              type="number"
              className="mx-1 py-0 text-center text-xl flex-1 bg-gray-600 rounded"
              placeholder={`${label} Goal`}
              value={goal}
              style={{
                backgroundColor: 'transparent !important',
              }}
              onInput={e => onChangeGoal(Number(e.detail.value) - goal)}
            />
            <Button
              className="flex-1 flex items-center justify-center px-2 bg-transparent border-0"
              onClick={() => onChangeGoal(1)}
            >
              +
            </Button>
          </View>
        </View>
      </View>

      {/* 数据表格 */}
      <View className="overflow-hidden rounded bg-gray-600 text-sm mt-3">
        <View className="border-b border-gray-500">
          <View className="flex flex-row">
            {isAP && (
              <>
                <Text className="flex-1 text-center font-semibold">所需要的攻击力</Text>
                <Text className="flex-1 text-center font-semibold">攻击力增加</Text>
              </>
            )}
            {isDP && (
              <>
                <Text className="flex-1 text-center font-semibold">所需要的防御力</Text>
                <Text className="flex-1 text-center font-semibold">防御力增加</Text>
              </>
            )}
            {isDR && (
              <>
                <Text className="flex-1 text-center font-semibold">防御力</Text>
                <Text className="flex-1 text-center font-semibold">防御力增加</Text>
                <Text className="flex-1 text-center font-semibold">额外防御力</Text>
              </>
            )}
          </View>
        </View>
        <View>
          {data.map((row, index) => (
            <View
              key={index}
              className={`flex flex-row h-7 cursor-pointer select-none text-center hover:bg-gray-600 hover:bg-opacity-50 ${
                (isAP && value >= (row as APRow).minAP && value <= (row as APRow).maxAP)
                || (isAP && goal >= (row as APRow).low && goal <= (row as APRow).high)
                || (isDP && value >= (row as DPRow).minDP && value <= (row as DPRow).maxDP)
                || (isDP && goal >= (row as DPRow).low && goal <= (row as DPRow).high)
                || (isDR && value >= (row as DRRow).minDR && value <= (row as DRRow).maxDR)
                || (isDR && goal >= (row as DRRow).low && goal <= (row as DRRow).high)
                  ? 'h-9 border-gray-600 bg-gray-700 text-lg'
                  : ''
              }`}
            >
              {isAP && (
                <>
                  <Text className="flex-1 font-semibold">{(row as APRow).low}</Text>
                  <Text className="flex-1 font-semibold">{(row as APRow).high}</Text>
                </>
              )}
              {isDP && (
                <>
                  <Text className="flex-1 font-semibold">{(row as DPRow).low}</Text>
                  <Text className="flex-1 font-semibold">{(row as DPRow).high}</Text>
                </>
              )}
              {isDR && (
                <>
                  <Text className="flex-1 font-semibold">{(row as DRRow).low}</Text>
                  <Text className="flex-1 font-semibold">{(row as DRRow).high}</Text>
                  <Text className="flex-1 font-semibold text-blue-500">{(row as DRRow).bonus}</Text>
                </>
              )}
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

export default BracketsTable
