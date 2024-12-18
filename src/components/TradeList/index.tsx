import React from 'react'
import { Text, View } from '@tarojs/components'
import { useFetchTradeItemsQuery } from '@/api/common/tradeApi'
import MenuItem from '@/components/MenuItem'
import './index.less'
import Bottom from '../header/bottom'
import { getCurrentInstance } from '@tarojs/taro'

interface TradeListProps {
  show: boolean
}

const TradeList: React.FC<TradeListProps> = ({ show }) => {
  const { data: tradeItems } = useFetchTradeItemsQuery()
  const router = getCurrentInstance().router

  return (
    <View className={`trade-list-container ${show ? 'show' : ''}`}>
      <View className="relative mx-auto">
        <View>
          <View className="container mx-auto grid grid-cols-2 gap-2">
            {tradeItems?.map((category: any, categoryIndex: number) => (
              <View key={categoryIndex} className="w-full">
                <Text className="cut-text my-1 text-center text-sm font-semibold text-200">
                  {category.categoryName}
                </Text>
                <View className="flex w-full flex-col gap-2">
                  {category.data.map((item: any, itemIndex: number) => {
                    return (
                      <MenuItem
                        key={itemIndex}
                        href={item.href}
                        imgSrc={item.imgSrc}
                        imgAlt={item.imgAlt}
                        title={item.title}
                        description={item.description}
                        disabled={item.disabled}
                        className={
                          router?.path?.includes(item.href)
                            ? 'border-primary'
                            : 'border-600'
                        }
                      />
                    )
                  })}
                </View>
              </View>
            ))}
          </View>
        </View>
        <Bottom />
      </View>
    </View>
  )
}

export default TradeList
