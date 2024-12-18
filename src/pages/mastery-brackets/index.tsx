// src/pages/mastery-brackets/index.jsx

import Taro from '@tarojs/taro'
import { Button, Image, ScrollView, Text, View } from '@tarojs/components'
import { useEffect, useState } from 'react'

import Gathering from './components/Gathering'
import Fish from './components/Fish'
import Layout from '@/components/Layout'

function MasteryBrackets() {
  const [currentPage, setCurrentPage] = useState('gathering')

  const navigateTo = (page) => {
    setCurrentPage(page)
  }

  return (
    <Layout>
      <View className="container">
        <View className="header">
          <Text className="title">熟练度阶段</Text>
          <Button className="extra-button">Extra</Button>
        </View>
        <ScrollView
          className="nav-bar"
          scrollX
          showsHorizontalScrollIndicator={false}
        >
          <View className="nav-items">
            <View
              className={`nav-item ${currentPage === 'gathering' ? 'active' : ''}`}
              onClick={() => navigateTo('gathering')}
            >
              <Image
                src="https://assets.garmoth.com/icons/mastery/mastgath.png"
                className="icon"
              />
            </View>
            <View
              className={`nav-item ${currentPage === 'fishing' ? 'active' : ''}`}
              onClick={() => navigateTo('fishing')}
            >
              <Image
                src="https://assets.garmoth.com/icons/mastery/mastfish.png"
                alt="life skill icon bdo fishing"
                className="icon"
              />
            </View>
            {/* 添加其他导航项 */}
            <View
              className={`nav-item ${currentPage === 'cooking' ? 'active' : ''}`}
              onClick={() => navigateTo('cooking')}
            >
              <Image
                src="https://assets.garmoth.com/icons/mastery/mastcook.png"
                alt="life skill icon bdo cooking"
                className="icon"
              />
            </View>
            <View
              className={`nav-item ${currentPage === 'alchemy' ? 'active' : ''}`}
              onClick={() => navigateTo('alchemy')}
            >
              <Image
                src="https://assets.garmoth.com/icons/mastery/mastalch.png"
                alt="life skill icon bdo alchemy"
                className="icon"
              />
            </View>
            <View
              className={`nav-item ${currentPage === 'processing' ? 'active' : ''}`}
              onClick={() => navigateTo('processing')}
            >
              <Image
                src="https://assets.garmoth.com/icons/mastery/mastproc.png"
                alt="life skill icon bdo processing"
                className="icon"
              />
            </View>
            <View
              className={`nav-item ${currentPage === 'hunting' ? 'active' : ''}`}
              onClick={() => navigateTo('hunting')}
            >
              <Image
                src="https://assets.garmoth.com/icons/mastery/masthunt.png"
                alt="life skill icon bdo hunting"
                className="icon"
              />
            </View>
            <View
              className={`nav-item ${currentPage === 'sailing' ? 'active' : ''}`}
              onClick={() => navigateTo('sailing')}
            >
              <Image
                src="https://assets.garmoth.com/icons/mastery/mastsail.png"
                alt="life skill icon bdo sailing"
                className="icon"
              />
            </View>
            <View
              className={`nav-item ${currentPage === 'training' ? 'active' : ''}`}
              onClick={() => navigateTo('training')}
            >
              <Image
                src="https://assets.garmoth.com/icons/mastery/masttrai.png"
                alt="life skill icon bdo training"
                className="icon"
              />
            </View>
          </View>
        </ScrollView>
        <View className="content">
          {currentPage === 'gathering' && <Gathering />}
          {currentPage === 'fishing' }
        </View>
      </View>
    </Layout>
  )
}

export default MasteryBrackets
