import React, { useState } from 'react'
import { Button, Image, Navigator, Text, View } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { useDispatch, useSelector } from 'react-redux'
import Logo from '@/assets/thumb.png'
import { useGetNavItemsQuery } from '@/api/common/navApi'
import { ArrowIcon, SearchIcon } from '@/icons'
import type { RootState } from '@/store/store'

const Menu: React.FC = () => {
  const dispatch = useDispatch()
  const [showTradeList, setShowTradeList] = useState(false)
  const [isToolsActive, setIsToolsActive] = useState(false)
  const { data: navItems } = useGetNavItemsQuery()
  const router = useRouter()
  const currentPath = router.path

  const [isModalVisible, setIsModalVisible] = useState(false)
  const userName = useSelector((state: RootState) => state.user.userName)
  const isLoggedIn = !!userName

  const handleLogout = () => {
    dispatch(clearUserName())
  }

  const handleNavigate = (url: string) => {
    Taro.navigateTo({ url })
  }

  return (
    <View className="menu border-bottom-2 border-gray bg-background hidden h-12 transition lg:block">
      <View className="menu-content border-bottom-1 grid grid-cols-6 gap-3 bg-background transition border-gray">
        {/* Logo 部分 */}
        <Navigator
          url="/pages/index/index" // 请根据实际页面路径调整
          openType="navigate"
          className="menu-logo flex items-center gap-1 pl-4 hover:text-red"
        >
          <Image
            src={Logo}
            alt="HeiShaBox"
            className="logo-image h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16"
          />
          <Text className="logo-text text-2xl sm:text-xs md:text-xs lg:text-lg xl:text-2xl font-bold">
            黑沙盒子
          </Text>
          <Text className="beta-label text-xs font-bold text-red">BETA</Text>
        </Navigator>

        {/* 导航链接部分 */}
        <View className="nav-links col-span-4 flex justify-center">
          <View className="nav-container flex items-center gap-2 px-8">
            <View className="client-content visible-content">
              <View className="nav-items hidden items-center gap-2 lg:flex">
                {navItems?.map((link, index) => (
                  link.imgSrc
                    ? (
                        <Navigator
                          key={index}
                          url={link.path}
                          openType="navigate"
                          className={`nav-link my-1 flex h-9 items-center justify-center gap-1 rounded-md border-2 bg-600 pl-1 pr-2 font-semibold ${link.disabled ? 'opacity-50' : ''} ${currentPath === link.path ? 'border-primary hover:border-opacity-80' : 'border-600 hover:border-400'}`}
                        >
                          <Image
                            src={link.imgSrc}
                            alt={link.imgAlt}
                            className="nav-icon size-7 rounded-full bg-500 p-0.5"
                          />
                          <Text className="nav-label cut-text hidden xl:block">
                            {link.label}
                          </Text>
                        </Navigator>
                      )
                    : (
                        <Navigator
                          key={index}
                          url={link.path}
                          openType="navigate"
                          className={`nav-link my-1 flex h-9 items-center justify-center gap-1 rounded-md border-2 bg-600 px-2 font-semibold ${currentPath === link.path ? 'border-primary hover:border-opacity-80' : 'border-600 hover:border-400'}`}
                        >
                          <Text className="nav-label cut-text">
                            {link.label}
                          </Text>
                        </Navigator>
                      )
                ))}
                {/* 保留的注释部分，可以根据需要启用 */}
                {/*
                                <Navigator url="/pages/tools/tools" openType="navigate" className="nav-link my-1 flex h-9 items-center justify-center gap-1 rounded-md border-2 bg-600 px-2 font-semibold hover:border-400" onClick={() => setIsToolsActive(!isToolsActive)}>
                                    <Text className="cut-text">工具</Text>
                                    <ArrowIcon direction={isToolsActive ? 'up' : 'down'} />
                                </Navigator>
                                <Navigator url="/pages/guides/guides" openType="navigate" className="nav-link my-1 flex h-9 items-center justify-center gap-1 rounded-md border-2 bg-600 px-2 font-semibold hover:border-400">
                                    <Text className="cut-text">指南</Text>
                                    <ArrowIcon direction="down" />
                                </Navigator>
                                <View className="search-button hidden lg:block">
                                    <Button className="search-btn my-1 flex h-9 items-center justify-center gap-1 rounded-md border-2 bg-600 px-2 font-semibold hover:border-400">
                                        <SearchIcon className="icon" />
                                    </Button>
                                </View>
                                */}
              </View>
            </View>
          </View>
        </View>

        {/* 用户信息部分 */}
        <View className="user-section flex items-center justify-end">
          <View className="user-info mr-4 flex h-12 items-center gap-1">
            {isLoggedIn ? (
              <View className="logged-in flex h-10 items-center gap-1 rounded px-2 text-lg font-bold">
                <Text>你好,</Text>
                <Navigator
                  url="/pages/user-info/user-info" // 请根据实际页面路径调整
                  openType="navigate"
                  className="user-name flex items-center hover:text-red"
                >
                  {userName}
                </Navigator>
                <Text>!</Text>
                <Button onClick={handleLogout} className="logout-btn ml-2 text-sm text-blue-500 underline">登出</Button>
              </View>
            ) : (
              <Button
                onClick={() => setIsModalVisible(true)}
                className="login-btn flex items-center gap-1 rounded px-2 text-lg font-bold"
                style={{
                  background: 'linear-gradient(121deg, rgb(88, 101,242) 0%, rgb(64, 78,237) 100%)',
                }}
              >
                登录
              </Button>
            )}
          </View>
        </View>
      </View>

      {/* 交易列表部分 */}
      <View className="trade-list-container relative">
        {/* <TradeList show={showTradeList} /> */}
      </View>

    </View>
  )
}

export default Menu
