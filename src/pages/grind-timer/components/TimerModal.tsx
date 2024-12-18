
import React, { useState } from 'react'
import { Button, Image, Input, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'

interface TimerModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (timer: Timer) => void
}

interface Timer {
  name: string
  time: { hours: string, minutes: string, seconds: string }
}

const TimerModal: React.FC<TimerModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('')
  const [hours, setHours] = useState('00')
  const [minutes, setMinutes] = useState('00')
  const [seconds, setSeconds] = useState('00')
  const [error, setError] = useState('')

  const handleAddTimer = () => {
    if (!name.trim()) {
      setError('名称不能为空')
      return
    }
    if (isNaN(Number(hours)) || isNaN(Number(minutes)) || isNaN(Number(seconds))) {
      setError('时间必须为数字')
      return
    }
    const totalSeconds = Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds)
    if (totalSeconds <= 0) {
      setError('时间必须大于零')
      return
    }
    onAdd({ name, time: { hours, minutes, seconds } })
    resetFields()
    onClose()
  }

  const resetFields = () => {
    setName('')
    setHours('00')
    setMinutes('00')
    setSeconds('00')
    setError('')
  }

  if (!isOpen)
    return null

  return (
    <View className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
      <View className="relative max-w-md w-full rounded-md bg-700 p-6 animate-scaleIn">
        {/* 关闭按钮 */}
        <View className="absolute top-2 right-2 cursor-pointer" onClick={onClose}>
          <Image
            src="https://assets.garmoth.com/icons/close.svg" // 使用关闭图标的图片链接
            className="w-6 h-6 transition-transform hover:scale-110"
            alt="关闭"
          />
        </View>

        {/* 模态框内容 */}
        <Text className="text-center font-normal mt-4 mb-2 text-lg">新建计时器</Text>
        {error && <Text className="text-red-500 text-center mb-2">{error}</Text>}
        <Input
          type="text"
          className="h-10 border border-500 p-0 text-center font-normal mb-4 bg-transparent"
          placeholder="名称"
          value={name}
          autoFocus
          onInput={e => setName(e.detail.value)}
        />
        <View>
          <Text className="mb-1 text-center">时间</Text>
          <View className="flex justify-center gap-1 mb-4">
            <Input
              type="number"
              className="aspect-square w-12 border border-500 p-0 text-center text-xl font-normal bg-transparent"
              placeholder="00"
              value={hours}
              onInput={e => setHours(e.detail.value)}
            />
            <Text className="flex items-center text-2xl opacity-50">:</Text>
            <Input
              type="number"
              className="aspect-square w-12 border border-500 p-0 text-center text-xl font-normal bg-transparent"
              placeholder="00"
              value={minutes}
              onInput={e => setMinutes(e.detail.value)}
            />
            <Text className="flex items-center text-2xl opacity-50">:</Text>
            <Input
              type="number"
              className="aspect-square w-12 border border-500 p-0 text-center text-xl font-normal bg-transparent"
              placeholder="00"
              value={seconds}
              onInput={e => setSeconds(e.detail.value)}
            />
          </View>
        </View>
        <Button
          onClick={handleAddTimer}
          className="border-green bg-green bg-opacity-80 w-full h-10 rounded-md border hover:brightness-125 text-white"
        >
          新建
        </Button>
      </View>
    </View>
  )
}

export default TimerModal
