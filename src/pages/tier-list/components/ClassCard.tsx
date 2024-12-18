import React from 'react'
import { Image, Text, View } from '@tarojs/components'
import { LightBulbIcon, SparklesIcon } from '@heroicons/react/24/solid'
import type { ClassItem } from '@/types/tier-list'
import { BASE_IMAGE_CLASS_URL } from '@/constants'

interface ClassCardProps {
  classItem: ClassItem
}

function renderPath({ classItem }) {
  switch (classItem.status) {
    case 'extremeHot':
    case 'superHot':
    case 'hot':
      return (
        <path
          fill="currentColor"
          d="M143.38 17.85a8 8 0 0 0-12.63 3.41l-22 60.41l-24.16-23.41a8 8 0 0 0-11.93.89C51 87.53 40 116.08 40 144a88 88 0 0 0 176 0c0-59.45-50.79-108-72.62-126.15m40.51 135.49a57.6 57.6 0 0 1-46.56 46.55a7.7 7.7 0 0 1-1.33.11a8 8 0 0 1-1.32-15.89c16.57-2.79 30.63-16.85 33.44-33.45a8 8 0 0 1 15.78 2.68Z"
        />
      )
    default:
      return null
  }
}

const ClassCard: React.FC<ClassCardProps> = ({ classItem }) => {
  return (
    <View className="class-card flex flex-col items-center">
      <View className="relative w-16 h-16">
        <Image
          src={`${BASE_IMAGE_CLASS_URL}${classItem.imageUrl}`}
          alt={classItem.name}
          className="w-full h-full object-cover rounded-md"
        />
        {/* {classItem.status && classItem.status !== 'fewHours' && (
          <View className="absolute right-[-4px] top-[-4px] rounded-full bg-white p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              className="icon text-orange"
              width="16px"
              height="16px"
              viewBox="0 0 256 256"
            >
              {renderPath({ classItem })}
            </svg>
          </View>
        )} */}
      </View>
      <View className="mt-2 text-center">
        <Text className="text-xs">{classItem.name}</Text>
        <View
          className={`mt-1 items-center rounded-full px-2 py-1 text-xs font-medium bg-blue-100 ${
            classItem.specialization === '觉醒' ? 'text-artisan' : 'text-master'
          }`}
        >
          {classItem.specialization === '觉醒'
            ? (
                <SparklesIcon className="mr-1 w-1 h-1" />
              )
            : (
                <LightBulbIcon className="mr-1 w-1 h-1" />
              )}
          {classItem.specialization}
        </View>
      </View>
    </View>
  )
}

export default ClassCard
