import { useState } from 'react'
import { Button, Image, ScrollView, Text, View } from '@tarojs/components'
import Taro, { usePageScroll } from '@tarojs/taro'
import { AtFab, AtIcon, AtModal, AtModalAction, AtModalContent, AtModalHeader } from 'taro-ui'
import 'taro-ui/dist/style/components/icon.scss'
import 'taro-ui/dist/style/components/modal.scss'
import 'taro-ui/dist/style/components/fab.scss'
import { BackTop } from '@nutui/nutui-react-taro'

function MonsterApCaps() {
  const sections = [
    {
      header: '巴雷诺斯',
      rows: [
        {
          location: '普罗提洞穴',
          images: [
            'https://assets.garmoth.com/items/44378.webp',
            'https://assets.garmoth.com/icons/mob-types/demi.png',
          ],
          values: [
            '1 - 242',
            '243 - 280',
            '>280',
            '—',
            '—',
            '—',
            '—',
            '—',
          ],
        },
        {
          location: '赛卡利亚海底废墟(上层)',
          images: [
            'https://assets.garmoth.com/items/44382.webp',
            'https://assets.garmoth.com/icons/mob-types/animal.png',
          ],
          values: [
            '1 - 342',
            '343 - 380',
            '>380',
            '—',
            '—',
            '—',
            '—',
            '—',
          ],
        },
        {
          location: '赛卡利亚海底废墟(下层)',
          images: [
            'https://assets.garmoth.com/items/44380.webp',
            'https://assets.garmoth.com/icons/mob-types/animal.png',
          ],
          values: [
            '1 - 400',
            '401 - 650',
            '>650',
            '—',
            '—',
            '—',
            '—',
            '—',
          ],
        },
      ],
    },
    {
      header: '卡佩恩',
      rows: [
        {
          location: '繁星之墓',
          images: [
            'https://assets.garmoth.com/items/44400.webp',
            'https://assets.garmoth.com/icons/mob-types/demi.png',
          ],
          values: [
            '1 - 392',
            '393 - 650',
            '>650',
            '—',
            '—',
            '—',
            '—',
            '—',
          ],
        },
        {
          location: '帕蒂库斯岛',
          images: [
            'https://assets.garmoth.com/items/44448.webp',
            'https://assets.garmoth.com/icons/mob-types/human.png',
          ],
          values: [
            '1 - 400',
            '401 - 700',
            '>700',
            '—',
            '—',
            '—',
            '—',
            '—',
          ],
        },
        {
          location: '废弃修道场',
          images: [
            'https://assets.garmoth.com/items/44446.webp',
            'https://assets.garmoth.com/icons/mob-types/human.png',
          ],
          values: [
            '1 - 400',
            '401 - 750',
            '>750',
            '—',
            '—',
            '—',
            '—',
            '—',
          ],
        },
      ],
    },
    {
      header: '梅地亚',
      rows: [
        {
          location: '克拉图卡古代遗迹',
          images: [
            'https://assets.garmoth.com/items/44423.webp',
            'https://assets.garmoth.com/icons/mob-types/animal.png',
          ],
          values: [
            '1 - 342',
            '343 - 600',
            '>600',
            '—',
            '—',
            '—',
            '—',
            '—',
          ],
        },
      ],
    },
    {
      header: '瓦伦西亚',
      rows: [
        {
          location: '瓦拉贡巢穴',
          images: [
            'https://assets.garmoth.com/items/44434.webp',
            'https://assets.garmoth.com/icons/mob-types/animal.png',
          ],
          values: [
            '1 - 1',
            '2 - 250',
            '—',
            '—',
            '>250',
            '—',
            '—',
            '—',
          ],
        },
        {
          location: '沙漠娜迦圣殿',
          images: [
            'https://assets.garmoth.com/items/44425.webp',
            'https://assets.garmoth.com/icons/mob-types/demi.png',
          ],
          values: [
            '1 - 157',
            '158 - 213',
            '>213',
            '—',
            '—',
            '—',
            '—',
            '—',
          ],
        },
        {
          location: '缇缇温溪谷',
          images: [
            'https://assets.garmoth.com/items/44427.webp',
            'https://assets.garmoth.com/icons/mob-types/demi.png',
          ],
          values: [
            '1 - 157',
            '158 - 213',
            '>213',
            '—',
            '—',
            '—',
            '—',
            '—',
          ],
        },
        {
          location: '巴新族驻地',
          images: [
            'https://assets.garmoth.com/items/44426.webp',
            'https://assets.garmoth.com/icons/mob-types/demi.png',
          ],
          values: [
            '1 - 157',
            '158 - 213',
            '>213',
            '—',
            '—',
            '—',
            '—',
            '—',
          ],
        },
        {
          location: '卡特里废墟',
          images: [
            'https://assets.garmoth.com/items/44431.webp',
            'https://assets.garmoth.com/icons/mob-types/human.png',
          ],
          values: [
            '1 - 178',
            '179 - 245',
            '>245',
            '—',
            '—',
            '—',
            '—',
            '—',
          ],
        },
        {
          location: '月牙神殿',
          images: [
            'https://assets.garmoth.com/items/44428.webp',
            'https://assets.garmoth.com/icons/mob-types/demi.png',
          ],
          values: [
            '1 - 182',
            '183 - 245',
            '>245',
            '—',
            '—',
            '—',
            '—',
            '—',
          ],
        },
        {
          location: '卡哈兹盗贼团巢窟',
          images: [
            'https://assets.garmoth.com/items/45981.webp',
            'https://assets.garmoth.com/icons/mob-types/human.png',
          ],
          values: [
            '1 - 184',
            '185 - 245',
            '>245',
            '—',
            '—',
            '—',
            '—',
            '—',
          ],
        },
        {
          location: '巴西里斯克巢窟',
          images: [
            'https://assets.garmoth.com/items/44436.webp',
            'https://assets.garmoth.com/icons/mob-types/demi.png',
          ],
          values: [
            '1 - 252',
            '253 - 320',
            '—',
            '>320',
            '—',
            '—',
            '—',
            '—',
          ],
        },
        {
          location: '肯塔乌罗斯平原',
          images: [
            'https://assets.garmoth.com/items/44437.webp',
            'https://assets.garmoth.com/icons/mob-types/demi.png',
          ],
          values: [
            '1 - 252',
            '253 - 312',
            '>312',
            '—',
            '—',
            '—',
            '—',
            '—',
          ],
        },
        {
          location: '路德硫磺矿山',
          images: [
            'https://assets.garmoth.com/items/44439.webp',
            'https://assets.garmoth.com/icons/mob-types/demi.png',
          ],
          values: [
            '1 - 307',
            '308 - 365',
            '>365',
            '—',
            '—',
            '—',
            '—',
            '—',
          ],
        },
        {
          location: '皮拉库监狱',
          images: [
            'https://assets.garmoth.com/items/44438.webp',
            'https://assets.garmoth.com/icons/mob-types/human.png',
          ],
          values: [
            '1 - 307',
            '308 - 365',
            '>365',
            '—',
            '—',
            '—',
            '—',
            '—',
          ],
        },
        {
          location: '阿克曼寺院',
          images: [
            'https://assets.garmoth.com/items/44266.webp',
            'https://assets.garmoth.com/icons/mob-types/demi.png',
          ],
          values: [
            '1 - 347',
            '348 - 600',
            '>600',
            '—',
            '—',
            '—',
            '—',
            '—',
          ],
        },
        {
          location: '希斯特里亚废墟',
          images: [
            'https://assets.garmoth.com/items/44267.webp',
            'https://assets.garmoth.com/icons/mob-types/animal.png',
          ],
          values: [
            '1 - 384',
            '385 - 600',
            '>600',
            '—',
            '—',
            '—',
            '—',
            '—',
          ],
        },
      ],
    },
    {
      header: '卡玛西维亚',
      rows: [
        {
          location: '帕多斯营地',
          images: [
            'https://assets.garmoth.com/items/44432.webp',
            'https://assets.garmoth.com/icons/mob-types/kama.png',
          ],
          values: [
            '1 - 168',
            '169 - 280',
            '—',
            '—',
            '—',
            '—',
            '—',
            '—',
          ],
        },
        {
          location: '波利森林',
          images: [
            'https://assets.garmoth.com/items/44322.webp',
            'https://assets.garmoth.com/icons/mob-types/kama.png',
          ],
          values: [
            '1 - 189',
            '190 - 255',
            '>255',
            '—',
            '—',
            '—',
            '—',
            '—',
          ],
        },
        {
          location: '米璐慕遗迹',
          images: [
            'https://assets.garmoth.com/items/44303.webp',
            'https://assets.garmoth.com/icons/mob-types/kama.png',
          ],
          values: [
            '1 - 350',
            '351 - 380',
            '>380',
            '—',
            '—',
            '—',
            '—',
            '—',
          ],
        },
        {
          location: '曼莎温森林',
          images: [
            'https://assets.garmoth.com/items/44443.webp',
            'https://assets.garmoth.com/icons/mob-types/kama.png',
          ],
          values: [
            '1 - 363',
            '364 - 410',
            '>410',
            '—',
            '—',
            '—',
            '—',
            '—',
          ],
        },
        {
          location: '齿妖山林',
          images: [
            'https://assets.garmoth.com/items/44442.webp',
            'https://assets.garmoth.com/icons/mob-types/kama.png',
          ],
          values: [
            '1 - 363',
            '364 - 410',
            '>410',
            '—',
            '—',
            '—',
            '—',
            '—',
          ],
        },
        {
          location: '凯品拉西亚寺院',
          images: [
            'https://assets.garmoth.com/items/44324.webp',
            'https://assets.garmoth.com/icons/mob-types/kama.png',
          ],
          values: [
            '1 - 392',
            '393 - 700',
            '>700',
            '—',
            '—',
            '—',
            '—',
            '—',
          ],
        },
      ],
    },
    {
      header: '德本利堪',
      rows: [
        {
          location: '特斯拉废墟',
          images: [
            'https://assets.garmoth.com/items/44429.webp',
            'https://assets.garmoth.com/icons/mob-types/demi.png',
          ],
          values: [
            '1 - 184',
            '185 - 245',
            '>245',
            '—',
            '—',
            '—',
            '—',
            '—',
          ],
        },
        {
          location: '谢雷坎之墓(夜晚)',
          images: [
            'https://assets.garmoth.com/items/59828.webp',
            'https://assets.garmoth.com/icons/mob-types/human.png',
          ],
          values: [
            '1 - 236',
            '237 - 480',
            '>480',
            '—',
            '—',
            '—',
            '—',
            '—',
          ],
        },
        {
          location: '血狼部落',
          images: [
            'https://assets.garmoth.com/items/44435.webp',
            'https://assets.garmoth.com/icons/mob-types/demi.png',
          ],
          values: [
            '1 - 274',
            '275 - 312',
            '>312',
            '—',
            '—',
            '—',
            '—',
            '—',
          ],
        },
        {
          location: '谢雷坎之墓(白天)',
          images: [
            'https://assets.garmoth.com/items/44440.webp',
            'https://assets.garmoth.com/icons/mob-types/human.png',
          ],
          values: [
            '1 - 307',
            '308 - 365',
            '>365',
            '—',
            '—',
            '—',
            '—',
            '—',
          ],
        },
      ],
    },
    {
      header: '奥德利塔',
      rows: [
        {
          location: '荆棘森林',
          images: [
            'https://assets.garmoth.com/items/44451.webp',
            'https://assets.garmoth.com/icons/mob-types/kama.png',
          ],
          values: [
            '1 - 384',
            '385 - 600',
            '>600',
            '—',
            '—',
            '—',
            '—',
            '—',
          ],
        },
        {
          location: '屯克塔',
          images: [
            'https://assets.garmoth.com/items/44454.webp',
            'https://assets.garmoth.com/icons/mob-types/kama.png',
          ],
          values: [
            '1 - 400',
            '401 - 700',
            '>700',
            '—',
            '—',
            '—',
            '—',
            '—',
          ],
        },
        {
          location: '念头之墓',
          images: [
            'https://assets.garmoth.com/items/44450.webp',
            'https://assets.garmoth.com/icons/mob-types/kama.png',
          ],
          values: [
            '1 - 422',
            '423 - 830',
            '>830',
            '—',
            '—',
            '—',
            '—',
            '—',
          ],
        },
        {
          location: '奥伦的峡谷',
          images: [
            'https://assets.garmoth.com/items/44456.webp',
            'https://assets.garmoth.com/icons/mob-types/kama.png',
          ],
          values: [
            '1 - 442',
            '443 - 830',
            '>830',
            '—',
            '—',
            '—',
            '—',
            '—',
          ],
        },
      ],
    },
  ]

  const [showBackToTop, setShowBackToTop] = useState(false)

  usePageScroll((res) => {
    if (res.scrollTop > 300) {
      setShowBackToTop(true)
    }
    else {
      setShowBackToTop(false)
    }
  })

  return (
    <View className="min-h-screen text-white ">
      <View className="container mx-auto flex flex-col gap-6">

        <ScrollView className="space-y-6">  
          {sections.map((section, sectionIndex) => (
            <View key={sectionIndex} className="rounded-lg bg-gray-900 shadow-lg p-2">

              <View className="grid grid-cols-2 md:grid-cols-12 py-3 bg-gray-800 rounded-t-md">
                <Text className="col-span-2 md:col-span-3 px-4 text-left font-semibold text-yellow-400">{section.header}</Text>
                <Text className="text-center font-semibold">起始5%</Text>
                <Text className="text-center font-semibold">100%</Text>
                <Text className="text-center font-semibold">软上限(70%)</Text>
                <Text className="text-center font-semibold">软上限(60%)</Text>
                <Text className="text-center font-semibold">软上限(50%)</Text>
                <Text className="text-center font-semibold">软上限(30%)</Text>
                <Text className="text-center font-semibold">软上限(5%)</Text>
                <Text className="text-center font-semibold">软上限(3%)</Text>
                <Text className="text-center font-semibold">硬上限</Text>
              </View>

              {section.rows.map((row, rowIndex) => (
                <View
                  key={rowIndex}
                  className={`grid grid-cols-2 md:grid-cols-12 items-center border-t border-gray-700 py-3 ${rowIndex % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'
                  }`}
                >

                  <View className="col-span-2 md:col-span-3 flex items-center px-4">
                    <View className="flex items-center gap-3">
                      {row.images.map((image, imageIndex) => (
                        <Image
                          key={imageIndex}
                          source={{ uri: image }}
                          style={{ width: 32, height: 32, borderRadius: 8, borderWidth: 1, borderColor: '#a1a1aa' }}
                        />
                      ))}
                      <Text className=" text-yellow-400">{row.location}</Text>
                    </View>
                  </View>

                  {row.values.map((value, valueIndex) => (
                    <View
                      key={valueIndex}
                      className="flex items-center justify-center text-center px-2"
                    >
                      <Text>{value}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      </View>

      {showBackToTop && <BackTop />}
    </View>
  )
};

export default MonsterApCaps
