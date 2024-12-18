import React, { useEffect, useState } from 'react'
import { Image, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useGetGuidesQuery } from '@/api'
import Spinner from '@/components/Loading'

function RecentGuides() {
  const { data, error, isLoading } = useGetGuidesQuery({})
  const [filteredGuides, setFilteredGuides] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (data) {
      setFilteredGuides(data)
    }
  }, [data])

  const handleSearch = (e) => {
    const term = e.detail.value
    setSearchTerm(term)
    if (term) {
      const filtered = data.filter(guide =>
        guide.title.toLowerCase().includes(term.toLowerCase())
        || guide.desc.toLowerCase().includes(term.toLowerCase()),
      )
      setFilteredGuides(filtered)
    }
    else {
      setFilteredGuides(data)
    }
  }

  const navigateToGuide = (title) => {
    Taro.navigateTo({
      url: `/pages/post/guide-post?title=${encodeURIComponent(title)}`,
    })
  }

  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    return <Text>发生错误，请稍后重试。</Text>
  }

  return (
    <View className="guides-container">
      <Text className="my-0 text-2xl">攻略</Text>
      <View className="grid grid-cols-2 gap-2 text-sm lg:grid-cols-3 lg:gap-3 lg:p-0">
        <View>
          {filteredGuides.map(guide => guide.listing && (
            <View
              key={guide.id}
              className="relative h-32 w-full rounded-t-md mt-2 cursor-pointer"
              onClick={() => navigateToGuide(guide.title)}
            >
              <View className="absolute left-0 top-0 flex items-center gap-1 rounded-br-md rounded-tl-md bg-green bg-opacity-90 px-2 py-[1px] text-sm font-bold text-white">NEW</View>
              <Image src={guide.img} alt={guide.title} className="h-full object-cover rounded-t-md" />
              <View className="flex flex-col gap-1 p-2">
                <Text className="flex items-center gap-1 text-sm font-semibold lg:text-base">{guide.title}</Text>
                <Text className="my-1 text-xs text-300 lg:text-sm">{guide.desc}</Text>
                <View className="flex justify-between">
                  <View className="flex items-end gap-2 text-200">
                    <View className="flex items-center gap-1">
                      <Text>{guide.views}</Text>
                    </View>
                    <View className="text-400">|</View>
                    <View className="flex items-center gap-1 hover:text-white">
                      <Text>{guide.likes}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

export default RecentGuides
