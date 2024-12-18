import { useEffect, useState } from 'react'
import { Image, Navigator, Picker, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import FilterSlider from './components/FilterSlider'
import { useGetBestSpotDataQuery } from '@/api/grind-tracker/api'
import './index.scss'
import { Loading } from '@nutui/icons-react-taro'
import Spinner from '@/components/Loading'

interface BestSpot {
  href: string
  className: string
  mainImage: {
    src: string
    loading: string
    lazy: string
    alt: string
    className: string
  }
  title: string
  lang: string
  AP: string
  DP: string
  secondaryImages: Array<{
    src: string
    loading: string
    lazy: string
    alt: string
    className: string
  }>
  price: string
  rating: number
}

const BestGrindSpots: React.FC = () => {
  const { data, error, isLoading } = useGetBestSpotDataQuery({})
  const [filteredData, setFilteredData] = useState<BestSpot[]>([])
  const [sortOption, setSortOption] = useState<string>('default')
  const [minAP, setMinAP] = useState<number>(100)
  const [maxAP, setMaxAP] = useState<number>(320)
  const [minDP, setMinDP] = useState<number>(160)
  const [maxDP, setMaxDP] = useState<number>(420)
  const [currentAP, setCurrentAP] = useState<number>(260)
  const [currentDP, setCurrentDP] = useState<number>(360)

  const parseAP = (ap: string) => Number.parseInt(ap.replace('AP', ''), 10) || 100
  const parseDP = (dp: string) => Number.parseInt(dp.replace('DP', ''), 10) || 160

  useEffect(() => {
    if (data && data.length > 0) {
      const apValues = data.map((item: BestSpot) => parseAP(item.AP))
      const dpValues = data.map((item: BestSpot) => parseDP(item.DP))
      const calculatedMinAP = Math.min(...apValues, 100)
      const calculatedMaxAP = Math.max(...apValues, calculatedMinAP + 100)
      const calculatedMinDP = Math.min(...dpValues, 160)
      const calculatedMaxDP = Math.max(...dpValues, calculatedMinDP + 100)
      setMinAP(calculatedMinAP)
      setMaxAP(calculatedMaxAP)
      setCurrentAP(300)
      setMinDP(calculatedMinDP)
      setMaxDP(calculatedMaxDP)
      setCurrentDP(400)
    }
  }, [data])

  const sortOptionsList = [
    { label: '默认排序', value: 'default' },
    { label: '攻击力从高到低', value: 'AP_desc' },
    { label: '攻击力从低到高', value: 'AP_asc' },
    { label: '防御力从高到低', value: 'DP_desc' },
    { label: '防御力从低到高', value: 'DP_asc' },
  ]
  const sortOptionsLabels = sortOptionsList.map(option => option.label)
  const handleSortChange = (e: any) => {
    setSortOption(e)
  }

  const handleAPChange = (value: number) => {
    setCurrentAP(value)
  }

  const handleDPChange = (value: number) => {
    setCurrentDP(value)
  }

  const parsePrice = (price: string): number => {
    const [value, unit] = price.split(' ')
    let multiplier = 1
    if (unit === 'K')
      multiplier = 1e3
    if (unit === 'M')
      multiplier = 1e6
    if (unit === 'B')
      multiplier = 1e9
    return Number.parseFloat(value) * multiplier
  }

  useEffect(() => {
    if (data) {
      let tempData = [...data]
      tempData = tempData.filter((item) => {
        const ap = parseAP(item.AP)
        const dp = parseDP(item.DP)
        return ap <= currentAP && dp <= currentDP
      })

      switch (sortOption) {
        case 'AP_asc':
          tempData.sort((a, b) => parseAP(a.AP) - parseAP(b.AP))
          break
        case 'AP_desc':
          tempData.sort((a, b) => parseAP(b.AP) - parseAP(a.AP))
          break
        case 'DP_asc':
          tempData.sort((a, b) => parseDP(a.DP) - parseDP(b.DP))
          break
        case 'DP_desc':
          tempData.sort((a, b) => parseDP(b.DP) - parseDP(a.DP))
          break
        default:
          break
      }

      setFilteredData(tempData)
    }
  }, [data, sortOption, currentAP, currentDP])

  if (isLoading) {
    return (
      <Spinner />
    )
  }

  if (error) {
    return (
      <View className="h-full grow flex items-center justify-center">
        <Text>发生错误，请稍后重试。</Text>
      </View>
    )
  }

  return (
    <View className="container-max-height">
      <View className="block h-full transition">
        <View className="h-full grow overflow-y-auto px-2 py-1 pb-2">
          <View className="container-xl">
            <View className="relative w-full">
              <View className="sticky top-0 flex flex-col w-full  gap-3 rounded-md">
                <View className="rounded-md border border-600 bg-700 p-2">
                  <Text className="mb-0.5">排序方式</Text>
                  <Picker
                    mode="selector"
                    range={sortOptionsLabels}
                    onChange={(e) => {
                      const selectedIndex = e.detail.value
                      const selectedOption = sortOptionsList[selectedIndex]
                      handleSortChange(selectedOption.value)
                    }}
                  >
                    <View className="focus:outline-accent w-full h-10 bg-700 border border-500 hover:border-400 rounded-md px-3 transition flex items-center">
                      <Text>
                        {sortOptionsList.find(option => option.value === sortOption)?.label || '请选择'}
                      </Text>
                    </View>
                  </Picker>
                </View>
                <View className="rounded-md border border-600 bg-700 p-2">
                  <View className="grid grid-cols-2 gap-3">
                    <FilterSlider
                      label="攻击力"
                      value={currentAP}
                      onChange={handleAPChange}
                      min={minAP}
                      max={maxAP}
                    />
                    <FilterSlider
                      label="防御力"
                      value={currentDP}
                      onChange={handleDPChange}
                      min={minDP}
                      max={maxDP}
                    />
                  </View>

                </View>
              </View>
            </View>
            <View className="h-full grow overflow-y-auto px-2 py-1 pb-2">
              <View className="flex gap-3 flex-col">
                <View className="grow">
                  <View className="flex flex-col gap-2">
                    {filteredData && filteredData.length > 0
                      ? (
                          filteredData.map((item: BestSpot) => (
                            <Navigator
                              key={item.href}
                              url={item.href}
                              openType="navigate"
                              className={item.className}
                            >
                              <View className="flex items-center gap-2 flex-wrap">
                                <Image
                                  src={item.mainImage.src}
                                  alt={item.mainImage.alt || item.title}
                                  className={item.mainImage.className}
                                  lazy-load
                                />
                                <View>
                                  <Text className="cut-text text-sm font-medium">{item.title}</Text>
                                  <View className="number flex gap-1 text-200">
                                    <Text>{item.AP}</Text>
                                    <Text>{item.DP}</Text>
                                  </View>
                                </View>
                              </View>
                              <View className="flex gap-2 flex-wrap">
                                {item.secondaryImages
                                && item.secondaryImages.map((img: any, idx: number) => (
                                  <Image
                                    key={idx}
                                    src={img.src}
                                    alt={img.alt || ''}
                                    className={img.className}
                                    lazy-load
                                  />
                                ))}
                              </View>
                              <View className="flex grow items-end justify-end gap-3">
                                <View className="flex flex-col items-end justify-end">
                                  <Text className="text-lg font-bold">{item.price}</Text>
                                  <View className="relative flex h-5 scale-x-[-1]">
                                    {[...Array(item.rating)].map((_, i) => (
                                      <View key={i}>
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          aria-hidden="true"
                                          role="img"
                                          className="icon stroke text-100"
                                          width="1em"
                                          height="1em"
                                          viewBox="0 0 576 512"
                                          fill="currentColor"
                                        >
                                          <path d="M316.9 18c-5.3-11-16.5-18-28.8-18s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3L288.2 440.5 416.5 509c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329l104.2-103.1c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L380.9 150.3 316.9 18z" />
                                        </svg>
                                      </View>
                                    ))}
                                  </View>
                                </View>
                              </View>
                            </Navigator>
                          ))
                        )
                      : (
                          <Text>无数据</Text>
                        )}
                  </View>
                </View>

              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default BestGrindSpots
