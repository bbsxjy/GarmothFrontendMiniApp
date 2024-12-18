import React, { useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import SortableItem from './SortableItem'
import type { ClassItem } from '@/types/tier-list'

interface DroppableTierAreaProps {
  id: string
  itemsInTier: ClassItem[]
  onUpdateItems: (newItems: ClassItem[]) => void
  resetTrigger: number
  style?: React.CSSProperties
}

const DroppableTierArea: React.FC<DroppableTierAreaProps> = ({
  id,
  itemsInTier,
  onUpdateItems,
  resetTrigger,
}) => {
  const [items, setItems] = useState<ClassItem[]>(itemsInTier)
  const [containerWidth, setContainerWidth] = useState<number>(0)

  useEffect(() => {
    setItems(itemsInTier)
  }, [itemsInTier, resetTrigger])

  useEffect(() => {
    Taro.createSelectorQuery()
      .select('.droppable-tier-area')
      .boundingClientRect((rect) => {
        if (rect) {
          setContainerWidth(rect.width)
        }
      })
      .exec()
  }, [resetTrigger])

  const cellWidth = containerWidth / 2 - 20

  return (
    <View
      className="droppable-tier-area flex flex-wrap justify-start"
      style={{
        padding: '10px',
        gap: '20px',
      }}
    >
      {items.length > 0
        ? (
            items.map(classItem => (
              <View
                key={classItem.id}
                className="sortable-item flex items-center justify-center"
                style={{
                  width: `${cellWidth}px`,
                  height: '120px',
                  boxShadow: 'none',
                  border: 'none',
                  backgroundColor: 'transparent',
                }}
              >
                <SortableItem classItem={classItem} />
              </View>
            ))
          )
        : (
            <View className="flex items-center justify-center text-gray-500">
              没有职业，请添加
            </View>
          )}
    </View>
  )
}

export default DroppableTierArea
