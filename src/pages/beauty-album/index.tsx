import React, { useEffect, useState } from 'react'
import { Button, Image, ScrollView, Text, View } from '@tarojs/components'
import Taro, { usePageScroll, useRouter } from '@tarojs/taro'

import { BackTop } from '@nutui/nutui-react-taro'
import { useGetBeautyAlbumsQuery, useIncrementViewCountMutation } from '@/api/beauty-albums/beautyAlbumApi'
import { BASE_IMAGE_BEAUTY_ALBUM_COVER_URL, JOB_CLASS_MAP } from '@/constants'
import Spinner from '@/components/Loading'

const BeautyAlbum: React.FC = () => {
  const router = useRouter()

  const pathParts = router.path.split('/')
  const categoryParam = pathParts[2]

  type BeautyAlbumCategoryType = 'most-popular' | 'preset' | 'randoms'

  const validCategories: BeautyAlbumCategoryType[] = ['most-popular', 'preset', 'randoms']
  const currentCategory: BeautyAlbumCategoryType = validCategories.includes(categoryParam as BeautyAlbumCategoryType)
    ? (categoryParam as BeautyAlbumCategoryType)
    : 'preset'

  useEffect(() => {
    if (!validCategories.includes(currentCategory)) {
      Taro.redirectTo({ url: '/pages/BeautyAlbum/preset/index' })
    }
  }, [currentCategory])

  const { data: beautyAlbumsData, isLoading, error } = useGetBeautyAlbumsQuery()
  const [incrementViewCount] = useIncrementViewCountMutation()

  const [selectedTimeRange, setSelectedTimeRange] = useState('90 天')
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('所有')
  const [selectedSort, setSelectedSort] = useState('所有')
  const [dropdownOpen, setDropdownOpen] = useState({
    timeRange: false,
    category: false,
    sort: false,
  })
  const [showBackToTop, setShowBackToTop] = useState(false)

  usePageScroll((e) => {
    if (e.scrollTop > 100) {
      setShowBackToTop(true)
    }
    else {
      setShowBackToTop(false)
    }
  })

  useEffect(() => {
    setSelectedTimeRange('90 天')
    setSelectedCategoryFilter('所有')
    setSelectedSort('所有')
  }, [currentCategory])

  const beautyAlbums = beautyAlbumsData || []

  if (!beautyAlbums)
    return null

  const handleLinkClick = async (albumId: string) => {
    await incrementViewCount(albumId)
    Taro.navigateTo({ url: `/pages/beauty-album/download?id=${albumId}` })
  }

  return (
    <View className="flex-grow">
      <View className="container mx-auto w-full px-4">
        <View className="mb-6 mx-auto text-center">
          <Text className="text-3xl">美容相册</Text>
        </View>
        <View className="h-full">
          <ScrollView className="relative mb-4 h-full overflow-auto">
            {isLoading && (
              <View className="flex justify-center items-center py-10">
                <Spinner />
              </View>
            )}
            {error && (
              <Text className="text-red-500 text-center">加载时出错。</Text>
            )}
            {!isLoading && beautyAlbums.length > 0
              ? (
                  <View className="grid grid-cols-2 gap-4 text-sm md:grid-cols-3 lg:grid-cols-5">
                    {beautyAlbums.map((album: any, index: number) => (
                      <View
                        key={album.id}
                        className="group relative overflow-hidden rounded border-2 border-gray-500 bg-gray-600 transition hover:bg-gray-700 cursor-pointer"
                        onClick={() => handleLinkClick(album.id)}
                      >
                        <View className="absolute left-0 top-0 z-20 h-24 w-16"></View>
                        <View className="flex h-44 w-full items-center justify-center overflow-hidden border-b-2 border-gray-500 bg-gray-500 md:h-52">
                          <Image
                            src={`${BASE_IMAGE_BEAUTY_ALBUM_COVER_URL}${album.className}/${album.title}_1.png`}
                            mode="aspectFit"
                            className="max-w-full object-contain"
                            lazyLoad
                            alt={JOB_CLASS_MAP[album.className]}
                          />
                        </View>
                        <View className="px-3 py-2">
                          <Text className="truncate text-gray-100">
                            No.
                            {index + 1}
                            【
                            {JOB_CLASS_MAP[album.className]}
                            】精品捏脸
                          </Text>
                        </View>
                        <View className="flex">
                          <View className="flex w-full items-center justify-between border-t-2 border-gray-500 px-3 text-gray-200">
                            <View className="flex items-center gap-1">
                              <Image src="/assets/icons/download.svg" className="w-4 h-4" alt="下载" />
                              <Text>{album.downloadCount || 0}</Text>
                            </View>
                            <View className="flex items-center gap-1">
                              <Image src="/assets/icons/view.svg" className="w-4 h-4" alt="浏览" />
                              <Text>{album.viewCount || 0}</Text>
                            </View>
                            <View className="flex items-center gap-1">
                              <Image src="/assets/icons/like.svg" className="w-4 h-4" alt="喜欢" />
                              <Text>{album.likeCount || 0}</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                )
              : (
                  !isLoading && <Text className="text-center">暂无更新。</Text>
                )}
          </ScrollView>
        </View>
      </View>
      {showBackToTop && (
        <View
          className="fixed bottom-10 right-10 z-50 p-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition cursor-pointer"
          onClick={() => Taro.pageScrollTo({ scrollTop: 0, duration: 300 })}
        >
          ↑
        </View>
      )}
    </View>
  )
}

export default BeautyAlbum
