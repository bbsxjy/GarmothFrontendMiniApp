import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Taro from '@tarojs/taro'
import { Button, Form, Input, Text, View } from '@tarojs/components'
import { AtButton, AtIcon, AtList, AtListItem } from 'taro-ui'
import classNames from 'classnames'
import { toast } from 'react-toastify'
import type { RootState } from '@/store/store'
import { useChangePasswordMutation, useGetCurrentUserQuery } from '@/api/users'
import './index.scss'
import Spinner from '@/components/Loading'

interface UserData {
  userName: string
  activityPoints: number
  platformRanking: number
  registeredAt: string
  platformUserId: string
  likes?: number
  favoriteTags?: string[]
}

function UserInfo() {
  const [changePassword] = useChangePasswordMutation()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordConfirmed, setNewPasswordConfirmed] = useState('')
  const [error, setError] = useState('')
  const userName = useSelector((state: RootState) => state.user.userName)
  const token = useSelector((state: RootState) => state.user.token)
  const isLoggedIn = !!userName
  const { data = {
    userName: '用户123901123',
    activityPoints: 2000,
    platformRanking: 10,
    registeredAt: '2024-11-11 00:00:00',
    platformUserId: '用户123901123',
    likes: 256,
    favoriteTags: ['狩猎', '世界boss'],
  } as UserData, isLoading } = useGetCurrentUserQuery(token ?? '', {
    skip: !token,
  })

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error('未登录用户！')
    }
  }, [token])

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.detail.value)
  }

  const handleNewPasswordChange = (e) => {
    const value = e.detail.value
    setNewPassword(value)
    if (value.length < 8) {
      setError('新密码必须至少包含8个字符。')
      return
    }
    if (newPasswordConfirmed && value !== newPasswordConfirmed) {
      setError('新密码和确认密码不匹配。')
      return
    }
    setError('')
  }

  const handleConfirmPasswordChange = (e) => {
    const value = e.detail.value
    setNewPasswordConfirmed(value)

    if (value.length < 8) {
      setError('新密码必须至少包含8个字符。')
      return
    }

    if (newPassword && value !== newPassword) {
      setError('新密码和确认密码不匹配。')
      return
    }

    setError('')
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()

    if (currentPassword === newPassword || error) {
      setError('新密码不可以和原密码一样！')
      return
    }

    try {
      await changePassword({
        token,
        currentPassword,
        newPassword,
      }).unwrap()

      toast.success('密码修改成功，下次登录请使用新密码！')
      setCurrentPassword('')
      setNewPassword('')
      setNewPasswordConfirmed('')
    }
    catch (error: any) {
      toast.error(error.data.message)
    }
  }
  const navigateToFavorites = () => {
    Taro.navigateTo({ url: '/pages/my-likes/index' })
  }

  const navigateToChangePassword = () => {
    Taro.navigateTo({ url: '/pages/change-password/index' })
  }

  const navigateToAboutUs = () => {
    Taro.navigateTo({ url: '/pages/about-us/index' })
  }

  return (
    <View className="min-h-screen mx-auto bg-gray-50 py-10 px-4 ">
      {isLoading
        ? (
            <Spinner />
          )
        : (
            <View className=" rounded-2xl shadow-lg overflow-hidden">
              <View className="px-6 py-8">
                <View className="flex items-center mb-6">
                  <View className="w-20 h-20 bg-blue-500 rounded-full flex justify-center items-center shadow-md">
                    <Text className="text-white text-3xl font-bold">
                      {data?.userName?.[0]}
                    </Text>
                  </View>
                  <View className="ml-6">
                    <Text className="text-2xl font-bold text-gray-800">
                      {data?.userName}
                    </Text>
                    <View className="flex items-center mt-2">
                      <AtIcon value="money" size={18} color="#4a90e2" />
                      <Text className="ml-2 text-sm text-gray-600">
                        盒子积分：
                        {data?.activityPoints}
                      </Text>
                    </View>
                  </View>
                </View>
                <View className="px-4 py-3 bg-gray-50  mt-4">
                  <View className="flex items-center mb-2">
                    <AtIcon value="tag" size={18} color="#4a90e2" />
                    <Text className="ml-2 text-sm font-semibold text-gray-700">
                      我的标签
                    </Text>
                  </View>
                  <View className="flex flex-wrap">
                    {data?.favoriteTags?.map((tag, index) => (
                      <View
                        key={index}
                        className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs mr-2 mb-2"
                      >
                        {tag}
                      </View>
                    ))}
                  </View>
                </View>
                <AtList hasBorder={false}>
                  <AtListItem
                    title="注册时间"
                    extraText={String(data?.registeredAt)}
                    iconInfo={{
                      value: 'calendar',
                      size: 22,
                      color: '#32c75a',
                    }}
                  />
                  <AtListItem
                    title="盒子等级"
                    extraText={String(data?.platformRanking)}
                    iconInfo={{
                      value: 'bullet-list',
                      size: 22,
                      color: '#ffcc00',
                    }}
                  />

                  <AtListItem
                    title="我的喜欢"
                    onClick={navigateToFavorites}
                    arrow="right"
                    iconInfo={{
                      value: 'heart',
                      size: 22,
                      color: '#ff5b5b',
                    }}
                  />
                  <AtListItem
                    title="更改密码"
                    onClick={navigateToChangePassword}
                    arrow="right"
                    iconInfo={{
                      value: 'edit',
                      size: 22,
                      color: '#4a90e2',
                    }}
                  />
                  <AtListItem
                    title="关于我们"
                    onClick={navigateToAboutUs}
                    arrow="right"
                    iconInfo={{
                      value: 'help',
                      size: 22,
                      color: '#32c75a',
                    }}
                  />
                </AtList>
              </View>
            </View>
          )}
    </View>
  )
}

export default UserInfo
