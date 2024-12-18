import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import Taro from '@tarojs/taro'

interface UserState {
  userName: string | null
  token: string | null
}

const initialState: UserState = {
  userName: Taro.getStorageSync('userName') || null,
  token: Taro.getStorageSync('token') || null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload
      Taro.setStorageSync('userName', action.payload)
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      Taro.setStorageSync('token', action.payload)
    },
    clearUserName: (state) => {
      state.userName = null
      state.token = null
      Taro.removeStorageSync('userName')
      Taro.removeStorageSync('token')
    },
  },
})

export const { setUserName, setToken, clearUserName } = userSlice.actions

export default userSlice.reducer
