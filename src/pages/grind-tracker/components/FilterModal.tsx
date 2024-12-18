import React, { useState } from 'react'
import { Input, Slider, Text, View } from '@tarojs/components'

interface FilterSliderProps {
  label: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
}

const FilterSlider: React.FC<FilterSliderProps> = ({ label, value, onChange, min, max }) => {
  const [inputValue, setInputValue] = useState<number | string>(value)

  const handleSliderChange = (e: any) => {
    const sliderValue = Number(e.detail.value)
    setInputValue(sliderValue)
    onChange(sliderValue)
  }

  const handleInputChange = (e: any) => {
    const input = e.detail.value
    if (/^\d*$/.test(input)) {
      setInputValue(input)
    }
  }

  const handleInputBlur = () => {
    const numericValue = Number(inputValue)
    if (!isNaN(numericValue) && numericValue >= min && numericValue <= max) {
      onChange(numericValue)
    }
    else {
      setInputValue(value) // 重置为滑块当前值
    }
  }

  return (
    <View className="filter-slider p-4 rounded-md border border-gray-300 bg-gray-100">
      <View className="flex flex-col gap-3">
        {/* 滑块标签 */}
        <Text className="text-xs font-medium text-gray-700">{label}</Text>

        {/* 滑块组件 */}
        <Slider
          min={min}
          max={max}
          value={value}
          onChange={handleSliderChange}
          className="w-full"
          activeColor="#007AFF"
          backgroundColor="#E5E7EB"
          blockSize={14}
        />

        {/* 最小值、输入框和最大值 */}
        <View className="flex items-center justify-between gap-3">
          <Text className="text-sm text-gray-600">{min}</Text>
          <Input
            type="number"
            value={inputValue}
            onInput={handleInputChange}
            onBlur={handleInputBlur}
            className="w-16 h-8 text-center bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Text className="text-sm text-gray-600">{max}</Text>
        </View>
      </View>
    </View>
  )
}

export default FilterSlider
