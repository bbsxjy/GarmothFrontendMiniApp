import { Loading } from '@nutui/icons-react-taro'
import { View } from '@tarojs/components'

function Spinner() {
  return (
    <View
      className="container-xl flex justify-center items-center"
      style={{
        minHeight: '100vh',
      }}
    >
      <Loading />
    </View>
  )
}
export default Spinner
