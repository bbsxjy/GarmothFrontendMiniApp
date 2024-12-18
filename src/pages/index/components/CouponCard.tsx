import React, { useState } from 'react'
import { Button, Image, Input, Text, View } from '@tarojs/components'
import { Link } from '@nutui/icons-react-taro'
import type { CouponCardItem } from 'types'
import Taro from '@tarojs/taro'
import { timestampToText } from '@/utils/time'

interface CouponCardProps {
  imgSrc: string
  imgCount: number
  dateTime: number
  code: string
  expiration: number
  title: string
  description: string
  imgSrc1?: string
  imgSrc2?: string
  imgSrc3?: string
  imgSrc4?: string
}

const CouponCard: React.FC<CouponCardProps> = ({
  imgSrc,
  imgCount,
  dateTime,
  code,
  expiration,
  title,
  description,
  imgSrc1,
  imgSrc2,
  imgSrc3,
  imgSrc4,
}) => {
  const [copied, setCopied] = useState(false)

  const copyCode = () => {

    Taro.setClipboardData({
      data: code,
    })
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <View className="glass-600 relative flex flex-col gap-4 rounded-md p-4 shadow-lg border border-[#EAC48B] w-full max-w-md mx-auto">
      <View className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <View className="flex flex-col gap-1">
          <Text className="text-lg font-semibold mb-1">{title}</Text>
          <Text className="text-sm text-artisan mb-2">
            {/* <Link to={description} target="_blank" rel="noopener noreferrer">
              复制下方口令，点我去官网领取
            </Link> */}
          </Text>
        </View>
        <View className="grid grid-cols-2 gap-1 self-end sm:self-start">
          <View className="relative">
            <Image src={imgSrc1} lazyLoad className="border-rarity-4 w-8 h-8 rounded border-2 bg-800" />
            <Text className="stroke absolute bottom-0 right-1 text-xs font-bold">{imgCount}</Text>
          </View>
          {imgSrc2 && (
            <View className="relative">
              <Image src={imgSrc2} lazyLoad className="border-rarity-4 w-8 h-8 rounded border-2 bg-800" />
              <Text className="stroke absolute bottom-0 right-1 text-xs font-bold">{imgCount}</Text>
            </View>
          )}
          {imgSrc3 && (
            <View className="relative">
              <Image src={imgSrc3} lazyLoad className="border-rarity-4 w-8 h-8 rounded border-2 bg-800" />
              <Text className="stroke absolute bottom-0 right-1 text-xs font-bold">{imgCount}</Text>
            </View>
          )}
          {imgSrc4 && (
            <View className="relative">
              <Image src={imgSrc4} lazyLoad className="border-rarity-4 w-8 h-8 rounded border-2 bg-800" />
              <Text className="stroke absolute bottom-0 right-1 text-xs font-bold">{imgCount}</Text>
            </View>
          )}
        </View>
      </View>

      <View className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <View className="flex items-center space-x-2 w-full sm:w-auto">
          <Input
            id={code}
            type="text"
            value={code}
            readOnly
            className="flex-grow rounded-md border-0 bg-700 px-2 py-1 text-center font-mono text-sm w-full sm:w-auto"
          />
          <Button
            onClick={copyCode}
            className="bg-600 hover:bg-500 text-white px-3 py-1 rounded-md transition text-sm whitespace-nowrap"
            aria-label={copied ? '已复制兑换码' : '复制兑换码'}
          >
            {copied ? '已复制' : '复制'}
          </Button>
        </View>

        <Text className="text-sm w-full sm:w-auto text-center sm:text-right">
          <Text className="text-xs opacity-50 group-hover:opacity-100 text-300">
            过期时间:
            {' '}
            {timestampToText(expiration)}
          </Text>
        </Text>
      </View>
    </View>
  )
}

export default CouponCard
