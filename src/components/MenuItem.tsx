import React from 'react'
import { Image, Navigator, Text, View } from '@tarojs/components'

interface ItemProps {
  href: string
  imgSrc: string
  imgAlt: string
  title: string
  description?: string
  disabled?: boolean
  isMobile?: boolean
  className?: string
}

const MenuItem: React.FC<ItemProps> = ({
  href,
  imgSrc,
  imgAlt,
  title,
  description,
  disabled = false,
  isMobile = false,
  className = '',
}) => {
  if (isMobile) {
    return (
      <View className={`w-full ${className}`}>
        <Navigator
          url={href}
          className={`block w-full text-sm ${disabled ? 'opacity-50' : ''}`}
        >
          <View className="cut-text flex items-center gap-2 rounded-md bg-600 bg-opacity-75 py-1 pl-1 pr-2">
            <Image
              src={imgSrc}
              lazyLoad
              className="size-8 rounded-full bg-500 p-1 opacity-75"
            />
            <View className="cut-text">{title}</View>
          </View>
        </Navigator>
      </View>
    )
  }

  const classes = `${className} border-2 black bg-600 relative cursor-pointer select-none rounded-md p-2 pr-1 ${
    disabled ? 'opacity-50' : ''
  }`

  return (
    <Navigator url={href} className={classes}>
      <View className="flex items-center gap-2">
        <View className="flex-none">
          <Image
            src={imgSrc}
            lazyLoad
            className="size-12 rounded-full bg-500 p-2 opacity-75"
          />
        </View>
        <View className="cut-text w-full">
          <Text className="font-semibold">{title}</Text>
          {description && (
            <Text className="cut-text text-xs text-200">{description}</Text>
          )}
        </View>
      </View>
    </Navigator>
  )
}

export default MenuItem
