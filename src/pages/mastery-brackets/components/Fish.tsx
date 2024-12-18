import { ScrollView, Text, View } from '@tarojs/components'

function Fish() {
  return (
    <ScrollView className="bg-600 overflow-auto rounded-md p-3">
      <View>
        <View className="table">
          <View className="thead">
            <View className="tr text-sm">
              <Text className="px-2">熟练度</Text>
              <Text className="max-w-[10rem] px-2">珍稀鱼捕获几率</Text>
              <Text className="max-w-[10rem] px-2">珍宝鱼类获得几率等级</Text>
            </View>
          </View>
          <View className="tbody">
            {[
              { id: 'mast-0', proficiency: 0, catchRate: '+0.00%', treasureRate: '+0' },
              { id: 'mast-50', proficiency: 50, catchRate: '+0.13%', treasureRate: '+0' },
              { id: 'mast-100', proficiency: 100, catchRate: '+0.25%', treasureRate: '+0' },
              { id: 'mast-150', proficiency: 150, catchRate: '+0.38%', treasureRate: '+0' },
              { id: 'mast-200', proficiency: 200, catchRate: '+0.50%', treasureRate: '+1' },
            ].map(row => (
              <View
                key={row.id}
                id={row.id}
                className="tr text-100 number text-center hover:bg-500"
              >
                <View className="td py-1 font-semibold text-white">{row.proficiency}</View>
                <View className="td">
                  <View>{row.catchRate}</View>
                </View>
                <View className="td">
                  <View>{row.treasureRate}</View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default Fish
