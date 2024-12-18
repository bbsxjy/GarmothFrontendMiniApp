import React, { useEffect, useRef, useState } from 'react'
import { Button, Image, ScrollView, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { setBossData } from './features/BossTimerSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useFetchBossImageQuery, useFetchBossTimerDataQuery } from '@/api'
import type { RootState } from '@/store/store'
import './index.scss'
import { BASE_IMAGE_URL } from '@/constants'
import { Loading } from '@nutui/nutui-react-taro'
import Spinner from '@/components/Loading'

interface Boss {
  name: string
  color: string | null
  opacity: number
}

interface BossInfo {
  time: string | null
  bosses: Boss[]
}

interface BossTimerDataEntry {
  time: string
  Monday: Boss[]
  Tuesday: Boss[]
  Wednesday: Boss[]
  Thursday: Boss[]
  Friday: Boss[]
  Saturday: Boss[]
  Sunday: Boss[]
}

interface BossImage {
  name: string
  src: string
  alt?: string
}

function getBorderClass(color: string | null): string {
  switch (color) {
    case 'red':
      return 'border-red'
    case 'blue':
      return 'border-blue'
    case 'purple':
      return 'border-purple'
    case 'orange':
      return 'border-orange'
    case 'teal':
      return 'border-teal'
    case 'green':
      return 'border-green'
    default:
      return 'border-black'
  }
}

function getTextColorClass(color: string | null, isSelected: boolean): string {
  if (!isSelected)
    return 'text-white'
  switch (color) {
    case 'red':
      return 'text-red'
    case 'blue':
      return 'text-blue'
    case 'purple':
      return 'text-purple'
    case 'orange':
      return 'text-orange'
    case 'teal':
      return 'text-teal'
    case 'green':
      return 'text-green'
    default:
      return 'text-black'
  }
}

function getTimeLeft(bossTime: string): string {
  const [hour, minute] = bossTime.split(':').map(Number)
  const now = new Date()
  const bossDate = new Date(now)
  bossDate.setHours(hour, minute, 0, 0)
  if (bossDate < now) {
    bossDate.setDate(bossDate.getDate() + 1)
  }
  const diff = bossDate.getTime() - now.getTime()
  const hours = Math.floor(diff / 1000 / 60 / 60)
  const minutesLeft = Math.floor((diff / 1000 / 60) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return `${hours.toString().padStart(2, '0')}:${minutesLeft
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

function getTimeSince(bossTime: string): string {
  const [hour, minute] = bossTime.split(':').map(Number)
  const now = new Date()
  const bossDate = new Date(now)
  bossDate.setHours(hour, minute, 0, 0)
  if (bossDate > now) {
    bossDate.setDate(bossDate.getDate() - 1)
  }
  const diff = now.getTime() - bossDate.getTime()
  const hours = Math.floor(diff / 1000 / 60 / 60)
  const minutesLeft = Math.floor((diff / 1000 / 60) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return `${hours.toString().padStart(2, '0')}:${minutesLeft
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

function convertTo12HFormat(time24: string): string {
  const [hour, minute] = time24.split(':').map(Number)

  let period: string
  if (hour >= 0 && hour < 5) {
    period = '凌晨'
  }
  else if (hour >= 5 && hour < 12) {
    period = '早上'
  }
  else if (hour >= 12 && hour < 14) {
    period = '中午'
  }
  else if (hour >= 14 && hour < 18) {
    period = '下午'
  }
  else {
    period = '晚上'
  }

  const hour12 = hour % 12 || 12

  return `${period} ${hour12}:${minute.toString().padStart(2, '0')}`
}

function translateDayToChinese(day: string): string {
  const translationMap: { [key: string]: string } = {
    Monday: '周一',
    Tuesday: '周二',
    Wednesday: '周三',
    Thursday: '周四',
    Friday: '周五',
    Saturday: '周六',
    Sunday: '周日',
  }
  return translationMap[day] || day
}

const BossTimer: React.FC = () => {
  const dispatch = useAppDispatch()
  const { data, error, isLoading, refetch } = useFetchBossTimerDataQuery({})
  const { data: bossImagesData, error: bossImageError, isLoading: bossImageLoading }
    = useFetchBossImageQuery(undefined)

  const lastBoss: BossInfo = useAppSelector(
    (state: RootState) => state.bossTimer.lastBoss,
  )
  const nextBoss: BossInfo = useAppSelector(
    (state: RootState) => state.bossTimer.nextBoss,
  )
  const upcomingBoss: BossInfo = useAppSelector(
    (state: RootState) => state.bossTimer.upcomingBoss,
  )
  const bossData: BossTimerDataEntry[] = useAppSelector(
    (state: RootState) => state.bossTimer.bossData,
  )

  const [now, setNow] = useState<Date>(new Date())
  const [timeFormat, setTimeFormat] = useState<'12H' | '24H'>('24H')
  const [isToggleOn, setIsToggleOn] = useState<boolean>(true)
  const [selectedBosses, setSelectedBosses] = useState<Set<string>>(new Set())

  const notificationTimers = useRef<NodeJS.Timeout[]>([])

  const bossImageMap: Record<string, { src: string, alt: string }> = {}
  if (bossImagesData && Array.isArray(bossImagesData)) {
    bossImagesData.forEach((img: BossImage) => {
      bossImageMap[img.name] = { src: img.src, alt: img.alt || img.name }
    })
  }

  useEffect(() => {
    if (data) {
      dispatch(setBossData(data))
    }
  }, [data, dispatch])

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (nextBoss.time) {
      const [hour, minute] = nextBoss.time.split(':').map(Number)
      const bossDate = new Date()
      bossDate.setHours(hour, minute, 0, 0)

      const now = new Date()
      if (bossDate <= now) {
        refetch()
      }
    }
  }, [nextBoss.time, refetch])

  useEffect(() => {
    if (!isToggleOn)
      return

    selectedBosses.forEach((bossName) => {
      const nextSpawnTime = calculateNextSpawnTime(bossName)
      const timeUntilNextSpawn = nextSpawnTime - Date.now() - 5 * 60 * 1000 // 5 分钟前

      if (timeUntilNextSpawn > 0) {
        const timer = setTimeout(() => {
          Taro.showToast({
            title: `${bossName} 即将在5分钟后出现！`,
            icon: 'none',
            duration: 3000,
          })
        }, timeUntilNextSpawn)

        notificationTimers.current.push(timer)
      }
    })

    return () => {
      notificationTimers.current.forEach(timer => clearTimeout(timer))
      notificationTimers.current = []
    }
  }, [isToggleOn, selectedBosses, now])

  if (isLoading || bossImageLoading) {
    return (
      <Spinner />
    )
  }

  if (error || bossImageError) {
    return (
      <View className="flex items-center justify-center h-full">
        <Text>出错了，请稍后再试。</Text>
      </View>
    )
  }

  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]
  const dayIndex = now.getDay()
  const currentDay = daysOfWeek[dayIndex === 0 ? 6 : dayIndex - 1]

  const getBossImageUrl = (name: string): string => {
    return bossImageMap[name]?.src || `${BASE_IMAGE_URL}boss-timer/garmoth.png`
  }
  const getBossAlt = (name: string): string => {
    return bossImageMap[name]?.alt || name
  }

  const toggleBossSelection = (alt: string) => {
    setSelectedBosses((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(alt)) {
        newSet.delete(alt)
      }
      else {
        newSet.add(alt)
      }
      return newSet
    })
  }

  const isNextBossCell = (day: string, entryTime: string): boolean => {
    if (!nextBoss.time || nextBoss.bosses.length === 0)
      return false

    const [nextHour, nextMinute] = nextBoss.time.split(':').map(Number)
    const nextBossTime = new Date(now)
    nextBossTime.setHours(nextHour, nextMinute, 0, 0)

    if (nextBossTime < now) {
      nextBossTime.setDate(nextBossTime.getDate() + 1)
    }

    const [entryHour, entryMinute] = entryTime.split(':').map(Number)
    const entryBossTime = new Date(now)
    entryBossTime.setHours(entryHour, entryMinute, 0, 0)

    if (entryBossTime < now) {
      entryBossTime.setDate(entryBossTime.getDate() + 1)
    }

    const isSameTime = nextBossTime.getTime() === entryBossTime.getTime()

    const tomorrow = new Date(now)
    tomorrow.setDate(now.getDate() + 1)
    const isCorrectDay
      = (day === currentDay && nextBossTime.getDate() === now.getDate())
      || (day === daysOfWeek[tomorrow.getDay() === 0 ? 6 : tomorrow.getDay() - 1]
        && nextBossTime.getDate() === tomorrow.getDate())

    return isSameTime && isCorrectDay
  }

  const calculateNextSpawnTime = (bossName: string): number => {
    for (let i = 0; i < bossData.length; i++) {
      const entry = bossData[i]
      const bossesToday = entry[currentDay as keyof BossTimerDataEntry] as Boss[]

      if (bossesToday.some(boss => boss.name === bossName)) {
        const [hour, minute] = entry.time.split(':').map(Number)
        const spawnDate = new Date()
        spawnDate.setHours(hour, minute, 0, 0)

        if (spawnDate < now) {
          spawnDate.setDate(spawnDate.getDate() + 1)
        }

        return spawnDate.getTime()
      }
    }

    return Date.now() + 24 * 60 * 60 * 1000
  }

  const handleToggle = (value: boolean) => {
    setIsToggleOn(value)
  }

  const handleClickSetting = () => {
    if (isToggleOn) {
      if (selectedBosses.size === 0) {
        Taro.showToast({
          title: '请先设置要提醒的BOSS！',
          icon: 'none',
          duration: 2000,
        })
        return
      }
      Taro.showToast({
        title: '成功设置，请保持此页面常开以接收提醒！',
        icon: 'success',
        duration: 2000,
      })
    }
  }

  return (
    <View className="container-xl flex flex-col gap-3 px-1 text-sm m-auto">
      <View className="grid gap-3 lg:grid-cols-12">
        <View className="grid gap-3 rounded-md bg-700 px-3 py-6 lg:grid-cols-7 lg:col-span-9">
          <View className="flex justify-center opacity-50 lg:col-span-2">
            <View className="flex flex-col gap-2">
              <Text className="text-center text-lg font-bold">上一个Boss</Text>
              <View className="flex flex-wrap gap-3 justify-center">
                {lastBoss.bosses.map((boss, index) => (
                  <Image
                    key={index}
                    src={getBossImageUrl(boss.name)}
                    alt={boss.name}
                    className={`size-24 rounded-full bg-800 ${getBorderClass(boss.color)}`}
                  />
                ))}
              </View>
              <Text className="text-center text-4xl font-bold text-red">
                {lastBoss.time ? getTimeSince(lastBoss.time) : '-'}
              </Text>
              <View className="flex justify-center gap-1 text-base font-bold flex-wrap">
                {lastBoss.bosses.map((boss, index) => (
                  <Text key={index} className={getTextColorClass(boss.color, false)}>
                    【
                    {boss.name}
                    】
                  </Text>
                ))}
              </View>
            </View>
          </View>
          <View className="lg:col-span-3">
            <View className="flex flex-col gap-2">
              <Text className="text-center text-lg font-bold">下一个Boss</Text>
              <View className="flex flex-wrap gap-3 justify-center">
                {nextBoss.bosses.map((boss, index) => (
                  <Image
                    key={index}
                    src={getBossImageUrl(boss.name)}
                    alt={boss.name}
                    className={`size-32 rounded-full bg-800 ${getBorderClass(boss.color)}`}
                  />
                ))}
              </View>
              <Text className="text-center text-5xl font-bold text-green">
                {nextBoss.time ? getTimeLeft(nextBoss.time) : '-'}
              </Text>
              <View className="flex justify-center gap-1 text-base font-bold flex-wrap">
                {nextBoss.bosses.map((boss, index) => (
                  <Text
                    key={index}
                    className={getTextColorClass(
                      boss.color,
                      selectedBosses.has(getBossAlt(boss.name)),
                    )}
                  >
                    【
                    {boss.name}
                    】
                  </Text>
                ))}
              </View>
            </View>
          </View>
          <View className="flex justify-center lg:col-span-2">
            <View className="flex flex-col gap-2">
              <Text className="text-center text-lg font-bold">接下来是</Text>
              <View className="flex flex-wrap gap-3 justify-center">
                {upcomingBoss.bosses.map((boss, index) => (
                  <Image
                    key={index}
                    src={getBossImageUrl(boss.name)}
                    alt={boss.name}
                    className={`size-24 rounded-full bg-800 ${getBorderClass(boss.color)}`}
                  />
                ))}
              </View>
              <Text className="text-center text-4xl font-bold">
                {upcomingBoss.time ? getTimeLeft(upcomingBoss.time) : '-'}
              </Text>
              <View className="flex justify-center gap-1 text-base font-bold flex-wrap ">
                {upcomingBoss.bosses.map((boss, index) => (
                  <Text
                    key={index}
                    className={getTextColorClass(
                      boss.color,
                      selectedBosses.has(getBossAlt(boss.name)),
                    )}
                  >
                    【
                    {boss.name}
                    】
                  </Text>
                ))}
              </View>
            </View>
          </View>
        </View>

        <View className="flex flex-col gap-3 rounded-md bg-700 p-3  overflow-x-auto  ">
          <View className="flex items-center justify-between gap-3">
            <Text className="text-lg font-semibold">提醒设置</Text>
            <View className="flex">
              <View
                className={`dcc w-10 cursor-pointer select-none rounded-l-md border font-semibold ${isToggleOn
                  ? 'border-green bg-green bg-opacity-80'
                  : 'border-500 bg-500/80'
                }`}
                onClick={() => handleToggle(true)}
              >
                <Text>开</Text>
              </View>
              <View
                className={`dcc h-8 w-10 cursor-pointer select-none rounded-r-md border font-semibold ${!isToggleOn
                  ? 'border-green bg-green bg-opacity-80'
                  : 'border-500 bg-500/80'
                }`}
                onClick={() => handleToggle(false)}
              >
                <Text>关</Text>
              </View>
            </View>
          </View>
          <View
            className={`grid grid-cols-4 gap-3 ${!isToggleOn ? 'pointer-events-none opacity-50' : ''
            }`}
          >
            {bossImagesData
            && bossImagesData.map((img: BossImage, index: number) => {
              const alt = img.alt || img.name
              const isSelected = selectedBosses.has(alt)
              return (
                <View
                  key={index}
                  className={`cursor-pointer overflow-hidden rounded-full h-20 w-20 border-2 ${isSelected
                    ? 'outline-2 outline outline-green hover:border-green'
                    : 'border-500 hover:border-400'
                  } bg-800 opacity-75 ${!isToggleOn ? 'grayscale' : ''}`}
                  onClick={() => toggleBossSelection(alt)}
                >
                  <Image
                    src={img.src}
                    alt={alt}
                    className="w-full h-full object-cover rounded-full"
                  />
                </View>
              )
            })}
          </View>
          <View
            className="bg-600 border-500 hover:border-400 w-full px-2 h-10 relative overflow-hidden font-normal py-0 border rounded-md transition hover:brightness-125"
            onClick={() => handleClickSetting()}
          >
            <Text>设置</Text>
          </View>
        </View>
      </View>

      <ScrollView className="min-w-full border-collapse">
        <View className="flex">
          <View className="px-2 py-1 text-left">
            <View className="flex gap-1">
              <View
                className={`w-16 px-0  relative font-normal py-2 border rounded-md transition ${timeFormat === '12H'
                  ? 'border-green bg-green bg-opacity-80'
                  : 'bg-600 border-500 hover:border-400'
                }`}
                onClick={() => setTimeFormat('12H')}
              >
                <Text>12小时制</Text>
              </View>
              <View
                className={`w-16 px-0  relative font-normal py-2 border rounded-md transition ${timeFormat === '24H'
                  ? 'border-green bg-green bg-opacity-80'
                  : 'bg-600 border-500 hover:border-400'
                }`}
                onClick={() => setTimeFormat('24H')}
              >
                <Text>24小时制</Text>
              </View>
            </View>
          </View>
          {daysOfWeek.map(day => (
            <View key={day} className="px-2 py-1 text-sm text-center">
              {translateDayToChinese(day)}
            </View>
          ))}
        </View>
        <View className="bg-600">
          {bossData.map((entry, rowIndex) => {
            return (
              <View
                key={rowIndex}
                className={`${rowIndex % 2 === 0 ? 'bg-700/50' : ''
                } text-center flex`}
              >
                <View className="w-14 h-14 text-sm px-2 py-1">
                  {timeFormat === '24H' ? entry.time : convertTo12HFormat(entry.time)}
                </View>
                {daysOfWeek.map((day) => {
                  const isHighlight = isNextBossCell(day, entry.time)
                  const bosses = (entry[day as keyof BossTimerDataEntry] as Boss[]) || []
                  return (
                    <View
                      key={day}
                      className={`px-2 py-1 ${isHighlight ? 'border-2 border-green bg-green/10' : ''
                      }`}
                    >
                      <View className="flex flex-wrap justify-center gap-1 font-normal flex-col">
                        {bosses.map((boss, bossIndex) => (
                          <Text
                            key={bossIndex}
                            className={getTextColorClass(
                              boss.color,
                              selectedBosses.has(getBossAlt(boss.name)),
                            )}
                          >
                            {boss.name}
                          </Text>
                        ))}
                      </View>
                    </View>
                  )
                })}
              </View>
            )
          })}
        </View>
      </ScrollView>
      {/* </Layout> */}
    </View>
  )
}

export default BossTimer
