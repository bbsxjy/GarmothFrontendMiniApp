import React from 'react'
import { Image, Text, View } from '@tarojs/components'

const TierList: React.FC = () => {
  return (
    <View className="container-lg space-y-3">
      <View className="flex items-center justify-between gap-3">
        <View className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            className="icon text-2xl"
            width="1em"
            height="1em"
            viewBox="0 0 640 512"

          >
            <path
              fill="currentColor"
              d="M353.8 54.1L330.2 6.3c-3.9-8.3-16.1-8.6-20.4 0l-23.6 47.8l-52.3 7.5c-9.3 1.4-13.3 12.9-6.4 19.8l38 37l-9 52.1c-1.4 9.3 8.2 16.5 16.8 12.2l46.9-24.8l46.6 24.4c8.6 4.3 18.3-2.9 16.8-12.2l-9-52.1l38-36.6c6.8-6.8 2.9-18.3-6.4-19.8l-52.3-7.5zM256 256c-17.7 0-32 14.3-32 32v192c0 17.7 14.3 32 32 32h128c17.7 0 32-14.3 32-32V288c0-17.7-14.3-32-32-32zM32 320c-17.7 0-32 14.3-32 32v128c0 17.7 14.3 32 32 32h128c17.7 0 32-14.3 32-32V352c0-17.7-14.3-32-32-32zm416 96v64c0 17.7 14.3 32 32 32h128c17.7 0 32-14.3 32-32v-64c0-17.7-14.3-32-32-32H480c-17.7 0-32 14.3-32 32"
            />
          </svg>
          <h1>PVE职业排名（根据刷怪速度，仅作参考）</h1>
        </View>
      </View>
      <View className="rounded-md bg-700 p-3">
        <View className="relative flex gap-3 border-b border-400 p-3">
          <View
            className="absolute left-0 top-0 select-none text-xs"
            style={{ opacity: '0.01' }}
          >
            356240483921559572
          </View>
          <View className="dcc w-20 flex-none text-3xl font-bold text-red">S</View>
          <View className="col-span-10 flex flex-wrap gap-3">
            {/* <View> */}
            {/*  <View className="relative"> */}

            {/*    <img */}
            {/*      src="https://assets.garmoth.com/classes/200/20.webp" */}
            {/*      alt="" */}
            {/*      className="size-16" */}
            {/*    /> */}

            {/*  </View> */}
            {/*  <View className="mt-2 text-center"> */}
            {/*    <Text className="text-xs">诺娃</Text> */}
            {/*    <Text className="text-sm text-200">觉醒</Text> */}
            {/*  </View> */}
            {/* </View> */}
            <View>
              <View className="relative">

                <img
                  src="https://assets.garmoth.com/classes/200/6.webp"
                  alt=""
                  className="size-16"
                />

              </View>
              <View className="mt-2 text-center">
                <Text className="text-xs">女巫</Text>
                <Text className="text-sm text-200">继承</Text>
              </View>
            </View>
            <View>
              <View className="relative">

                <img
                  src="https://assets.garmoth.com/classes/200/18.webp"
                  alt=""
                  className="size-16"
                />

              </View>
              <View className="mt-2 text-center">
                <Text className="text-xs">守护者</Text>
                <Text className="text-sm text-200">继承</Text>
              </View>
            </View>
            <View>
              <View className="relative">

                <img
                  src="https://assets.garmoth.com/classes/200/15.webp"
                  alt=""
                  className="size-16"
                />

                <View className="absolute -right-1 -top-1 rounded-lg bg-700">
                  <svg

                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    role="img"
                    className="icon text-orange v-popper--has-tooltip"
                    width="20px"
                    height="20px"
                    viewBox="0 0 256 256"
                  >
                    <path
                      fill="currentColor"
                      d="M143.38 17.85a8 8 0 0 0-12.63 3.41l-22 60.41l-24.16-23.41a8 8 0 0 0-11.93.89C51 87.53 40 116.08 40 144a88 88 0 0 0 176 0c0-59.45-50.79-108-72.62-126.15m40.51 135.49a57.6 57.6 0 0 1-46.56 46.55a7.7 7.7 0 0 1-1.33.11a8 8 0 0 1-1.32-15.89c16.57-2.79 30.63-16.85 33.44-33.45a8 8 0 0 1 15.78 2.68Z"
                    />
                  </svg>
                </View>
              </View>
              <View className="mt-2 text-center">
                <Text className="text-xs">兰</Text>
                <Text className="text-sm text-200">继承</Text>
              </View>
            </View>
          </View>
        </View>
        <View className="relative flex gap-3 border-b border-400 p-3">
          <View
            className="absolute left-0 top-0 select-none text-xs"
            style={{ opacity: '0.01' }}
          >
            356240483921559572
          </View>
          <View className="dcc w-20 flex-none text-3xl font-bold text-orange">A</View>
          <View className="col-span-10 flex flex-wrap gap-3">
            {/* <View> */}
            {/*    <View className="relative"> */}

            {/*        <img */}
            {/*            src="https://assets.garmoth.com/classes/200/27.webp" */}
            {/*            alt="" */}
            {/*            className="size-16" */}
            {/*        /> */}

            {/*    </View> */}
            {/*    <View className="mt-2 text-center"> */}
            {/*        <Text className="text-xs">Dosa</Text> */}
            {/*        <Text className="text-sm text-200">继承</Text> */}
            {/*    </View> */}
            {/* </View> */}
            <View>
              <View className="relative">

                <img
                  src="https://assets.garmoth.com/classes/200/10.webp"
                  alt=""
                  className="size-16"
                />

              </View>
              <View className="mt-2 text-center">
                <Text className="text-xs">忍者</Text>
                <Text className="text-sm text-200">继承</Text>
              </View>
            </View>
            <View>
              <View className="relative">

                <img
                  src="https://assets.garmoth.com/classes/200/16.webp"
                  alt=""
                  className="size-16"
                />

              </View>
              <View className="mt-2 text-center">
                <Text className="text-xs">巡林者</Text>
                <Text className="text-sm text-200">觉醒</Text>
              </View>
            </View>
            <View>
              <View className="relative">

                <img
                  src="https://assets.garmoth.com/classes/200/12.webp"
                  alt=""
                  className="size-16"
                />

              </View>
              <View className="mt-2 text-center">
                <Text className="text-xs">黑暗骑士</Text>
                <Text className="text-sm text-200">觉醒</Text>
              </View>
            </View>
            {/* <View> */}
            {/*    <View className="relative"> */}

            {/*        <img */}
            {/*            src="https://assets.garmoth.com/classes/200/25.webp" */}
            {/*            alt="" */}
            {/*            className="size-16" */}
            {/*        /> */}

            {/*        <View className="absolute -right-1 -top-1 rounded-lg bg-700"> */}
            {/*            <svg */}
            {/*                 */}
            {/*                xmlns="http://www.w3.org/2000/svg" */}
            {/*                xmlnsXlink="http://www.w3.org/1999/xlink" */}
            {/*                aria-hidden="true" */}
            {/*                role="img" */}
            {/*                className="icon text-red v-popper--has-tooltip" */}
            {/*                width="20px" */}
            {/*                height="20px" */}
            {/*                viewBox="0 0 256 256" */}
            {/*            > */}
            {/*                <path */}
            {/*                    fill="currentColor" */}
            {/*                    d="M143.38 17.85a8 8 0 0 0-12.63 3.41l-22 60.41l-24.16-23.41a8 8 0 0 0-11.93.89C51 87.53 40 116.08 40 144a88 88 0 0 0 176 0c0-59.45-50.79-108-72.62-126.15m40.51 135.49a57.6 57.6 0 0 1-46.56 46.55a7.7 7.7 0 0 1-1.33.11a8 8 0 0 1-1.32-15.89c16.57-2.79 30.63-16.85 33.44-33.45a8 8 0 0 1 15.78 2.68Z" */}
            {/*                /> */}
            {/*            </svg> */}
            {/*        </View> */}
            {/*    </View> */}
            {/*    <View className="mt-2 text-center"> */}
            {/*        <Text className="text-xs">魅狐</Text> */}
            {/*        <Text className="text-sm text-200">继承</Text> */}
            {/*    </View> */}
            {/* </View> */}
            <View>
              <View className="relative">

                <img
                  src="https://assets.garmoth.com/classes/200/19.webp"
                  alt=""
                  className="size-16"
                />

              </View>
              <View className="mt-2 text-center">
                <Text className="text-xs">哈萨辛</Text>
                <Text className="text-sm text-200">觉醒</Text>
              </View>
            </View>
            <View>
              <View className="relative">

                <img
                  src="https://assets.garmoth.com/classes/200/1.webp"
                  alt=""
                  className="size-16"
                />

              </View>
              <View className="mt-2 text-center">
                <Text className="text-xs">游侠</Text>
                <Text className="text-sm text-200">觉醒</Text>
              </View>
            </View>
            <View>
              <View className="relative">

                <img
                  src="https://assets.garmoth.com/classes/200/14.webp"
                  alt=""
                  className="size-16"
                />

              </View>
              <View className="mt-2 text-center">
                <Text className="text-xs">女斗神</Text>
                <Text className="text-sm text-200">觉醒</Text>
              </View>
            </View>
            <View>
              <View className="relative">

                <img
                  src="https://assets.garmoth.com/classes/200/5.webp"
                  alt=""
                  className="size-16"
                />

              </View>
              <View className="mt-2 text-center">
                <Text className="text-xs">战士</Text>
                <Text className="text-sm text-200">继承</Text>
              </View>
            </View>
            <View>
              <View className="relative">

                <img
                  src="https://assets.garmoth.com/classes/200/18.webp"
                  alt=""
                  className="size-16"
                />

                <View className="absolute -right-1 -top-1 rounded-lg bg-700">
                  <svg

                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    role="img"
                    className="icon text-yellow v-popper--has-tooltip"
                    width="20px"
                    height="20px"
                    viewBox="0 0 256 256"
                  >
                    <path
                      fill="currentColor"
                      d="M143.38 17.85a8 8 0 0 0-12.63 3.41l-22 60.41l-24.16-23.41a8 8 0 0 0-11.93.89C51 87.53 40 116.08 40 144a88 88 0 0 0 176 0c0-59.45-50.79-108-72.62-126.15m40.51 135.49a57.6 57.6 0 0 1-46.56 46.55a7.7 7.7 0 0 1-1.33.11a8 8 0 0 1-1.32-15.89c16.57-2.79 30.63-16.85 33.44-33.45a8 8 0 0 1 15.78 2.68Z"
                    />
                  </svg>
                </View>
              </View>
              <View className="mt-2 text-center">
                <Text className="text-xs">守护者</Text>
                <Text className="text-sm text-200">觉醒</Text>
              </View>
            </View>
            <View>
              <View className="relative">

                <img
                  src="https://assets.garmoth.com/classes/200/7.webp"
                  alt=""
                  className="size-16"
                />

              </View>
              <View className="mt-2 text-center">
                <Text className="text-xs">魔法师</Text>
                <Text className="text-sm text-200">继承</Text>
              </View>
            </View>
            <View>
              <View className="relative">

                <img
                  src="https://assets.garmoth.com/classes/200/8.webp"
                  alt=""
                  className="size-16"
                />

              </View>
              <View className="mt-2 text-center">
                <Text className="text-xs">武士</Text>
                <Text className="text-sm text-200">觉醒</Text>
              </View>
            </View>
            <View>
              <View className="relative">

                <img
                  src="https://assets.garmoth.com/classes/200/26.webp"
                  alt=""
                  className="size-16"
                />

              </View>
              <View className="mt-2 text-center">
                <Text className="text-xs">重力术士</Text>
                <Text className="text-sm text-200">觉醒</Text>
              </View>
            </View>
          </View>
        </View>
        <View className="relative flex gap-3 border-b border-400 p-3">
          <View
            className="absolute left-0 top-0 select-none text-xs"
            style={{ opacity: '0.01' }}
          >
            356240483921559572
          </View>
          <View className="dcc w-20 flex-none text-3xl font-bold text-green">B</View>
          <View className="col-span-10 flex flex-wrap gap-3">
            <View>
              <View className="relative">

                <img
                  src="https://assets.garmoth.com/classes/200/0.webp"
                  alt=""
                  className="size-16"
                />

              </View>
              <View className="mt-2 text-center">
                <Text className="text-xs">捷特巨人</Text>
                <Text className="text-sm text-200">继承</Text>
              </View>
            </View>
            <View>
              <View className="relative">

                <img
                  src="https://assets.garmoth.com/classes/200/9.webp"
                  alt=""
                  className="size-16"
                />

              </View>
              <View className="mt-2 text-center">
                <Text className="text-xs">梅花</Text>
                <Text className="text-sm text-200">觉醒</Text>
              </View>
            </View>
            <View>
              <View className="relative">

                <img
                  src="https://assets.garmoth.com/classes/200/6.webp"
                  alt=""
                  className="size-16"
                />

                <View className="absolute -right-1 -top-1 rounded-lg bg-700">
                  <svg

                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    role="img"
                    className="icon text-yellow v-popper--has-tooltip"
                    width="20px"
                    height="20px"
                    viewBox="0 0 256 256"
                  >
                    <path
                      fill="currentColor"
                      d="M143.38 17.85a8 8 0 0 0-12.63 3.41l-22 60.41l-24.16-23.41a8 8 0 0 0-11.93.89C51 87.53 40 116.08 40 144a88 88 0 0 0 176 0c0-59.45-50.79-108-72.62-126.15m40.51 135.49a57.6 57.6 0 0 1-46.56 46.55a7.7 7.7 0 0 1-1.33.11a8 8 0 0 1-1.32-15.89c16.57-2.79 30.63-16.85 33.44-33.45a8 8 0 0 1 15.78 2.68Z"
                    />
                  </svg>
                </View>
              </View>
              <View className="mt-2 text-center">
                <Text className="text-xs">女巫</Text>
                <Text className="text-sm text-200">觉醒</Text>
              </View>
            </View>
            <View>
              <View className="relative">

                <img
                  src="https://assets.garmoth.com/classes/200/11.webp"
                  alt=""
                  className="size-16"
                />

              </View>
              <View className="mt-2 text-center">
                <Text className="text-xs">女忍者</Text>
                <Text className="text-sm text-200">觉醒</Text>
              </View>
            </View>
            {/* <View> */}
            {/*    <View className="relative"> */}

            {/*        <img */}
            {/*            src="https://assets.garmoth.com/classes/200/24.webp" */}
            {/*            alt="" */}
            {/*            className="size-16" */}
            {/*        /> */}

            {/*        <View className="absolute -right-1 -top-1 rounded-lg bg-700"> */}
            {/*            <svg */}
            {/*                 */}
            {/*                xmlns="http://www.w3.org/2000/svg" */}
            {/*                xmlnsXlink="http://www.w3.org/1999/xlink" */}
            {/*                aria-hidden="true" */}
            {/*                role="img" */}
            {/*                className="icon text-red v-popper--has-tooltip" */}
            {/*                width="20px" */}
            {/*                height="20px" */}
            {/*                viewBox="0 0 256 256" */}
            {/*            > */}
            {/*                <path */}
            {/*                    fill="currentColor" */}
            {/*                    d="M143.38 17.85a8 8 0 0 0-12.63 3.41l-22 60.41l-24.16-23.41a8 8 0 0 0-11.93.89C51 87.53 40 116.08 40 144a88 88 0 0 0 176 0c0-59.45-50.79-108-72.62-126.15m40.51 135.49a57.6 57.6 0 0 1-46.56 46.55a7.7 7.7 0 0 1-1.33.11a8 8 0 0 1-1.32-15.89c16.57-2.79 30.63-16.85 33.44-33.45a8 8 0 0 1 15.78 2.68Z" */}
            {/*                /> */}
            {/*            </svg> */}
            {/*        </View> */}
            {/*    </View> */}
            {/*    <View className="mt-2 text-center"> */}
            {/*        <Text className="text-xs">羽士</Text> */}
            {/*        <Text className="text-sm text-200">继承</Text> */}
            {/*    </View> */}
            {/* </View> */}
            <View>
              <View className="relative">

                <img
                  src="https://assets.garmoth.com/classes/200/0.webp"
                  alt=""
                  className="size-16"
                />

              </View>
              <View className="mt-2 text-center">
                <Text className="text-xs">捷特巨人</Text>
                <Text className="text-sm text-200">觉醒</Text>
              </View>
            </View>
            <View>
              <View className="relative">

                <img
                  src="https://assets.garmoth.com/classes/200/11.webp"
                  alt=""
                  className="size-16"
                />

              </View>
              <View className="mt-2 text-center">
                <Text className="text-xs">女忍者</Text>
                <Text className="text-sm text-200">继承</Text>
              </View>
            </View>
            <View>
              <View className="relative">

                <img
                  src="https://assets.garmoth.com/classes/200/9.webp"
                  alt=""
                  className="size-16"
                />

              </View>
              <View className="mt-2 text-center">
                <Text className="text-xs">梅花</Text>
                <Text className="text-sm text-200">继承</Text>
              </View>
            </View>
            <View>
              <View className="relative">

                <img
                  src="https://assets.garmoth.com/classes/200/3.webp"
                  alt=""
                  className="size-16"
                />

              </View>
              <View className="mt-2 text-center">
                <Text className="text-xs">苏琅</Text>
                <Text className="text-sm text-200">继承</Text>
              </View>
            </View>
            <View>
              <View className="relative">

                <img
                  src="https://assets.garmoth.com/classes/200/7.webp"
                  alt=""
                  className="size-16"
                />

              </View>
              <View className="mt-2 text-center">
                <Text className="text-xs">魔法师</Text>
                <Text className="text-sm text-200">觉醒</Text>
              </View>
            </View>
            <View>
              <View className="relative">

                <img
                  src="https://assets.garmoth.com/classes/200/10.webp"
                  alt=""
                  className="size-16"
                />

              </View>
              <View className="mt-2 text-center">
                <Text className="text-xs">忍者</Text>
                <Text className="text-sm text-200">觉醒</Text>
              </View>
            </View>
            <View>
              <View className="relative">

                <img
                  src="https://assets.garmoth.com/classes/200/3.webp"
                  alt=""
                  className="size-16"
                />

              </View>
              <View className="mt-2 text-center">
                <Text className="text-xs">苏琅</Text>
                <Text className="text-sm text-200">觉醒</Text>
              </View>
            </View>
            {/* <View> */}
            {/*    <View className="relative"> */}

            {/*        <img */}
            {/*            src="https://assets.garmoth.com/classes/200/25.webp" */}
            {/*            alt="" */}
            {/*            className="size-16" */}
            {/*        /> */}

            {/*    </View> */}
            {/*    <View className="mt-2 text-center"> */}
            {/*        <Text className="text-xs">魅狐</Text> */}
            {/*        <Text className="text-sm text-200">觉醒</Text> */}
            {/*    </View> */}
            {/* </View> */}
            <View>
              <View className="relative">

                <img
                  src="https://assets.garmoth.com/classes/200/1.webp"
                  alt=""
                  className="size-16"
                />

              </View>
              <View className="mt-2 text-center">
                <Text className="text-xs">游侠</Text>
                <Text className="text-sm text-200">继承</Text>
              </View>
            </View>
            <View>
              <View className="relative">

                <img
                  src="https://assets.garmoth.com/classes/200/2.webp"
                  alt=""
                  className="size-16"
                />

              </View>
              <View className="mt-2 text-center">
                <Text className="text-xs">魔女</Text>
                <Text className="text-sm text-200">觉醒</Text>
              </View>
            </View>
            {/* <View> */}
            {/*    <View className="relative"> */}

            {/*        <img */}
            {/*            src="https://assets.garmoth.com/classes/200/21.webp" */}
            {/*            alt="" */}
            {/*            className="size-16" */}
            {/*        /> */}

            {/*    </View> */}
            {/*    <View className="mt-2 text-center"> */}
            {/*        <Text className="text-xs">大贤者</Text> */}
            {/*        <Text className="text-sm text-200">觉醒</Text> */}
            {/*    </View> */}
            {/* </View> */}
            <View>
              <View className="relative">

                <img
                  src="https://assets.garmoth.com/classes/200/19.webp"
                  alt=""
                  className="size-16"
                />

              </View>
              <View className="mt-2 text-center">
                <Text className="text-xs">哈萨辛</Text>
                <Text className="text-sm text-200">继承</Text>
              </View>
            </View>
            <View>
              <View className="relative">

                <img
                  src="https://assets.garmoth.com/classes/200/4.webp"
                  alt=""
                  className="size-16"
                />

              </View>
              <View className="mt-2 text-center">
                <Text className="text-xs">女武神</Text>
                <Text className="text-sm text-200">觉醒</Text>
              </View>
            </View>
          </View>
        </View>
        <View className="relative flex gap-3 border-b border-400 p-3">
          <View
            className="absolute left-0 top-0 select-none text-xs"
            style={{ opacity: '0.01' }}
          >
            356240483921559572
          </View>
          <View className="dcc w-20 flex-none text-3xl font-bold text-yellow">C</View>
          <View className="col-span-10 flex flex-wrap gap-3">
            <View>
              <View className="relative">

                <img
                  src="https://assets.garmoth.com/classes/200/2.webp"
                  alt=""
                  className="size-16"
                />

              </View>
              <View className="mt-2 text-center">
                <Text className="text-xs">魔女</Text>
                <Text className="text-sm text-200">继承</Text>
              </View>
            </View>
            {/* <View> */}
            {/*    <View className="relative"> */}

            {/*        <img */}
            {/*            src="https://assets.garmoth.com/classes/200/24.webp" */}
            {/*            alt="" */}
            {/*            className="size-16" */}
            {/*        /> */}

            {/*    </View> */}
            {/*    <View className="mt-2 text-center"> */}
            {/*        <Text className="text-xs">羽士</Text> */}
            {/*        <Text className="text-sm text-200">觉醒</Text> */}
            {/*    </View> */}
            {/* </View> */}
            <View>
              <View className="relative">

                <img
                  src="https://assets.garmoth.com/classes/200/5.webp"
                  alt=""
                  className="size-16"
                />

              </View>
              <View className="mt-2 text-center">
                <Text className="text-xs">战士</Text>
                <Text className="text-sm text-200">觉醒</Text>
              </View>
            </View>
            {/* <View> */}
            {/*    <View className="relative"> */}
            {/*        <View className="dcc absolute inset-0 z-10 text-center text-xs font-bold text-red"> */}
            {/*            <View className="rounded bg-700/75 backdrop-blur-sm">Few Hours</View> */}
            {/*        </View> */}
            {/*        <img */}
            {/*            src="https://assets.garmoth.com/classes/200/22.webp" */}
            {/*            alt="" */}
            {/*            className="opacity-50 size-16" */}
            {/*        /> */}

            {/*    </View> */}
            {/*    <View className="mt-2 text-center"> */}
            {/*        <Text className="text-xs">柯塞尔</Text> */}
            {/*        <Text className="text-sm text-200">觉醒</Text> */}
            {/*    </View> */}
            {/* </View> */}
            <View>
              <View className="relative">

                <img
                  src="https://assets.garmoth.com/classes/200/13.webp"
                  alt=""
                  className="size-16"
                />

              </View>
              <View className="mt-2 text-center">
                <Text className="text-xs">格斗家</Text>
                <Text className="text-sm text-200">继承</Text>
              </View>
            </View>
            {/* <View> */}
            {/*    <View className="relative"> */}

            {/*        <img */}
            {/*            src="https://assets.garmoth.com/classes/200/23.webp" */}
            {/*            alt="" */}
            {/*            className="size-16" */}
            {/*        /> */}

            {/*    </View> */}
            {/*    <View className="mt-2 text-center"> */}
            {/*        <Text className="text-xs">妲卡尼亚</Text> */}
            {/*        <Text className="text-sm text-200">觉醒</Text> */}
            {/*    </View> */}
            {/* </View> */}
            <View>
              <View className="relative">

                <img
                  src="https://assets.garmoth.com/classes/200/13.webp"
                  alt=""
                  className="size-16"
                />

              </View>
              <View className="mt-2 text-center">
                <Text className="text-xs">格斗家</Text>
                <Text className="text-sm text-200">觉醒</Text>
              </View>
            </View>
            <View>
              <View className="relative">

                <img
                  src="https://assets.garmoth.com/classes/200/15.webp"
                  alt=""
                  className="size-16"
                />

              </View>
              <View className="mt-2 text-center">
                <Text className="text-xs">兰</Text>
                <Text className="text-sm text-200">觉醒</Text>
              </View>
            </View>
            {/* <View> */}
            {/*    <View className="relative"> */}
            {/*        <View className="dcc absolute inset-0 z-10 text-center text-xs font-bold text-red"> */}
            {/*            <View className="rounded bg-700/75 backdrop-blur-sm">Few Hours</View> */}
            {/*        </View> */}
            {/*        <img */}
            {/*            src="https://assets.garmoth.com/classes/200/22.webp" */}
            {/*            alt="" */}
            {/*            className="opacity-50 size-16" */}
            {/*        /> */}

            {/*    </View> */}
            {/*    <View className="mt-2 text-center"> */}
            {/*        <Text className="text-xs">柯塞尔</Text> */}
            {/*        <Text className="text-sm text-200">继承</Text> */}
            {/*    </View> */}
            {/* </View> */}
            <View>
              <View className="relative">

                <img
                  src="https://assets.garmoth.com/classes/200/14.webp"
                  alt=""
                  className="size-16"
                />

              </View>
              <View className="mt-2 text-center">
                <Text className="text-xs">女斗神</Text>
                <Text className="text-sm text-200">继承</Text>
              </View>
            </View>
            {/* <View> */}
            {/*    <View className="relative"> */}

            {/*        <img */}
            {/*            src="https://assets.garmoth.com/classes/200/20.webp" */}
            {/*            alt="" */}
            {/*            className="size-16" */}
            {/*        /> */}

            {/*    </View> */}
            {/*    <View className="mt-2 text-center"> */}
            {/*        <Text className="text-xs">诺娃</Text> */}
            {/*        <Text className="text-sm text-200">继承</Text> */}
            {/*    </View> */}
            {/* </View> */}
            <View>
              <View className="relative">

                <img
                  src="https://assets.garmoth.com/classes/200/8.webp"
                  alt=""
                  className="size-16"
                />

              </View>
              <View className="mt-2 text-center">
                <Text className="text-xs">武士</Text>
                <Text className="text-sm text-200">继承</Text>
              </View>
            </View>
            <View>
              <View className="relative">

                <img
                  src="https://assets.garmoth.com/classes/200/12.webp"
                  alt=""
                  className="size-16"
                />

              </View>
              <View className="mt-2 text-center">
                <Text className="text-xs">黑暗骑士</Text>
                <Text className="text-sm text-200">继承</Text>
              </View>
            </View>
            {/* <View> */}
            {/*    <View className="relative"> */}

            {/*        <img */}
            {/*            src="https://assets.garmoth.com/classes/200/21.webp" */}
            {/*            alt="" */}
            {/*            className="size-16" */}
            {/*        /> */}

            {/*    </View> */}
            {/*    <View className="mt-2 text-center"> */}
            {/*        <Text className="text-xs">大贤者</Text> */}
            {/*        <Text className="text-sm text-200">继承</Text> */}
            {/*    </View> */}
            {/* </View> */}
          </View>
        </View>
        <View className="relative flex gap-3 border-b border-400 p-3">
          <View
            className="absolute left-0 top-0 select-none text-xs"
            style={{ opacity: '0.01' }}
          >
            356240483921559572
          </View>
          <View className="dcc w-20 flex-none text-3xl font-bold text-blue">D</View>
          <View className="col-span-10 flex flex-wrap gap-3">
            <View>
              <View className="relative">
                <View className="dcc absolute inset-0 z-10 text-center text-xs font-bold text-red">
                  <View className="rounded bg-700/75 backdrop-blur-sm">Few Hours</View>
                </View>
                <img
                  src="https://assets.garmoth.com/classes/200/4.webp"
                  alt=""
                  className="opacity-50 size-16"
                />

              </View>
              <View className="mt-2 text-center">
                <Text className="text-xs">女武神</Text>
                <Text className="text-sm text-200">继承</Text>
              </View>
            </View>
            {/* <View> */}
            {/*    <View className="relative"> */}

            {/*        <img */}
            {/*            src="https://assets.garmoth.com/classes/200/17.webp" */}
            {/*            alt="" */}
            {/*            className="size-16" */}
            {/*        /> */}

            {/*    </View> */}
            {/*    <View className="mt-2 text-center"> */}
            {/*        <Text className="text-xs">莎亦</Text> */}
            {/*        <Text className="text-sm text-200">继承</Text> */}
            {/*    </View> */}
            {/* </View> */}
            {/* <View> */}
            {/*    <View className="relative"> */}

            {/*        <img */}
            {/*            src="https://assets.garmoth.com/classes/200/23.webp" */}
            {/*            alt="" */}
            {/*            className="size-16" */}
            {/*        /> */}

            {/*    </View> */}
            {/*    <View className="mt-2 text-center"> */}
            {/*        <Text className="text-xs">妲卡尼亚</Text> */}
            {/*        <Text className="text-sm text-200">继承</Text> */}
            {/*    </View> */}
            {/* </View> */}
          </View>
        </View>
      </View>
    </View>
  )
}

export default TierList
