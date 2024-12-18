import React, { useEffect, useState } from 'react'
import { Button, Image, RichText, Text, View } from '@tarojs/components'
import Taro, { usePageScroll } from '@tarojs/taro'
import { AtIcon } from 'taro-ui'
import { BackTop } from '@nutui/nutui-react-taro'
import { useGetGuidesByTitleQuery, useUpdateGuideViewCountMutation } from '@/api'
import Spinner from '@/components/Loading'

const GuideDetails: React.FC<{ title: string }> = ({ title }) => {
  const { data, error, isLoading } = useGetGuidesByTitleQuery(title)
  const [updateGuideViewCount] = useUpdateGuideViewCountMutation()
  const [headers, setHeaders] = useState<{ id: string, text: string, level: number }[]>([])

  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    if (data) {
      updateGuideViewCount({ id: data._id })
    }
  }, [data, updateGuideViewCount])

  useEffect(() => {
    if (data && data.text) {
      const regex = /<h([1-6])[^>]*>(.*?)<\/h\1>/g
      let match: RegExpExecArray | null
      const headersData = []
      let index = 0
      while ((match = regex.exec(data.text)) !== null) {
        const level = Number.parseInt(match[1], 10)
        const text = match[2].replace(/<[^>]+>/g, '').trim()
        const id = `header-${index}-${text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '')}`
        headersData.push({ id, text, level })
        index += 1
      }
      setHeaders(headersData)
    }
  }, [data])

  usePageScroll(({ scrollTop }) => {
    if (scrollTop > 300) {
      setShowScrollTop(true)
    }
    else {
      setShowScrollTop(false)
    }
  })

  const scrollToTop = () => {
    Taro.pageScrollTo({ scrollTop: 0, duration: 300 })
  }

  const guideData = data || {}

  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    return <Text className="text-center text-red-500">发生错误，请稍后重试。</Text>
  }

  Taro.setNavigationBarTitle({ title: data?.title })

  return (
    <View className="mx-auto px-2 flex flex-col lg:flex-row gap-8 overflow-x-auto relative">
      <View className="flex-1 rounded-lg shadow-lg p-6">
        <View className="mb-6 border-b border-gray-700 pb-4">
          <Text className="text-2xl lg:text-4xl font-bold text-white">{guideData.title}</Text>
          <View></View>
          <Text className="mt-2 text-lg text-gray-300">{guideData.desc}</Text>
        </View>

        <View className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
          <View className="flex items-center space-x-3">
            <Image src={guideData.avatar} className="w-12 h-12 rounded-full" />
            <Text className="text-gray-200">
              By
              {guideData.name}
            </Text>
          </View>
          <View className="flex items-center space-x-4 mt-4 lg:mt-0">
            <View className="flex items-center space-x-1 text-gray-400">
              <AtIcon value="calendar" size="16" color="#fff" />
              <Text className="text-sm">
                发布于:
                {' '}
                {new Date(guideData.published_at).toLocaleDateString()}
              </Text>
            </View>
            <View className="flex items-center space-x-1 text-gray-400">
              <AtIcon value="clock" size="16" color="#fff" />
              <Text className="text-sm">
                更新于:
                {' '}
                {new Date(guideData.modified_at).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex items-center space-x-6 mb-6">
          <View className="flex items-center space-x-2 text-gray-400">
            <AtIcon value="eye" size="16" color="#fff" />
            <Text>{guideData.views.toLocaleString()}</Text>
          </View>
          <View className="flex items-center space-x-2 text-gray-400">
            <AtIcon value="heart" size="16" color="#fff" />
            <Text>{guideData.likes}</Text>
          </View>
        </View>

        {guideData.img && (
          <Image
            src={guideData.img}
            className="w-full h-64 object-cover rounded-md mb-6"
            mode="aspectFill"
          />
        )}

        <RichText
          nodes={guideData.text}
          className="prose prose-lg text-gray-100"
          style={{
            maxWidth: '100%',
          }}
        />

        <View className="lg:hidden flex justify-between mt-6 text-sm text-gray-400">
          <Text>
            发布于:
            {' '}
            {new Date(guideData.published_at).toLocaleDateString()}
          </Text>
          <Text>
            更新于:
            {' '}
            {new Date(guideData.modified_at).toLocaleDateString()}
          </Text>
        </View>
      </View>

      {showScrollTop && (
        <BackTop onClick={scrollToTop} />
      )}
    </View>
  )
}

export default GuideDetails
