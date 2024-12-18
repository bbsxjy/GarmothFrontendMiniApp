import React, { useState } from 'react'
import { Input, ScrollView, View } from '@tarojs/components'
import { AtButton, AtIcon } from 'taro-ui'
import Taro from '@tarojs/taro'
import LeftNavMenu from './components/LeftNavMenu'
import RecentGuides from './components/RecentGuides'

const Post: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  Taro.showShareMenu({
    withShareTicket: true,
  })
  return (
    <View className="flex flex-col h-full">
      <View className="flex items-center pl-2">
        <AtButton
          circle
          size="small"
          onClick={toggleMenu}

        >
          <AtIcon value="menu" size="20" color="#fff" />
        </AtButton>

      </View>
      <LeftNavMenu isMenuOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)} />
      <ScrollView className="flex-1 p-4 overflow-y-auto">
        <View className="max-w-4xl mx-auto">
          <RecentGuides />
        </View>
      </ScrollView>
    </View>
  )
}

export default Post
