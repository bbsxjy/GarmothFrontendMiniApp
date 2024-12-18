import React, { useMemo, useState } from 'react'
import { View } from '@tarojs/components'
import FilterModal from './FilterModal'
import { useGetGlobalDataQuery } from '@/api/grind-tracker/api'
import Spinner from '@/components/Loading'

function Global() {
  const { data, error, isLoading } = useGetGlobalDataQuery({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filters, setFilters] = useState<Record<string, 'selected' | 'excluded' | null>>({})

  const filterButtons = [
    { alt: 'group', src: 'https://assets.garmoth.com/icons/group.png' },
    { alt: 'agris', src: 'https://assets.garmoth.com/icons/agris.png' },
    { alt: 'exp', src: 'https://assets.garmoth.com/icons/exp.png' },
    { alt: 'skill', src: 'https://assets.garmoth.com/icons/skill.png' },
    { alt: 'elvia', src: 'https://assets.garmoth.com/icons/elvia.png' },
    { alt: 'potion_hp', src: 'https://assets.garmoth.com/icons/potion_hp.png' },
    { alt: 'potion_mp', src: 'https://assets.garmoth.com/icons/potion_mp.png' },
    { alt: 'treasure_map', src: 'https://assets.garmoth.com/icons/treasure_map.png' },
    { alt: 'compass', src: 'https://assets.garmoth.com/icons/compass.png' },
    { alt: 'ring', src: 'https://assets.garmoth.com/icons/ring.png' },
    { alt: 'marni_realm', src: 'https://assets.garmoth.com/icons/marni-realm.png' },
    { alt: 'no_scroll', src: 'https://assets.garmoth.com/icons/no-scroll.png' },
    { alt: 'lantern', src: 'https://assets.garmoth.com/icons/lantern.png' },
    { alt: 'human', src: 'https://assets.garmoth.com/icons/mob-types/human.png' },
    { alt: 'kama', src: 'https://assets.garmoth.com/icons/mob-types/kama.png' },
    { alt: 'demi', src: 'https://assets.garmoth.com/icons/mob-types/demi.png' },
    { alt: 'animal', src: 'https://assets.garmoth.com/icons/mob-types/animal.png' },
  ]

  const handleFilterClick = (alt: string) => {
    setFilters((prev) => {
      const current = prev[alt]
      let newState: 'selected' | 'excluded' | null
      if (current === 'selected') {
        newState = 'excluded'
      }
      else if (current === 'excluded') {
        newState = null
      }
      else {
        newState = 'selected'
      }
      return { ...prev, [alt]: newState }
    })
  }

  const filteredData = useMemo(() => {
    if (!data)
      return []
    return data.filter((entry: any) => {
      const entryType = entry.type
      for (const [filter, state] of Object.entries(filters)) {
        if (state === 'selected' && entryType !== filter) {
          return false
        }
        if (state === 'excluded' && entryType === filter) {
          return false
        }
      }
      return true
    })
  }, [data, filters])

  {
    isLoading && (
      <Spinner />
    )
  }
  {
    error && (
      <View className="flex items-center justify-center h-full">
        <p>出错了，请稍后再试。</p>
      </View>
    )
  }

  return (
    <View>
      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        filters={filters}
        onFilterChange={handleFilterClick}
        filterButtons={filterButtons}
      />
      <View className="flex flex-col items-center justify-between gap-3 pb-3 lg:flex-row">
        <h1 className="my-0 flex items-center gap-2 text-2xl">
          <span>猎场详情</span>
        </h1>
        <View className="flex flex-wrap items-center gap-2">
          <View>
            <View className="flex h-10 cursor-pointer items-center gap-2 rounded-md border border-500 bg-600 p-[1px]">
              <span className="pl-2 text-lg font-semibold">+112.5%</span>
              <View className="flex grow flex-wrap items-center justify-center">
                <img
                  src="https://assets.garmoth.com/img/grind-buffs/1.png"
                  loading="lazy"
                  className="size-8"
                  alt="Buff Icon"
                />
              </View>
            </View>
          </View>
          <View>
            <button className="bg-600 border-500 hover:border-400 px-2 h-10 relative overflow-hidden font-normal py-0 border rounded-md transition hover:brightness-125">
              <View className="flex items-center gap-2 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  className="icon"
                  width="1em"
                  height="1em"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M128 0c17.7 0 32 14.3 32 32v32h128V32c0-17.7 14.3-32 32-32s32 14.3 32 32v32h48c26.5 0 48 21.5 48 48v48H0v-48c0-26.5 21.5-48 48-48h48V32c0-17.7 14.3-32 32-32M0 192h448v272c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16m128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16m144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16m144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16"
                  />
                </svg>
                <View>1970年1月1日</View>
                <View>-</View>
                <View>1970年1月1日</View>
              </View>
            </button>
          </View>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-600 border-500 w-10 px-0 h-10 relative overflow-hidden font-normal py-0 border rounded-md transition hover:brightness-125"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              className="icon"
              width="1em"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M3.9 54.9C10.5 40.9 24.5 32 40 32h432c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6v-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9"
              />
            </svg>
          </button>
          <button className="bg-600 border-500 hover:border-400 w-10 h-10 relative overflow-hidden font-normal py-0 border rounded-md transition hover:brightness-125 dcc p-0">
            <img
              src="https://assets.garmoth.com/icons/_grind.png"
              loading="lazy"
              alt="Grind Icon"
              className="p-1 opacity-80"
            />
          </button>
        </View>
      </View>
      <View className="mb-3 overflow-x-auto">
        <table className="min-w-[1024px] overflow-hidden rounded bg-600">
          <thead>
            <tr className="bg-700 text-sm">
              <th></th>
              <th>类型</th>
              <th className="text-left">名称</th>
              <th className="text-right">攻击力范围</th>
              <th className="text-right">小时</th>
              <th className="text-right">垃圾/小时</th>
              <th className="pr-4 text-right">银币/小时</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredData && filteredData.length > 0 ? (
              filteredData
                .filter((entry: any) =>
                  entry.lang !== null
                  && !entry.lang.includes('艾尔比亚')
                  && !entry.lang.includes('代基亚的灯火')
                  && entry.zone !== 'snowmountain',
                ) // Filter out entries where lang is null or matches the excluded values and zone is snowmountain
                .sort((a: any, b: any) => b.ap - a.ap) // Sort by entry.ap in ascending order
                .map((entry: any, index: number) => (
                  <tr key={index} className="cursor-pointer bg-600 hover:bg-gray-500">
                    <td className="w-9 p-[2px]">
                      <img src={`https://assets.garmoth.com/img/new_icon/03_etc/04_dropitem/000${entry.icon}.webp`} loading="lazy" className="block size-8" alt="Item" />
                    </td>
                    <td className="w-7 p-0">
                      <img src={`https://assets.garmoth.com/icons/mob-types/${entry.mob_type}.png`} loading="lazy" alt="Mob Type" className="mx-auto block size-7 rounded-full" />
                    </td>
                    <td className="py-0">
                      <a href={`/grind-tracker/global/${index}`} className="flex items-center gap-2">
                        <span>{entry.locationName}</span>
                        <View className="flex gap-1 opacity-80 text-gray-100">
                          {console.log(entry)}
                          {entry.lang}
                        </View>
                      </a>
                    </td>
                    <td className="number text-right">
                      <View className="flex justify-end gap-2 text-gray-100">
                        <span>
                          {entry.ap}
                          攻击力
                        </span>
                        <span>~</span>
                        <span>
                          {entry.dp}
                          防御力
                        </span>
                      </View>
                    </td>
                    <td className="number text-right">
                      <strong className="text-green-500">{entry.time}</strong>
                    </td>
                    <td className="number text-right">
                      {/* <View>{entry.number1.toLocaleString()}</View> */}
                    </td>
                    <td className="number pr-4 text-right">
                      {/* <View>{entry.number2.toLocaleString()}</View> */}
                    </td>
                    <td className="fit-cell p-1">
                      <button className="bg-gray-400 border-gray-300 w-8 p-0 h-8 relative overflow-hidden font-normal py-0 border rounded-md transition hover:brightness-125">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="icon" width="1em" height="1em" viewBox="0 0 448 512">
                          <path fill="currentColor" d="M128 0c17.7 0 32 14.3 32 32v32h128V32c0-17.7 14.3-32 32-32s32 14.3 32 32v32h48c26.5 0 48 21.5 48 48v48H0v-48c0-26.5 21.5-48 48-48h48V32c0-17.7 14.3-32 32-32M0 192h448v272c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16m128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16m144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16m144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16" />
                        </svg>
                      </button>
                    </td>
                    <td className="fit-cell p-1">
                      <button className="bg-gray-600 border-gray-500 hover:border-gray-400 w-8 p-0 h-8 relative overflow-hidden font-normal py-0 border rounded-md transition hover:brightness-125">
                        <img src="https://assets.garmoth.com/icons/agris.png" alt="Agris Icon" className="p-1.5" />
                      </button>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan={9} className="text-center py-4">
                  暂无数据。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </View>
    </View>
  )
}

export default Global
