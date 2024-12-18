import React, { useEffect, useState } from 'react'
import Taro, { useRouter } from '@tarojs/taro'
import { Image, ScrollView, Text, View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { formatNumber } from '@/utils/number'
import { API_BASE_URL, BASE_PA_IMAGE_URL } from '@/constants'
import Spinner from '@/components/Loading'

const GlobalDetail: React.FC = () => {
  const router = useRouter()
  const { id } = router.params || {}

  const [detailData, setDetailData] = useState<any>(null)
  const [globalDetailData, setGlobalDetailData] = useState<any>(null)
  const [dropsData, setDropsData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDrop, setSelectedDrop] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [detailRes, globalDetailRes, dropsRes] = await Promise.all([
          Taro.request({ url: `${API_BASE_URL}/grind-spots/${id}` }),
          Taro.request({ url: `${API_BASE_URL}/grind-spots-details` }),
          Taro.request({ url: `${API_BASE_URL}/loot/drops` }),
        ])
        setDetailData(detailRes.data)
        setGlobalDetailData(globalDetailRes.data)
        setDropsData(dropsRes.data)
      }
      catch (e) {
        setError(true)
      }
      finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return (
      <View className="flex items-center justify-center h-screen bg-gray-900">
        <View className="bg-red-900 p-6 rounded-lg flex items-center">
          <AtIcon value="alert-circle" size="16" color="#FCA5A5" />
          <Text className="text-lg text-red-300 ml-2">出错了，请稍后再试。</Text>
        </View>
      </View>
    )
  }

  const mapping: any = {}
  let allPrice = 0
  let contributors = 999

  if (globalDetailData && detailData) {
    const detailMapping: any = {}
    const dropsMapping: any = {}

    globalDetailData.forEach((item: any) => {
      detailMapping[item.id] = item
    })
    dropsData.forEach((item: any) => {
      dropsMapping[item.main_key] = item
    })

    if (detailMapping[detailData.id]) {
      const dropsArr: any[] = []
      const dropsDetailArr: any[] = []
      for (const key in detailMapping[detailData.id].drops) {
        const item = detailMapping[detailData.id].drops[key]
        const main_key = item.main_key
        const avg = item.avg
        const dropsItem = dropsMapping[main_key]
        dropsArr.push(dropsItem)
        dropsDetailArr.push(item)
        const price = dropsItem?.price || 0
        allPrice += Math.round(avg * price)
      }

      Object.assign(mapping, {
        grind_spot_name: detailData.lang,
        total_price: allPrice,
        hours: detailMapping[detailData.id].hours,
        avg_trash: detailMapping[detailData.id].avg_trash,
        ap: detailData.ap,
        dp: detailData.dp,
        dropsArr,
        dropsDetailArr,
      })

      contributors = detailData.contributors || 999
    }
  }

  const processedDropsDetail = mapping.dropsDetailArr?.map((drop: any, index: number) => {
    const result = Number(drop.per_trash * mapping.avg_trash)
    const overallPrice = Number(mapping.dropsArr?.[index].price) * result

    return {
      ...drop,
      trashNumber: result < 10 ? result.toFixed(2) : Math.round(result).toLocaleString(),
      overallPrice,
      barWidth: `${(overallPrice / mapping.total_price) * 100}%`,
    }
  })

  const averageDropsPerHour = mapping.dropsArr?.map((drop: any, index: number) => ({
    img: drop.img,
    lang: drop.lang,
    trashNumber: processedDropsDetail?.[index].trashNumber,
  }))

  Taro.setNavigationBarTitle({
    title: mapping.grind_spot_name,
  })

  return (
    <ScrollView className="pace-y-6 bg-gray-900 text-white" scrollX>
      <View className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg shadow-md">
        <AtIcon value="map-pin" size="16" color="#4B5563" />
        <Text className="text-2xl font-bold flex-grow">{mapping.grind_spot_name}</Text>
      </View>

      <View className="bg-gray-800 rounded-lg p-4 w-full">
        <View className="flex items-center mb-4">
          <AtIcon value="analytics" size="16" color="#4B5563" />
          <Text className="text-lg font-medium ml-2">统计信息</Text>
        </View>
        <View className="space-y-3">
          <View className="flex items-center justify-between border-b border-gray-700 pb-2">
            <Text className="text-gray-400">平均每小时银币收入</Text>
            <Text className="text-yellow-400 font-semibold">
              {formatNumber(mapping.total_price)}
              {' '}
              银币
            </Text>
          </View>
          <View className="flex items-center justify-between border-b border-gray-700 pb-2">
            <Text className="text-gray-400">总小时数</Text>
            <Text className="text-green-400">
              {Math.ceil(mapping.hours).toLocaleString()}
              {' '}
              小时
            </Text>
          </View>
          <View className="flex items-center justify-between border-b border-gray-700 pb-2">
            <Text className="text-gray-400">平均垃圾数量</Text>
            <Text className="text-gray-300">
              {Math.round(mapping.avg_trash).toLocaleString()}
            </Text>
          </View>
          <View className="flex items-center justify-between border-b border-gray-700 pb-2">
            <Text className="text-gray-400">贡献者</Text>
            <Text className="text-blue-400 font-semibold">
              {contributors.toLocaleString()}
            </Text>
          </View>
          <View className="flex items-center justify-between">
            <Text className="text-gray-400">推荐攻击力/防御力</Text>
            <Text className="text-red-400 font-semibold">
              {formatNumber(mapping.ap)}
              {' '}
              /
              {formatNumber(mapping.dp)}
            </Text>
          </View>
        </View>
      </View>

      <View className="bg-gray-800 rounded-lg p-4">
        <View className="flex items-center mb-4">
          <AtIcon value="gift" size="16" color="#4B5563" />
          <Text className="text-lg font-medium ml-2">每小时平均掉落</Text>
        </View>
        <ScrollView scrollX className="overflow-x-auto">
          <View className="flex space-x-4">
            {averageDropsPerHour?.map((drop: any, index: number) => (
              <View key={index} className="flex flex-col items-center">
                <Image
                  className="w-12 h-12 object-cover rounded"
                  src={BASE_PA_IMAGE_URL + drop.img}
                  alt={drop.lang || `Drop ${index + 1}`}
                />
                <Text className="mt-2 text-center text-sm">{drop.lang || `掉落物 ${index + 1}`}</Text>
                <Text className="mt-1 text-yellow-400">{drop.trashNumber}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <View className="bg-gray-800 rounded-lg p-4">
        <View className="flex items-center mb-4">
          <AtIcon value="coins" size="16" color="#4B5563" />
          <Text className="text-lg font-medium ml-2">每小时掉落收益</Text>
        </View>
        <ScrollView scrollX className="overflow-x-auto">
          <View>
            <View className="bg-gray-700 p-2 rounded">
              <View className="flex justify-between">
                <Text className="text-gray-300 font-semibold">物品</Text>
                <Text className="text-gray-300 font-semibold">银币/小时</Text>
              </View>
            </View>
            {mapping.dropsArr?.map((item: any, index: number) => (
              <View key={item.main_key} className="border-b border-gray-700 p-2">
                <View className="flex justify-between items-center">
                  <View className="flex items-center space-x-2">
                    <Image
                      className="w-8 h-8 rounded border-2 border-gray-500"
                      src={BASE_PA_IMAGE_URL + item.img}
                      alt={item.lang || `Item ${item.id}`}
                    />
                    <Text className="text-gray-200">{item.lang || `物品 ${item.id}`}</Text>
                  </View>
                  <Text className="text-yellow-400 font-semibold">
                    {formatNumber(processedDropsDetail?.[index].overallPrice).toLocaleString() || ' '}
                    {' '}
                    银币
                  </Text>
                </View>
                <View className="mt-2 bg-gray-600 rounded h-2">
                  <View
                    className="bg-blue-500 h-2 rounded"
                    style={{ width: processedDropsDetail?.[index].barWidth || '0%' }}
                  >
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

    </ScrollView>
  )
}

export default GlobalDetail
