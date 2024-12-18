import React, { useEffect, useState } from 'react'
import { Button, Image, Input, ScrollView, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import TimerModal from './components/TimerModal'
import TimerDown from './components/TimerDown'
import PlayIcon from '@/assets/play.png'
import PauseIcon from '@/assets/pasue.png'
import ResetIcon from '@/assets/reset.png'
import AddIcon from '@/assets/add.png'

interface Timer {
  name: string
  time: { hours: number, minutes: number, seconds: number }
  originalTime: { hours: number, minutes: number, seconds: number }
  isRunning: boolean
}

function loadTimersFromStorage(): Timer[] {
  const savedTimers = Taro.getStorageSync('timers')
  return savedTimers ? JSON.parse(savedTimers) : []
}

const GrindTimer: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [timers, setTimers] = useState<Timer[]>(loadTimersFromStorage())

  // 初始化定时器状态
  useEffect(() => {
    setTimers(prevTimers =>
      prevTimers.map(timer => ({
        ...timer,
        isRunning: false,
        // 可以根据需要添加 timeLeft 或其他字段
      })),
    )
  }, [])

  // 保存定时器到存储
  useEffect(() => {
    Taro.setStorageSync('timers', JSON.stringify(timers))
  }, [timers])

  // 添加新定时器
  const handleAddTimer = (newTimer: Timer) => {
    if (isRunning) {
      newTimer.isRunning = true
    }
    setTimers([...timers, newTimer])
  }

  // 启动所有定时器
  const startAllTimers = () => {
    setIsRunning(true)
    setTimers(prevTimers =>
      prevTimers.map(timer => ({ ...timer, isRunning: true })),
    )
  }

  // 暂停所有定时器
  const pauseAllTimers = () => {
    setIsRunning(false)
    setTimers(prevTimers =>
      prevTimers.map(timer => ({ ...timer, isRunning: false })),
    )
  }

  // 重置所有定时器
  const resetAllTimers = () => {
    setTimers(prevTimers =>
      prevTimers.map(timer => ({
        ...timer,
        isRunning: false,
        time: { ...timer.originalTime },
      })),
    )
  }

  // 移除定时器
  const handleRemoveTimerDown = (index: number) => {
    setTimers((prevTimers) => {
      const newTimers = [...prevTimers]
      newTimers.splice(index, 1)
      return newTimers
    })
  }

  // 计时器逻辑
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning) {
      const startTime = Date.now()

      interval = setInterval(() => {
        const elapsed = Date.now() - startTime
        const newSeconds = Math.floor(elapsed / 1000)
        const newMilliseconds = elapsed % 1000

        const newHours = Math.floor(newSeconds / 3600)
        const newMinutes = Math.floor((newSeconds % 3600) / 60)
        const updatedSeconds = newSeconds % 60

        setTime({
          hours: newHours,
          minutes: newMinutes,
          seconds: updatedSeconds,
          milliseconds: newMilliseconds,
        })
      }, 100)
    }

    return () => {
      if (interval)
        clearInterval(interval)
    }
  }, [isRunning])

  // 启动计时器
  const startTimer = () => {
    startAllTimers()
    setIsRunning(true)
  }

  // 暂停计时器
  const pauseTimer = () => {
    pauseAllTimers()
    setIsRunning(false)
  }

  // 重置计时器
  const resetTimer = () => {
    resetAllTimers()
    setTime({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })
    setIsRunning(false)
  }

  return (
    <View className="p-3 flex flex-col gap-10 text-center">
      {/* 标题和控制按钮 */}
      <View className="flex justify-between items-center">
        <Text className="text-2xl">狩猎计时器</Text>
        <View className="flex gap-3">
          {/* 启动按钮 */}
          <Button
            className="border-blue bg-blue bg-opacity-80 w-10 h-10 rounded-md border hover:brightness-125 flex items-center justify-center"
            onClick={isRunning ? pauseTimer : startTimer}
          >
            {isRunning
              ? (
                  <Image
                    src={PauseIcon}
                    className="w-5 h-5"
                    alt="Pause"
                  />
                )
              : (
                  <Image
                    src={PlayIcon}
                    className="w-5 h-5"
                    alt="Play"
                  />
                )}
          </Button>
          {/* 重置按钮 */}
          <Button
            className="border-green bg-green bg-opacity-80 w-10 h-10 rounded-md border hover:brightness-125 flex items-center justify-center"
            onClick={resetTimer}
          >
            <Image
              src={ResetIcon}
              className="w-5 h-5"
              alt="Reset"
            />
          </Button>
          {/* 打开添加定时器模态框按钮 */}
          <Button
            className="border-green bg-green bg-opacity-80 w-10 h-10 rounded-md border hover:brightness-125 flex items-center justify-center"
            onClick={() => setIsModalOpen(true)}
          >
            <Image
              src={AddIcon}
              className="w-5 h-5"
              alt="Add Timer"
            />
          </Button>
        </View>
      </View>

      {/* 显示当前计时 */}
      <View className="flex justify-center gap-3">
        <View className="w-24">
          <Text className="text-6xl">{String(time.hours).padStart(2, '0')}</Text>
          <Text className="text-300">小时</Text>
        </View>
        <View className="w-24">
          <Text className="text-6xl">{String(time.minutes).padStart(2, '0')}</Text>
          <Text className="text-300">分钟</Text>
        </View>
        <View className="w-24">
          <Text className="text-6xl">{String(time.seconds).padStart(2, '0')}</Text>
          <Text className="text-300">秒</Text>
        </View>
        <View className="flex items-end">
          <View className="w-24 opacity-50">
            <Text className="text-4xl">{String(time.milliseconds).padStart(3, '0')}</Text>
            <Text className="text-300">毫秒</Text>
          </View>
        </View>
      </View>

      {/* 控制按钮 */}
      <View className="flex justify-center">
        <View className="grid grid-cols-3 gap-3">
          <View className="flex items-center justify-center" />
          <View
            onClick={isRunning ? pauseTimer : startTimer}
            className={`'
            } w-16 h-16`}
          >
            {isRunning
              ? (
                  <Image
                    src={PauseIcon}
                    className="w-8 h-8"
                    alt="Pause"
                  />
                )
              : (
                  <Image
                    src={PlayIcon}
                    className="w-8 h-8"
                    alt="Play"
                  />
                )}
          </View>
          <View
            onClick={resetTimer}
            className=""
          >
            <Image
              src="https://assets.garmoth.com/icons/reset.svg" // 重置图标
              className="w-8 h-8"
              alt="Reset"
            />
          </View>
        </View>
      </View>

      {/* 打开模态框按钮 */}
      <View className="group relative flex items-center justify-center">
        <View
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer rounded-md bg-700 p-3 opacity-50 transition-all hover:opacity-100"
        >
          <Image
            src="https://assets.garmoth.com/icons/add.svg" // 添加图标
            className="w-9 h-9 text-300 group-hover:text-green-500"
            alt="Add Timer"
          />
        </View>
      </View>

      {/* 定时器列表 */}
      <View className="mt-8">
        <ScrollView scrollY className="grid grid-cols-2 gap-4">
          {timers.map((timer: Timer, index: number) => (
            <TimerDown
              key={index}
              name={timer.name}
              time={timer.time}
              isRunning={timer.isRunning}
              onClose={() => handleRemoveTimerDown(index)}
            />
          ))}
        </ScrollView>
      </View>

      {/* 添加定时器模态框 */}
      <TimerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTimer}
      />
    </View>
  )
}

export default GrindTimer
