import React from 'react'
import { View } from '@tarojs/components'
import ClassCard from './ClassCard'
import type { ClassItem } from '@/types/tier-list'

interface SortableItemProps {
  classItem: ClassItem
}

const SortableItem: React.FC<SortableItemProps> = ({ classItem }) => {
  return (
    <View style={{
      marginBottom: '20rpx',
    }}
    >
      <ClassCard classItem={classItem} />
    </View>
  )
}

export default SortableItem
