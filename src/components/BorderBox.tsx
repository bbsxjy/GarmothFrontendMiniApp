import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import type { ReactNode } from 'react'

interface BorderBoxProps {
  children: ReactNode
  leftAndRightBorderLength: string
}

const BorderBox: React.FC<BorderBoxProps> = ({ children, leftAndRightBorderLength }) => {
  return (
    <View className="relative p-5">
      {/* 顶部边框 */}
      <View className="absolute top-0 left-0 w-full h-2">
        <View className="absolute top-0 left-0 w-full h-px">
          <View className="h-full bg-stone-500" />
          <View className="absolute top-0 right-0 h-full bg-stone-500" />
        </View>
        <View className="absolute bottom-0 left-0 w-full h-px">
          <View className="h-full bg-stone-500" />
          <View className="absolute top-0 right-0 h-full bg-stone-500" />
        </View>
      </View>

      {/* 右侧边框 */}
      <View className="absolute top-0 right-0 w-2 h-full">
        <View className={`absolute top-0 left-0 w-full h-${leftAndRightBorderLength}`}>
          <View className="absolute left-0 top-0 h-full w-px bg-stone-500" />
          <View className="absolute right-0 top-0 h-full w-px bg-stone-500" />
          <View className="absolute top-0 left-0 w-full h-px bg-stone-500" />
          <View className="absolute bottom-0 left-0 w-full h-px bg-stone-500" />
        </View>
        <View className={`absolute bottom-0 left-0 w-full h-${leftAndRightBorderLength}`}>
          <View className="absolute left-0 top-0 h-full w-px bg-stone-500" />
          <View className="absolute right-0 top-0 h-full w-px bg-stone-500" />
          <View className="absolute top-0 left-0 w-full h-px bg-stone-500" />
          <View className="absolute bottom-0 left-0 w-full h-px bg-stone-500" />
        </View>
      </View>

      {/* 底部边框 */}
      <View className="absolute bottom-0 left-0 w-full h-2">
        <View className="absolute top-0 left-0 w-full h-px">
          <View className="h-full bg-stone-500" />
          <View className="absolute top-0 right-0 h-full bg-stone-500" />
        </View>
        <View className="absolute bottom-0 left-0 w-full h-px">
          <View className="h-full bg-stone-500" />
          <View className="absolute top-0 right-0 h-full bg-stone-500" />
        </View>
      </View>

      {/* 左侧边框 */}
      <View className="absolute top-0 left-0 w-2 h-full">
        <View className={`absolute top-0 left-0 w-full h-${leftAndRightBorderLength}`}>
          <View className="absolute left-0 top-0 h-full w-px bg-stone-500" />
          <View className="absolute right-0 top-0 h-full w-px bg-stone-500" />
          <View className="absolute top-0 left-0 w-full h-px bg-stone-500" />
          <View className="absolute bottom-0 left-0 w-full h-px bg-stone-500" />
        </View>
        <View className={`absolute bottom-0 left-0 w-full h-${leftAndRightBorderLength}`}>
          <View className="absolute left-0 top-0 h-full w-px bg-stone-500" />
          <View className="absolute right-0 top-0 h-full w-px bg-stone-500" />
          <View className="absolute top-0 left-0 w-full h-px bg-stone-500" />
          <View className="absolute bottom-0 left-0 w-full h-px bg-stone-500" />
        </View>
      </View>

      {/* 内容 */}
      <View className="relative">
        {children}
      </View>
    </View>
  )
}

export default BorderBox
