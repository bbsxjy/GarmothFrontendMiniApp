import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react'
import { Button, Text, View } from '@tarojs/components'

const Carousel: React.FC = () => {
  const images = [
    {
      url: 'https://game.gtimg.cn/images/hssmpc/cp/a20241018hsppz/pc/bg1.jpg',
      caption: '国服开服福利一览',
      link: '/pages/post/guide-post?title=%E5%BC%80%E6%9C%8D%E7%A6%8F%E5%88%A9%E6%80%BB%E7%BB%93',
    },
    {
      url: 'https://img.crawler.qq.com/cfwebcap/0/fd9909ff68c860ca1b2ea161dbceccbd/0/?width=1920&height=1080',
      caption: '庆祝国服正式公测！',
      link: 'https://img.crawler.qq.com/cfwebcap/0/fd9909ff68c860ca1b2ea161dbceccbd/0/?width=1920&height=1080',
    },
    {
      url: 'https://s1.pearlcdn.com/NAEU/Upload/thumbnail/2024/V52F73QFB6FDGDS120240930093531419.400x225.png',
      caption: '欢迎来到黑沙盒子！',
      link: '/pages/post/index',
    },
    {
      url: 'https://s1.pearlcdn.com/NAEU/Upload/thumbnail/2024/MLM4HNIY0ACRBCRR20240829105650258.400x225.jpg',
      caption: '欢迎来到黑沙盒子！',
      link: '/pages/post/index',
    },
    {
      url: 'https://s1.pearlcdn.com/NAEU/Upload/thumbnail/2024/9V6ISJ7I793TZ4VP20240718162140795.400x225.jpg',
      caption: '欢迎来到黑沙盒子！',
      link: '/pages/post/index',
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 3000)

    return () => clearInterval(interval)
  }, [currentIndex])

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const handleImageClick = () => {
    Taro.navigateTo({ url: images[currentIndex].link }) // 使用 Taro 的跳转
  }

  return (
    <View className="relative w-full h-64 bg-gray-300 rounded-lg overflow-hidden">
      {/* 图片部分 */}
      <View
        onClick={handleImageClick} // 使图片可点击
        className="absolute inset-0 bg-cover bg-center transition-all duration-500 cursor-pointer"
        style={{
          backgroundImage: `url(${images[currentIndex].url})`,
          backgroundSize: 'cover',
        }}
      />

      {/* 标题 */}
      <View className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-2 text-center">
        <Text>{images[currentIndex].caption}</Text>
      </View>

      {/* 左箭头 */}
      <Button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        {'<'}
      </Button>

      {/* 右箭头 */}
      <Button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        {'>'}
      </Button>
    </View>
  )
}

export default Carousel
