import { useEffect, useState } from 'react'
import { Image, ScrollView, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtIcon } from 'taro-ui'
import {
  useGetAllLootDropsQuery,
  useGetGlobalDataQuery,
  useGetGrindSpotsDetailQuery,
} from '@/api/grind-tracker/api'
import Spinner from '@/components/Loading'

function Global() {
  const { data: globalData, error: globalError, isLoading: globalLoading } = useGetGlobalDataQuery({})
  const {
    data: globalDetailData,
    error: globalDetailError,
    isLoading: globalDetailLoading,
  } = useGetGrindSpotsDetailQuery({})
  const { data: dropsData, error: dropsError, isLoading: dropsIsLoading } = useGetAllLootDropsQuery({})

  const handleDetailNavigate = (id: string) => {
    Taro.navigateTo({
      url: `/pages/grind-tracker/global/globalDetail?id=${id}`,
    })
  }

  const [selectedEntry, setSelectedEntry] = useState<any>(null)
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [timeRange, setTimeRange] = useState<{ time1: number, time2: number } | null>(null)

  const dropsMapping: Record<string, any> = {}
  const detailMapping: Record<string, any> = {}
  const priceMapping: Record<string, any> = {}

  useEffect(() => {
    if (dropsData) {
      dropsData.forEach((item: any) => {
        dropsMapping[item.main_key] = item
      })
    }
  }, [dropsData])

  useEffect(() => {
    if (globalDetailData) {
      globalDetailData.forEach((item: any) => {
        detailMapping[item._id] = item
      })
    }
  }, [globalDetailData])

  useEffect(() => {
    if (!globalData) {
      setFilteredData([])
      return
    }
    let minTime: number | null = null
    let maxTime: number | null = null
    const data = globalData
      .filter(
        (entry: any) =>
          entry.lang !== null
          && !entry.lang.includes('艾尔比亚')
          && !entry.lang.includes('代基亚的灯火')
          && entry.zone !== 'snowmountain',
      )
      .sort((a: any, b: any) => b.ap - a.ap)

    data.forEach((entry: any) => {
      const entryTime = new Date(entry.created_at).getTime()
      if (minTime === null || entryTime < minTime)
        minTime = entryTime
      if (maxTime === null || entryTime > maxTime)
        maxTime = entryTime

      const detailData = detailMapping[entry._id]
      if (detailData) {
        let allPrice = 0
        for (const item of detailData.drops) {
          const dropsItem = dropsMapping[item.main_key]
          if (dropsItem) {
            const price = dropsItem.price || 0
            allPrice += item.avg * price
          }
        }
        priceMapping[entry._id] = {
          total_price: allPrice,
          hours: detailData.hours,
          avg_trash: detailData.avg_trash,
        }
      }
    })
    setFilteredData(data)
    if (minTime !== null && maxTime !== null) {
      setTimeRange({ time1: minTime, time2: maxTime })
    }
  }, [globalData, detailMapping, dropsMapping])

  const timestampToTime = (timestamp: number) => {
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = `0${date.getMonth() + 1}`.slice(-2)
    const day = `0${date.getDate()}`.slice(-2)
    return `${year}年${month}月${day}日`
  }

  const getHourClassName = (hours: number) => {
    if (hours > 500)
      return 'text-green-400 font-bold'
    if (hours >= 100)
      return 'text-yellow-400 font-semibold'
    return 'text-red-400'
  }

  const apiCallLoading = globalLoading || dropsIsLoading || globalDetailLoading
  const apiCallError = globalError || dropsError || globalDetailError

  return (
    <View className="p-4 min-h-screen bg-gray-900 text-gray-300">
      {timeRange && (
        <View className="mb-6 bg-gray-800 rounded-lg p-4 shadow-md flex flex-row items-center">
          <View className="flex-grow">
            <Text className="text-3xl font-bold text-white mb-2">全球狩猎数据</Text>
            <View className="flex items-center">
              <AtIcon value="clock" size="16" color="#4B5563" />
              <Text className="text-sm text-gray-400 ml-2">
                数据范围：
                {timestampToTime(timeRange.time1)}
                {' '}
                -
                {' '}
                {timestampToTime(timeRange.time2)}
              </Text>
            </View>
          </View>
        </View>
      )}

      {apiCallLoading && <Spinner />}

      {apiCallError && (
        <View className="flex items-center justify-center h-20 bg-red-900 rounded-lg">
          <AtIcon value="alert-circle" size="24" color="#FCA5A5" />
          <Text className="text-lg text-red-300 ml-2">出错了，请稍后再试。</Text>
        </View>
      )}

      {!apiCallLoading && !apiCallError && (
        <ScrollView scrollX className="w-full">
          <View className="min-w-[800px] w-full">
            <View className="flex bg-gray-800 text-sm text-gray-200 mb-2 py-2 px-1 rounded-t-lg">
              <View className="w-12 text-center">图标</View>
              <View className="w-16 text-center">类型</View>
              <View className="flex-1 text-left">名称</View>
              <View className="w-32 text-right">攻击力范围</View>
              <View className="w-20 text-right">小时</View>
              <View className="w-24 text-right">垃圾/小时</View>
              <View className="w-24 text-right">银币/小时</View>
            </View>

            <View>
              {filteredData && filteredData.length > 0
                ? (
                    filteredData.map((entry: any, index: number) => (
                      <View
                        key={index}
                        className={`flex items-center cursor-pointer py-2 px-1
                          ${index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-600'}
                          hover:bg-gray-500`}
                        onClick={() => handleDetailNavigate(entry._id)}
                      >
                        <View className="w-12 flex items-center justify-center">
                          <Image
                            src={`https://assets.garmoth.com/img/new_icon/03_etc/04_dropitem/000${entry.icon}.webp`}
                            className="w-8 h-8 rounded-full"
                            alt="Item"
                          />
                        </View>

                        <View className="w-16 flex items-center justify-center">
                          <Image
                            src={`https://assets.garmoth.com/icons/mob-types/${entry.mob_type}.png`}
                            className="w-6 h-6 rounded-full"
                            alt="Mob Type"
                          />
                        </View>
                        <View className="flex-1 flex flex-col">
                          <Text className="text-white text-sm font-medium truncate">
                            {entry.locationName}
                          </Text>
                          <Text className="text-xs text-gray-400 truncate">
                            {entry.lang}
                          </Text>
                        </View>
                        <View className="w-32 text-right">
                          <Text className="text-gray-300 text-sm">
                            {entry.ap}
                            {' '}
                            ~
                            {entry.dp}
                          </Text>
                        </View>
                        <View className="w-20 text-right">
                          <Text
                            className={`text-sm truncate ${priceMapping[entry._id]
                              ? getHourClassName(Math.ceil(priceMapping[entry._id].hours))
                              : ''
                            }`}
                          >
                            {priceMapping[entry._id]
                            && Math.ceil(priceMapping[entry._id].hours).toLocaleString()}
                          </Text>
                        </View>
                        <View className="w-24 text-right">
                          <Text className="text-gray-300 text-sm opacity-80">
                            {priceMapping[entry._id]
                            && Math.round(priceMapping[entry._id].avg_trash).toLocaleString()}
                          </Text>
                        </View>
                        <View className="w-24 text-right">
                          <Text className="text-gray-300 text-sm font-semibold text-yellow-300">
                            {priceMapping[entry._id]
                            && Math.ceil(priceMapping[entry._id].total_price).toLocaleString()}
                          </Text>
                        </View>
                      </View>
                    ))
                  )
                : (
                    <View className="p-4 flex flex-col items-center">
                      <AtIcon value="list" size="48" color="#4B5563" />
                      <Text className="text-center text-gray-400 mt-2">暂无数据可显示。</Text>
                    </View>
                  )}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  )
}

export default Global
