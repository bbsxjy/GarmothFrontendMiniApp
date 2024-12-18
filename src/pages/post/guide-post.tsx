import React from 'react'
import { ScrollView, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import GuideDetails from './components/GuideDetails'

function GuidePost() {
  const router = Taro.useRouter()
  const { title } = router.params
  Taro.setNavigationBarTitle({ title })
  Taro.showShareMenu({
    withShareTicket: true,
  })
  return (
    <ScrollView className="flex max-w-full grow gap-2 p-1 lg:p-0" scrollY>
      <View className="flex max-w-full grow">
        <GuideDetails title={title} />
      </View>
    </ScrollView>
  )
}

export default GuidePost
