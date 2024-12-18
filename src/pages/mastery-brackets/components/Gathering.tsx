import { Image, ScrollView, Text, View } from '@tarojs/components'

function Gathering() {
  return (
    <ScrollView className="bg-600 overflow-auto rounded-md p-3">
      <View>
        <View className="table">
          <View className="thead">
            <View className="tr">
              <View className="th"></View>
              <View className="th">
                <View className="flex items-center justify-center gap-2 rounded bg-600 bg-opacity-50 p-1">
                  <Image
                    src="https://assets.garmoth.com/items/7903.webp"
                    mode="aspectFill"
                    className="size-8"
                  />
                  <Text>常见</Text>
                  <Image
                    src="https://assets.garmoth.com/items/5010.webp"
                    mode="aspectFill"
                    className="size-8"
                  />
                </View>
              </View>
              <View className="th" colSpan={2}>
                <View className="flex items-center justify-center gap-2 rounded bg-600 bg-opacity-50 p-1">
                  <Image
                    src="https://assets.garmoth.com/items/50810.webp"
                    mode="aspectFill"
                    className="size-8"
                  />
                  <Text>特殊</Text>
                  <Image
                    src="https://assets.garmoth.com/items/54031.webp"
                    mode="aspectFill"
                    className="size-8"
                  />
                </View>
              </View>
              <View className="th" colSpan={2}>
                <View className="flex items-center justify-center gap-2 rounded bg-600 bg-opacity-50 p-1">
                  <Image
                    src="https://assets.garmoth.com/items/4999.webp"
                    mode="aspectFill"
                    className="size-8"
                  />
                  <Text>稀有</Text>
                  <Image
                    src="https://assets.garmoth.com/items/721002.webp"
                    mode="aspectFill"
                    className="size-8"
                  />
                </View>
              </View>
              <View className="th" colSpan={2}>
                <View className="flex items-center justify-center gap-2 rounded bg-600 bg-opacity-50 p-1">
                  <Image
                    src="https://assets.garmoth.com/items/4997.webp"
                    mode="aspectFill"
                    className="size-8"
                  />
                  <Text>珍贵</Text>
                  <Image
                    src="https://assets.garmoth.com/items/721003.webp"
                    mode="aspectFill"
                    className="size-8"
                  />
                </View>
              </View>
            </View>
            <View className="tr text-sm">
              <View className="th px-2">熟练度</View>
              <View className="th max-w-[10rem] px-2">常见物品获得率</View>
              <View className="th max-w-[10rem] px-2">掉落量增加</View>
              <View className="th max-w-[10rem] px-2">特殊物品获得率</View>
              <View className="th max-w-[10rem] px-2">掉落量增加</View>
              <View className="th max-w-[10rem] px-2">稀有物品获得率</View>
              <View className="th max-w-[10rem] px-2">掉落量增加</View>
              <View className="th max-w-[10rem] px-2">珍贵物品获得率</View>
              <View className="th max-w-[10rem] px-2">掉落量增加</View>
            </View>
          </View>
          <View className="tbody">
            {[
              {
                id: 'mast-0',
                proficiency: 0,
                commonRate: '0.00%',
                specialRate: '0.00%',
                rareRate: '0.00%',
                preciousRate: '0.00%',
                commonDrop: '0.00%',
                specialDrop: '0.00%',
                rareDrop: '0.00%',
                preciousDrop: '0.00%',
              },
              {
                id: 'mast-50',
                proficiency: 50,
                commonRate: '0.00%',
                specialRate: '8.00%',
                rareRate: '10.00%',
                preciousRate: '5.33%',
                commonDrop: '16.00%',
                specialDrop: '4.00%',
                rareDrop: '3.33%',
                preciousDrop: '1.78%',
              },
              // 继续添加其他数据...
            ].map(row => (
              <View
                key={row.id}
                id={row.id}
                className="tr text-100 number text-center hover:bg-500"
              >
                <View className="td py-1 font-semibold text-white">{row.proficiency}</View>
                <View className="td">{row.commonRate}</View>
                <View className="td">{row.commonDrop}</View>
                <View className="td">{row.specialRate}</View>
                <View className="td">{row.specialDrop}</View>
                <View className="td">{row.rareRate}</View>
                <View className="td">{row.rareDrop}</View>
                <View className="td">{row.preciousRate}</View>
                <View className="td">{row.preciousDrop}</View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default Gathering
