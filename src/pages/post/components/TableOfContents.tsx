import React from 'react'
import { Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'

const TableOfContents: React.FC<{
  headers: any
}> = ({ headers }) => {
  const scrollToSection = (id) => {
    Taro.pageScrollTo({ selector: `#${id}`, duration: 300 })
  }

  return (
    <View className="relative hidden w-44 flex-none text-sm transition lg:block opacity-100">
      <View id="default-toc" className="overflow-y-auto fixed w-44">
        <Text className="mb-2 ml-[2px] pl-2 text-xs">TABLE OF CONTENTS</Text>
        <View>
          <View className="flex flex-col gap-1">
            {headers.map(header => (
              <Text
                key={header.id}
                className="border-800 text-200 cut-text block border-l-4 pl-2 hover:text-white"
                style={{ marginLeft: `${(header.level - 1) * 10}px` }}
                onClick={() => scrollToSection(header.id)}
              >
                {header.text}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </View>
  )
}

export default TableOfContents
