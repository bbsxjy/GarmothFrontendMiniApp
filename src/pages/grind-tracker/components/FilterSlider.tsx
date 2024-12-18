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
    // 只允许输入数字
    if (/^\d*$/.test(input)) {
      setInputValue(input)
    }
  }

  const handleInputBlur = () => {
    const numericValue = Number(inputValue)
    if (!isNaN(numericValue) && numericValue >= min && numericValue <= max) {
      onChange(numericValue) // 更新滑块值
    }
    else {
      setInputValue(value) // 如果输入无效，重置为当前滑块值
    }
  }

  return (
    <View className="filter-slider rounded-md border border-600 bg-700 p-4">
      <View className="grid grid-cols-1 gap-3">
        <View>
          <Text className="slider-label text-200 mb-0.5 text-xs block">{label}</Text>
          <Slider
            min={min}
            max={max}
            value={value}
            onChange={handleSliderChange}
            className="w-3/4"
            activeColor="#007AFF"
            backgroundColor="#ccc"
            blockSize={12}
          />
          <View className="flex-row justify-between text-sm text-200">
            <Text>{min}</Text>
            ~
            <Text>{max}</Text>
          </View>
          <Input
            type="number"
            value={inputValue}
            onInput={handleInputChange}
            onBlur={handleInputBlur}
            className="w-16 text-center bg-700 border border-white rounded-md"
          />
        </View>
      </View>
    </View>
  )
}

export default FilterSlider
