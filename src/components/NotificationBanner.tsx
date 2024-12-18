import React from 'react'
import { Button, Image, Navigator, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'


interface NotificationBannerProps {
  title?: string
  message?: string
  linkText?: string
  linkHref?: string
  onDismiss?: () => void
}

const NotificationBanner: React.FC<NotificationBannerProps> = ({
  title = '通知',
  message = '这是一个通用的通知消息。',
  linkText,
  linkHref,
  onDismiss,
}) => {


  return (
    <View className="relative flex items-center gap-x-6 overflow-hidden px-6 py-2.5">
      {/* 内容区域 */}
      <View className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <Text className="text-sm leading-6 text-gray-50">
          <Text className="font-semibold">{title}</Text>
          <Text className="mx-2 inline h-0.5 w-0.5 text-gray-50">·</Text>
          {message}
        </Text>
        {linkHref && linkText && (
          <Navigator
            url={linkHref}
            openType="navigate"
            className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm"
          >
            {linkText}
            {' '}
            <Text aria-hidden="true">→</Text>
          </Navigator>
        )}
        
      </View>
      <View className="flex flex-1 justify-end">
        {onDismiss && (
          <Button
            onClick={onDismiss}
            className="p-2 rounded-full transition-colors duration-200 ease-in-out focus:outline-none hover:bg-gray-100"
            aria-label="关闭通知"
          >
            <Text className="h-5 w-5 text-gray-500">×</Text>
          </Button>
        )}
      </View>
    </View>
  )
}

export default NotificationBanner
