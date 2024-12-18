
import React from 'react'
import { Button, Image, Input, ScrollView, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './EnhanceSimulator.scss'

const EnhanceSimulator: React.FC = () => {
  return (

    <View className="container flex flex-col gap-12 px-16 py-24 text-sm">
      <View>
        <Text className="title text-32">强化模拟器</Text>
      </View>
      <View className="grid grid-cols-1 gap-12">
        {/* 强化信息卡片 */}
        <View className="info-card rounded-md bg-600 p-24 text-center">
          <Text className="label mb-8 text-200">平均尝试次数</Text>
          <Text className="value text-32 font-bold">40000.00</Text>
          <Text className="label mb-8 text-200">最大耐久度减少</Text>
          <Text className="value text-32 font-bold">30</Text>
          <Text className="label mb-8 text-200">软上限</Text>
          <Text className="value text-32 font-bold">279990</Text>
        </View>

        {/* 选择物品和强化等级 */}
        <View className="selection-card gap-12 rounded-md bg-600 p-24">
          <Text className="instruction mb-12 text-center text-200">选择物品和强化等级</Text>
          <View className="item-selection flex gap-8">
            {/* 物品图标和等级 */}
            <View className="item-icon relative flex-none overflow-hidden h-80 w-80 bg-700 rounded border-2 border-rarity-5">
              <Image
                src="https://assets.garmoth.com/img/new_icon/06_pc_equipitem/00_common/13_hel/00719897.webp"
                mode="widthFix"
                className="item-image size-100"
                alt="Item Icon"
              />
              <Text className="enhance-level text-base">IV</Text>
            </View>

            {/* 物品名称选择 */}
            <View className="item-name group flex-1">
              <View className="dropdown select-none text-sm">
                <View
                  className="dropdown-btn rounded-md flex h-80 cursor-pointer items-center justify-between gap-4 border border-500 bg-700 px-8"
                  onClick={() => {
                    // 处理下拉菜单逻辑
                  }}
                >
                  <View className="item-info flex items-center">
                    <View className="item-title grow">
                      <Text className="pl-8">Labreska's Helmet</Text>
                    </View>
                  </View>
                  <Image
                    src="https://assets.garmoth.com/img/icons/arrow-down.svg" // 替换为本地图片路径
                    mode="widthFix"
                    className="dropdown-icon text-xl text-200"
                    alt="Dropdown Arrow"
                  />
                </View>
              </View>
            </View>

            {/* 强化等级选择 */}
            <View className="enhance-level-selection group w-112 flex-none">
              <View className="dropdown select-none text-sm">
                <View
                  className="dropdown-btn rounded-md flex h-80 cursor-pointer items-center justify-between gap-8 border border-500 bg-700 px-16"
                  onClick={() => {
                    // 处理下拉菜单逻辑
                  }}
                >
                  <Text className="truncate font-semibold">TET (IV)</Text>
                  <Image
                    src="https://assets.garmoth.com/img/icons/arrow-down.svg" // 替换为本地图片路径
                    mode="widthFix"
                    className="dropdown-icon text-xl text-200"
                    alt="Dropdown Arrow"
                  />
                </View>
              </View>
            </View>
          </View>

          {/* 强化图示区域 */}
          <View className="enhance-diagram flex h-224 w-full justify-center rounded-md bg-700 bg-opacity-50">
            <View className="diagram relative block">
              <View className="diagram-bg rounded-md bg-700 bg-opacity-50">
                <Image
                  src="https://assets.garmoth.com/other/enhancing-diagram-with-cron.png"
                  mode="widthFix"
                  className="diagram-image opacity-50"
                  alt="Enhancing Diagram"
                />
              </View>
              <View className="item-overlay absolute left-16 top-16 flex items-center justify-center size-120">
                <View className="relative size-full">
                  <Image
                    src="https://assets.garmoth.com/items/16080.webp"
                    mode="widthFix"
                    className="item-image w-full rounded-md border-2 border-green"
                    alt="Item"
                  />
                  <Text className="item-count absolute bottom-4 right-20">4000</Text>
                </View>
              </View>
              <View className="item-overlay absolute left-16 top-176 flex items-center justify-center size-120">
                <View className="relative size-full">
                  <Image
                    src="https://assets.garmoth.com/items/752022.webp"
                    mode="widthFix"
                    className="item-image w-full rounded-md border-2 border-green"
                    alt="Item"
                  />
                </View>
              </View>
              <View className="success-rate absolute left-224 top-160 flex items-center justify-center size-240">
                <Text className="success-rate-text text-24 font-bold">0.003%</Text>
              </View>
              <View className="save-button absolute right-16 top-176 flex size-120 items-center justify-center rounded border-2 border-green bg-green bg-opacity-80">
                <Image
                  src="https://assets.garmoth.com/img/new_icon/06_pc_equipitem/00_common/13_hel/00719897.webp"
                  mode="widthFix"
                  className="save-icon size-120 p-4 opacity-80"
                  alt="Save Icon"
                />
                <Button className="save-action mt-16 border-2 border-green bg-green bg-opacity-80 p-4 rounded-md">
                  保存
                </Button>
              </View>
            </View>
          </View>

          {/* 其他控制区域 */}
          <View className="additional-controls flex flex-col gap-4">
            {/* 增加强化机率 */}
            <View className="control-group flex justify-between text-200">
              <View className="flex items-center gap-4">
                <Image
                  src="https://assets.garmoth.com/icons/enhancement/additional_enhancement_chance.png"
                  mode="widthFix"
                  className="control-icon opacity-50"
                  alt="Additional Enhancement Chance"
                />
                <Text className="hidden">增加强化机率</Text>
              </View>
              <View className="relative flex items-center">
                <Text className="mr-4">+</Text>
                <Input
                  className="enhance-input h-28 w-48 border border-500 bg-700 bg-opacity-50 p-0 px-4 text-right text-base font-normal text-white hover:bg-opacity-50"
                  type="number"
                  placeholder="0"
                />
                <View className="absolute -right-32 flex size-56 cursor-pointer select-none items-center justify-center rounded border border-400 border-opacity-50 bg-500 opacity-25 hover:opacity-100">
                  <Image
                    src="https://assets.garmoth.com/img/icons/arrow-right.svg" // 替换为本地图片路径
                    mode="widthFix"
                    className="icon text-white"
                    alt="Increase"
                  />
                </View>
                <View className="absolute -right-64 flex size-56 cursor-pointer select-none items-center justify-center rounded border border-400 border-opacity-50 bg-500 opacity-25 hover:opacity-100">
                  <Image
                    src="https://assets.garmoth.com/img/icons/arrow-left.svg" // 替换为本地图片路径
                    mode="widthFix"
                    className="icon text-white"
                    alt="Decrease"
                  />
                </View>
              </View>
            </View>

            {/* 增加呐喊强化机率 */}
            <View className="control-group flex justify-between text-200">
              <View className="flex items-center gap-4">
                <Image
                  src="https://assets.garmoth.com/icons/enhancement/valks_enhancement_chance.png"
                  mode="widthFix"
                  className="control-icon opacity-50"
                  alt="Valks Enhancement Chance"
                />
                <Text className="hidden">呐喊强化机率</Text>
              </View>
              <View className="relative flex items-center">
                <Text className="mr-4">+</Text>
                <Input
                  className="enhance-input h-28 w-48 border border-500 bg-700 bg-opacity-50 p-0 px-4 text-right text-base font-normal text-white hover:bg-opacity-50"
                  type="number"
                  placeholder="0"
                />
                <View className="absolute -right-32 flex size-56 cursor-pointer select-none items-center justify-center rounded border border-400 border-opacity-50 bg-500 opacity-25 hover:opacity-100">
                  <Image
                    src="https://assets.garmoth.com/img/icons/arrow-right.svg" // 替换为本地图片路径
                    mode="widthFix"
                    className="icon text-white"
                    alt="Increase"
                  />
                </View>
                <View className="absolute -right-64 flex size-56 cursor-pointer select-none items-center justify-center rounded border border-400 border-opacity-50 bg-500 opacity-25 hover:opacity-100">
                  <Image
                    src="https://assets.garmoth.com/img/icons/arrow-left.svg" // 替换为本地图片路径
                    mode="widthFix"
                    className="icon text-white"
                    alt="Decrease"
                  />
                </View>
              </View>
            </View>

            {/* 永久强化层数 */}
            <View className="control-group relative flex">
              <View className="flex items-center gap-4">
                <Image
                  src="https://assets.garmoth.com/icons/enhancement/additional_enhancement_chance.png"
                  mode="widthFix"
                  className="control-icon opacity-50"
                  alt="Permanent Enhancement Layers"
                />
                <Text className="hidden">永久强化层数</Text>
              </View>
              <View className="absolute -right-64 flex gap-4 text-sm">
                <Button className="layer-btn border-green bg-green bg-opacity-80 size-56 border rounded-md">+0</Button>
                <Button className="layer-btn border-500 bg-700 bg-opacity-50 size-56 border rounded-md">+1</Button>
                <Button className="layer-btn border-500 bg-700 bg-opacity-50 size-56 border rounded-md">+2</Button>
                <Button className="layer-btn border-500 bg-700 bg-opacity-50 size-56 border rounded-md">+3</Button>
                <Button className="layer-btn border-500 bg-700 bg-opacity-50 size-56 border rounded-md">+4</Button>
                <Button className="layer-btn border-500 bg-700 bg-opacity-50 size-56 border rounded-md">+5</Button>
              </View>
            </View>

            {/* 增加目前装备强化机率 */}
            <View className="current-enhance-group flex justify-between mt-8 text-lg">
              <View className="flex items-center gap-4">
                <Image
                  src="https://assets.garmoth.com/icons/enhancement/current_enhancement_chance.png"
                  mode="widthFix"
                  className="control-icon opacity-50"
                  alt="Current Enhancement Chance"
                />
                <Text className="hidden">增加目前装备强化机率</Text>
              </View>
              <View className="flex text-lg">
                <Text className="mr-4">+</Text>
                <Text className="enhance-success text-32 font-semibold">0</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 已获得物品 */}
        <View className="acquired-items rounded-md bg-600 p-16 hidden">
          <Text className="acquired-title my-8 text-center text-200">已获得物品</Text>
          <View className="items-container h-800 rounded-md border-2 border-500 p-16">
            <View className="items-grid grid grid-cols-5 gap-8 relative z-10">
              {/* 单个已获得物品 */}
              <View className="item size-full cursor-pointer select-none rounded-md bg-500 bg-opacity-50">
                <View className="relative w-full">
                  <Image
                    src="https://assets.garmoth.com/img/new_icon/06_pc_equipitem/00_common/01_weapon/00715017.webp"
                    mode="widthFix"
                    className="item-image w-full rounded-md border-2 border-rarity-5"
                    alt="Weapon Item"
                  />
                  <Text className="enhance-level absolute inset-0 flex items-center justify-center text-lg">III</Text>
                </View>
              </View>

              <View className="item size-full cursor-pointer select-none rounded-md bg-500 bg-opacity-50">
                <View className="relative w-full">
                  <Image
                    src="https://assets.garmoth.com/img/new_icon/06_pc_equipitem/00_common/17_earring/00011852.webp"
                    mode="widthFix"
                    className="item-image w-full rounded-md border-2 border-rarity-4"
                    alt="Earring Item"
                  />
                  <Text className="enhance-level absolute inset-0 flex items-center justify-center text-lg">IV</Text>
                </View>
              </View>

              <View className="item size-full cursor-pointer select-none rounded-md bg-500 bg-opacity-50">
                <View className="relative w-full">
                  <Image
                    src="https://assets.garmoth.com/img/new_icon/06_pc_equipitem/00_common/09_upperbody/00719898.webp"
                    mode="widthFix"
                    className="item-image w-full rounded-md border-2 border-rarity-5"
                    alt="Upperbody Item"
                  />
                  <Text className="enhance-level absolute inset-0 flex items-center justify-center text-lg"></Text>
                </View>
              </View>
            </View>
          </View>
          <View className="mt-24 flex justify-end">
            <Button className="delete-button border-red bg-red bg-opacity-80 px-8 h-80 relative overflow-hidden font-normal py-0 border rounded-md transition hover:brightness-125">
              删除
            </Button>
          </View>
        </View>

        {/* 强化几率计算器 */}
        <View className="calculator-card rounded-md bg-600 p-24 text-center">
          <Text className="calculator-title mb-12 text-24">强化几率计算器</Text>
          <Text className="label text-200">尝试次数</Text>
          <Input
            className="attempts-input w-96 border border-500 text-center text-base hover:border-400"
            type="number"
            placeholder="请输入尝试次数"
          />
          <Text className="label mt-16 text-200">成功概率</Text>
          <Text className="success-probability text-32 font-bold">1.194 %</Text>
        </View>

        {/* 强化结果统计 */}
        <View className="result-statistics flex flex-col gap-12 col-span-2">
          <View className="statistics-card rounded-md bg-600 p-24">
            <View className="statistics-header mb-12 grid grid-cols-2 gap-8 border-b border-600 py-12">
              <View className="stat-label block text-right">失败次数:</View>
              <Text className="stat-value text-red">16.750</Text>
            </View>
            <View className="statistics-header mb-12 grid grid-cols-2 gap-8 border-b border-600 py-12">
              <View className="stat-label block text-right">失败次数:</View>
              <Text className="stat-value text-red">92.205</Text>
            </View>
            <View className="statistics-header mb-12 grid grid-cols-2 gap-8 border-b border-600 py-12">
              <View className="stat-label block text-right">失败次数:</View>
              <Text className="stat-value text-red">32.343</Text>
            </View>
            <View className="statistics-header mb-12 grid grid-cols-2 gap-8 border-b border-600 py-12">
              <View className="stat-label block text-right">失败次数:</View>
              <Text className="stat-value text-red">72.435</Text>
            </View>
            <View className="statistics-header mb-12 grid grid-cols-2 gap-8 border-b border-600 py-12">
              <View className="stat-label block text-right">失败次数:</View>
              <Text className="stat-value text-red">59.718</Text>
            </View>
          </View>

          {/* 统计结果 */}
          <View className="result-summary grid grid-cols-4 gap-12">
            <View className="summary-card rounded-md bg-600 py-24 text-center">
              <Text className="summary-value text-28 font-semibold text-white">5</Text>
              <Text className="summary-label text-200">尝试次数</Text>
            </View>
            <View className="summary-card rounded-md bg-600 py-24 text-center">
              <Text className="flex items-center justify-center gap-4 text-28 font-semibold text-white">?</Text>
              <Text className="summary-label text-200">平均尝试次数</Text>
            </View>
            <View className="summary-card rounded-md bg-600 py-24 text-center">
              <View className="flex items-center justify-center gap-4 text-28 font-semibold text-white">
                <Text>0</Text>
                <Image
                  src="https://assets.garmoth.com/img/icons/check.svg" // 替换为本地图片路径
                  mode="widthFix"
                  className="icon text-28 text-green"
                  alt="Success Icon"
                />
              </View>
              <Text className="summary-label text-200">强化成功</Text>
            </View>
            <View className="summary-card rounded-md bg-600 py-24 text-center">
              <View className="flex items-center justify-center gap-4 text-28 font-semibold text-white">
                <Text>5</Text>
                <Image
                  src="https://assets.garmoth.com/img/icons/cross.svg" // 替换为本地图片路径
                  mode="widthFix"
                  className="icon text-28 text-red"
                  alt="Failure Icon"
                />
              </View>
              <Text className="summary-label text-200">强化失败</Text>
            </View>
          </View>
        </View>
      </View>
    </View>

  )
}

export default EnhanceSimulator
