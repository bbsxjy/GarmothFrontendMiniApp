import React, { useEffect, useState } from 'react'
import { Button, Image, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'

interface TimerDownProps {
  name: string
  time: {
    hours: string
    minutes: string
    seconds: string
  }
  isRunning?: boolean
  onClose?: () => void
  isReset?: boolean
}

const TimerDown: React.FC<TimerDownProps> = ({ name, time, isRunning, onClose, isReset }) => {
  const { hours, minutes, seconds } = time
  const duration = Number.parseInt(hours) * 3600 + Number.parseInt(minutes) * 60 + Number.parseInt(seconds)
  const [timeLeft, setTimeLeft] = useState<number>(duration)

  useEffect(() => {
    if (isReset) {
      setTimeLeft(Number.parseInt(hours) * 3600 + Number.parseInt(minutes) * 60 + Number.parseInt(seconds))
    }
  }, [isReset, hours, minutes, seconds, duration])

  useEffect(() => {
    if (!isRunning || timeLeft <= 0)
      return
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning, timeLeft])

  const remainingHours = Math.floor(timeLeft / 3600)
  const remainingMinutes = Math.floor((timeLeft % 3600) / 60)
  const remainingSeconds = timeLeft % 60

  return (
    <View className="relative flex flex-col gap-4 rounded-md bg-700 p-3">

      <Text className="text-center font-semibold text-lg">{name}</Text>

      <View className="handle group absolute left-1 top-1 flex items-center justify-center w-6 h-6 cursor-default">
        <Image
          src="https://assets.garmoth.com/icons/handle.svg"
          className="w-4 h-4 text-200 text-opacity-50 group-hover:text-opacity-100"
          alt="Handle"
        />
      </View>

      <View
        className="group absolute right-1 top-1 flex items-center justify-center w-6 h-6 cursor-pointer"
        onClick={onClose}
      >
        <Image
          src="https://assets.garmoth.com/icons/delete.svg"
          className="w-6 h-6 text-red-500 text-opacity-50 group-hover:text-opacity-100 transition-transform hover:scale-110"
          alt="删除"
        />
      </View>

      <View className="flex justify-center gap-1 font-semibold">
        <View className="opacity-25 flex items-center justify-center w-12 h-12 rounded-md bg-600 text-3xl">
          {String(remainingHours).padStart(2, '0')}
        </View>
        <Text className="flex items-center text-2xl opacity-50">:</Text>
        <View className="flex items-center justify-center w-12 h-12 rounded-md bg-600 text-3xl">
          {String(remainingMinutes).padStart(2, '0')}
        </View>
        <Text className="flex items-center text-2xl opacity-50">:</Text>
        <View className="flex items-center justify-center w-12 h-12 rounded-md bg-600 text-3xl">
          {String(remainingSeconds).padStart(2, '0')}
        </View>
      </View>

      <View className="relative mt-2 h-1 bg-800 rounded-md">
        <View
          className="h-1 rounded-md bg-red-500"
          style={{ width: `${(timeLeft / duration) * 100}%` }}
        />
      </View>
    </View>
  )
}

export default TimerDown
