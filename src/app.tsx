import type { PropsWithChildren } from 'react'
import { useLaunch } from '@tarojs/taro'
import { Provider } from 'react-redux'
import { store } from './store/store'
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'
import './app.scss'
import bg from './assets/page-bg.jpg'

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {})

  return (
    <Provider store={store}>
      <div>
        {children}
      </div>
    </Provider>
  )
}

export default App
