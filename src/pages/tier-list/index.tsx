import React from 'react'
import { View } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import TierList from './components/TierList'
import type { Tier } from '@/types/tier-list'
import {
  PVE_CLASS_RANKINGS,
  PVE_EARLY_CLASS_RANKINGS,
  PVE_END_CLASS_RANKINGS,
  PVE_MID_CLASS_RANKINGS,
  PVP_CLASS_RANKINGS,
  PVP_LARGE_SCALE_CLASS_RANKINGS,
} from '@/constants'
import './index.scss'

const tiers: Tier[] = [
  { name: 'T0', colorClass: 'text-red' },
  { name: 'T1', colorClass: 'text-orange' },
  { name: 'T2', colorClass: 'text-green' },
  { name: 'T3', colorClass: 'text-yellow' },
  { name: 'T4', colorClass: 'text-blue' },
]

const TierListPage: React.FC = () => {
  const router = useRouter()
  const { type } = router.params

  let initialClassItems = PVE_CLASS_RANKINGS
  let title = 'PVE职业通用排名'

  switch (type) {
    case 'pve_early':
      initialClassItems = PVE_EARLY_CLASS_RANKINGS
      title = 'PVE职业排名-前期(240攻击以下怪点)'
      break
    case 'pve_mid':
      initialClassItems = PVE_MID_CLASS_RANKINGS
      title = 'PVE职业排名-中期(240-290攻击怪点)'
      break
    case 'pve_end':
      initialClassItems = PVE_END_CLASS_RANKINGS
      title = 'PVE职业排名-后期(290+攻击怪点)'
      break
    case 'pvp_large-scale':
      initialClassItems = PVP_LARGE_SCALE_CLASS_RANKINGS
      title = 'PVP职业排名-团战（10V10公会战/据点战）'
      break
    case 'pvp':
      initialClassItems = PVP_CLASS_RANKINGS
      title = 'PVP职业排名-1V1单挑'
      break
    default:
      initialClassItems = PVE_CLASS_RANKINGS
      title = 'PVE职业通用排名'
  }

  Taro.showShareMenu({
    withShareTicket: true,
  })

  return (
    <View className="container-max-height bg-gray-800">
      <View className="block h-full transition lg:flex">
        <View className="h-full grow overflow-y-auto px-2 py-1 pb-2 lg:p-3">
          <View className="container-xl">
            <TierList initialClassItems={initialClassItems} title={title} tiers={tiers} />
          </View>
        </View>
      </View>
    </View>
  )
}

export default TierListPage
