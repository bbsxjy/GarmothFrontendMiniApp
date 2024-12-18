// src/pages/grind-tracker/index.tsx
import React, { Suspense, lazy } from 'react'
import { Navigator, Text, View } from '@tarojs/components'
import Layout from '@/components/Layout'
import './index.scss'

// 懒加载子组件
const LeftMenu = lazy(() => import('./components/LeftMenu'))
const Summary = lazy(() => import('./summary'))
const BestGrindSpots = lazy(() => import('./BestGrindSpots'))
const Global = lazy(() => import('./global'))
const GlobalDetail = lazy(() => import('./globalDetail'))
const TierList = lazy(() => import('./tierList'))
const MonsterApCaps = lazy(() => import('./monsterApCaps'))

function GrindTracker() {
  return (
    <Layout>
      <View className="container-max-height">
        <View className="block h-full transition lg:flex">
          {/* 左侧菜单 */}
          <Suspense fallback={<View>加载中...</View>}>
            <LeftMenu />
          </Suspense>

          {/* 主要内容区域 */}
          <View className="h-full grow overflow-y-auto px-2 py-1 pb-2 lg:p-3">
            <View className="container-xl">
              {/* 导航链接 */}
              <View className="navigation-links">
                <Navigator url="/pages/grind-tracker/summary" open-type="navigate">
                  <Text>Summary</Text>
                </Navigator>
                <Navigator url="/pages/grind-tracker/global" open-type="navigate">
                  <Text>Global</Text>
                </Navigator>
                <Navigator url="/pages/grind-tracker/TierList" open-type="navigate">
                  <Text>Tier List</Text>
                </Navigator>
                <Navigator url="/pages/grind-tracker/monsterApCaps" open-type="navigate">
                  <Text>Monster AP Caps</Text>
                </Navigator>
                <Navigator url="/pages/grind-tracker/bestGrindSpots" open-type="navigate">
                  <Text>Best Grind Spots</Text>
                </Navigator>

              </View>

              <View className="default-content">
                <Text>请选择一个页面</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Layout>
  )
}

export default GrindTracker
