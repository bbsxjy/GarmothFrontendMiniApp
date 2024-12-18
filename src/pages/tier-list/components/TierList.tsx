import React, { useEffect, useState } from 'react'
import { Button, Text, View } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import DroppableTierArea from './DroppableTierArea'
import type { ClassItem, TierItems, TierListProps } from '@/types/tier-list'
import { Tier } from '@/types/tier-list'

const TierList: React.FC<TierListProps> = ({ initialClassItems, tiers, title }) => {
  const router = useRouter()
  const [activeMainNav, setActiveMainNav] = useState<'pve' | 'pvp'>('pve')
  const [itemsByTier, setItemsByTier] = useState<TierItems>(() => {
    const savedData = Taro.getStorageSync(title)
    if (savedData) {
      return JSON.parse(savedData)
    }
    else {
      const groupedItems: TierItems = {}
      tiers.forEach((tier) => {
        groupedItems[tier.name] = initialClassItems.filter(item => item.tier === tier.name)
      })
      return groupedItems
    }
  })
  const [resetTrigger, setResetTrigger] = useState(0)

  useEffect(() => {
    const groupedItems: TierItems = {}
    tiers.forEach((tier) => {
      groupedItems[tier.name] = initialClassItems.filter(item => item.tier === tier.name)
    })
    setItemsByTier(groupedItems)
  }, [initialClassItems, tiers])

  useEffect(() => {
    Taro.setStorageSync(title, JSON.stringify(itemsByTier))
  }, [itemsByTier, title])

  const resetTierList = () => {
    const groupedItems: TierItems = {}
    tiers.forEach((tier) => {
      groupedItems[tier.name] = initialClassItems.filter(item => item.tier === tier.name)
    })
    setItemsByTier(groupedItems)
    setResetTrigger(prev => prev + 1)
    Taro.removeStorageSync(title)
  }

  useEffect(() => {
    if (router.params.type?.includes('pvp')) {
      setActiveMainNav('pvp')
    }
    else {
      setActiveMainNav('pve')
    }
  }, [router.params.type])

  const handleUpdateItems = (tierId: string, newItems: ClassItem[]) => {
    setItemsByTier(prev => ({
      ...prev,
      [tierId]: newItems,
    }))
  }

  const handleNavigation = (type: string, navType: 'pve' | 'pvp') => {
    setActiveMainNav(navType)
    Taro.redirectTo({ url: `/pages/tier-list/index?type=${type}` })
  }

  return (
    <View className="container-lg space-y-3">
      <View className="flex flex-col items-center justify-between border-b border-gray-600">
        <View className="container-xl flex h-10 w-full justify-center overflow-x-auto text-sm">
          <View className="flex justify-center space-x-4">
            <Text
              className={`flex items-center border-b-4 px-3 hover:border-primary hover:bg-opacity-50 ${
                activeMainNav === 'pve' || !activeMainNav
                  ? 'border-red bg-opacity-50 text-red'
                  : 'border-gray-600 bg-opacity-50'
              }`}
              onClick={() => handleNavigation('pve', 'pve')}
            >
              PVE排行榜
            </Text>
            <Text
              className={`flex items-center border-b-4 px-3 hover:border-primary hover:bg-opacity-50 ${
                activeMainNav === 'pvp'
                  ? 'border-red bg-opacity-50 text-red'
                  : 'border-gray-600 bg-opacity-50'
              }`}
              onClick={() => handleNavigation('pvp', 'pvp')}
            >
              PVP排行榜
            </Text>
          </View>
        </View>
        <View className="container-xl flex h-10 w-full justify-center overflow-x-auto text-sm">
          {activeMainNav === 'pve' && (
            <View className="flex justify-center space-x-4">
              <Text
                className={`px-3 py-1 text-sm ${
                  router.params.type === 'pve' || !router.params.type
                    ? 'text-red font-bold'
                    : 'text-gray-500'
                }`}
                onClick={() => handleNavigation('pve', 'pve')}
              >
                通用
              </Text>
              <Text
                className={`px-3 py-1 text-sm ${
                  router.params.type === 'pve_early' ? 'text-red font-bold' : 'text-gray-500'
                }`}
                onClick={() => handleNavigation('pve_early', 'pve')}
              >
                前期
              </Text>
              <Text
                className={`px-3 py-1 text-sm ${
                  router.params.type === 'pve_mid' ? 'text-red font-bold' : 'text-gray-500'
                }`}
                onClick={() => handleNavigation('pve_mid', 'pve')}
              >
                中期
              </Text>
              <Text
                className={`px-3 py-1 text-sm ${
                  router.params.type === 'pve_end' ? 'text-red font-bold' : 'text-gray-500'
                }`}
                onClick={() => handleNavigation('pve_end', 'pve')}
              >
                后期
              </Text>
            </View>
          )}
          {activeMainNav === 'pvp' && (
            <View className="flex justify-center space-x-4">
              <Text
                className={`px-3 py-1 text-sm ${
                  router.params.type === 'pvp' ? 'text-red font-bold' : 'text-gray-500'
                }`}
                onClick={() => handleNavigation('pvp', 'pvp')}
              >
                1v1单挑
              </Text>
              <Text
                className={`px-3 py-1 text-sm ${
                  router.params.type === 'pvp_large-scale' ? 'text-red font-bold' : 'text-gray-500'
                }`}
                onClick={() => handleNavigation('pvp_large-scale', 'pvp')}
              >
                团战
              </Text>
            </View>
          )}
        </View>
      </View>

      <View className="flex items-center justify-between gap-3">
        <View className="flex items-center gap-2">
          <Text className="text-teal">{title}</Text>
        </View>
        {/*
        <Button
          onClick={resetTierList}
          className="rounded bg-red-500 px-4 py-2 text-white"
        >
          重置榜单
        </Button>
        */}
      </View>

      <View className="flex gap-2 text-sm">
        <Text className="text-gray-100">默认排序来自国服职业热度，仅供参考</Text>
      </View>

      {/*
      <View className="flex gap-2 text-sm">
        <Text className="text-gray-100">你也可以根据自己想法自由拖拽图标排序，同时分享给你的小伙伴吧！</Text>
      </View>
      */}

      {tiers.map(tier => (
        <View key={tier.name} className="rounded-md p-3">
          <View className="relative flex gap-3 border-b border-gray-400 p-3">
            <Text className={`w-20 flex-none text-3xl font-bold ${tier.colorClass}`}>
              {tier.name}
            </Text>
            <DroppableTierArea
              id={tier.name}
              itemsInTier={itemsByTier[tier.name]}
              onUpdateItems={newItems => handleUpdateItems(tier.name, newItems)}
              resetTrigger={resetTrigger}
            />
          </View>
        </View>
      ))}
    </View>
  )
}

export default TierList
