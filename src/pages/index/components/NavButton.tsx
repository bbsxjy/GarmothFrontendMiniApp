import Taro from '@tarojs/taro'
import { Image, Text, View } from '@tarojs/components'

interface NavButtonProps {
  imgSrc: string
  title: string
  description: string
  link: string
  isTab?: boolean
}

const NavButton: React.FC<NavButtonProps> = ({ imgSrc, title, description, link, isTab = false }) => {
  let handleClick = null
  if (isTab) {
    handleClick = () => {
      Taro.switchTab({ url: link })
    }
  }
  else {
    handleClick = () => {
      Taro.navigateTo({ url: link })
    }
  }

  return (
    <View
      className="w-full p-3 flex bg-gray-800 border border-gray-500 gap-3 rounded-sm hover:bg-gray-700 transition-all"
      onClick={handleClick}
    >
      <View className="flex-shrink-0 flex items-center justify-center">
        <Image src={imgSrc} className="w-6 h-6 object-contain" />
      </View>
      <View className="flex flex-col justify-center flex-grow">
        <Text className="text-base font-semibold text-white">{title}</Text>
        <Text className="text-xs text-gray-400 mt-1">{description}</Text>
      </View>
    </View>
  )
}

export default NavButton
