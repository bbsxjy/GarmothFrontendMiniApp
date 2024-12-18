import { useMemo, useState } from 'react'
import { Button, Image, Text, View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import SkillModal from './components/SkillModal'
import { BASE_IMAGE_CLASS_URL, JOB_CLASS_TO_NUMBER_MAP } from '@/constants'
import {
  useGetAvailableSkillAddonsQuery,
  useGetSkillAddonDetailsQuery,
  useGetSkillsQuery,
} from '@/api/skill-addon-planner'
import type { Skill, SkillAddon } from '@/types'
import 'taro-ui/dist/style/components/icon.scss'
import Spinner from '@/components/Loading'

interface SkillT {
  effect: string
  skillName: string
  icon: string
  level: number
  description?: string
}

interface Effect {
  effectName: string
  effectValue: string
  duration: string
}

interface Preset {
  id: number
  name: string
  profession: string
  specialization: string
  slots: { skill: SkillT | null, effect: Effect | null }[]
}

function groupSkillsByClassId(skills: SkillAddon[]) {
  return skills.reduce((acc, skill) => {
    if (!acc[skill.class_id]) {
      acc[skill.class_id] = []
    }
    acc[skill.class_id].push(skill)
    return acc
  }, {} as Record<number, SkillAddon[]>)
}

const SkillAddonPlanner: React.FC = () => {
  const [presets, setPresets] = useState<Preset[]>([
    {
      id: 1,
      name: '预设 #264105',
      profession: '游侠',
      specialization: '觉醒',
      slots: Array(6).fill({ skill: null, effect: null }),
    },
  ])
  const [currentPresetId, setCurrentPresetId] = useState<number>(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentSlot, setCurrentSlot] = useState<number | null>(null)
  const [selectedProfession, setSelectedProfession] = useState<string>('狂战士')
  const [selectedProfessionId, setSelectedProfessionId] = useState<number>(0)
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('觉醒')
  const [isProfessionOpen, setIsProfessionOpen] = useState(false)
  const [isSpecializationOpen, setIsSpecializationOpen] = useState(false)

  const { data: skillAddons, error, isLoading } = useGetAvailableSkillAddonsQuery()
  const { data: skillAddonDetails, error: detailsError, isLoading: detailsLoading } = useGetSkillAddonDetailsQuery()
  const { data: skills, error: skillsError, isLoading: skillsLoading } = useGetSkillsQuery()

  const groupedSkillsById = useMemo(() => {
    if (!skillAddons)
      return {}
    return skillAddons.reduce((lookup, addon) => {
      lookup[addon.id] = addon
      return lookup
    }, {} as Record<string, SkillAddon>)
  }, [skillAddons])

  const groupedFullSkillsById = useMemo(() => {
    if (!skills)
      return {}
    return skills.reduce((lookup, skill) => {
      lookup[skill.skill_id] = skill
      return lookup
    }, {} as Record<string, Skill>)
  }, [skills])

  const groupedSkillsByClassId = useMemo(() => {
    if (!skillAddons)
      return {}
    return groupSkillsByClassId(skillAddons)
  }, [skillAddons])

  const uniqueSkillAddonDetails = skillAddonDetails?.filter((effect, index, self) => {
    return index === self.findIndex(e => e.name === effect.name)
  })

  if (isLoading || detailsLoading || skillsLoading) {
    return (
      <Spinner />
    )
  }
  if (error || detailsError || skillsError) {
    console.error(error, detailsError, skillsError)
    return (
      <View className="flex justify-center items-center h-screen">
        <Text className="text-red-500">加载数据出错</Text>
      </View>
    )
  }

  const professions = Object.entries(JOB_CLASS_TO_NUMBER_MAP).map(([name, id]) => ({ id, name }))

  const specializations = ['觉醒', '继承']

  const openModal = (slotIndex: number) => {
    setCurrentSlot(slotIndex)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentSlot(null)
  }

  const handleSave = (skill: SkillT, effect: Effect) => {
    setPresets(prev =>
      prev.map(preset =>
        preset.id === currentPresetId
          ? {
              ...preset,
              slots: preset.slots.map((s, idx) => (idx === currentSlot ? { skill, effect } : s)),
            }
          : preset,
      ),
    )
    closeModal()
  }

  const currentPreset = presets.find(p => p.id === currentPresetId)

  return (
    <View className="min-h-screen  text-gray-200 p-4">

      {/* <View className="flex items-center justify-between mb-6">
        <View className="flex items-center gap-2">
          <Image
            src="https://assets.garmoth.com/icons/menu/skill-addon-planner.png"
            mode="widthFix"
            className="w-8 h-8 hidden lg:block"
          />
          <Text className="text-2xl font-bold text-white">技能强化模拟器</Text>
        </View>
      </View> */}

      <View className="flex flex-col gap-4">

        <View className="flex flex-col gap-4 lg:flex-row">

          <View className="relative w-full lg:w-1/2">
            <Text className="mb-2 text-xl text-gray-400">职业</Text>
            <View
              className="flex items-center justify-between bg-gray-800 p-3 rounded-md cursor-pointer"
              onClick={() => setIsProfessionOpen(!isProfessionOpen)}
            >
              <View className="flex items-center gap-2">
                <Image
                  src={`${BASE_IMAGE_CLASS_URL}${selectedProfessionId}.webp`}
                  alt={selectedProfession}
                  className="w-6 h-6"
                />
                <Text>{selectedProfession}</Text>
              </View>
              <AtIcon value="chevron-down" size="20" color="#ccc" />
            </View>
            {isProfessionOpen && (
              <View className="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {professions.map(profession => (
                  <View
                    key={profession.id}
                    className={`px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-700 ${
                      profession.name === selectedProfession ? 'bg-gray-700' : ''
                    }`}
                    onClick={() => {
                      setSelectedProfession(profession.name)
                      setSelectedProfessionId(profession.id)
                      setSelectedSpecialization(specializations[0])
                      setIsProfessionOpen(false)
                    }}
                  >
                    <Image
                      src={`${BASE_IMAGE_CLASS_URL}${profession.id}.webp`}
                      alt={profession.name}
                      className="w-6 h-6"
                    />
                    <Text>{profession.name}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          <View className="relative w-full lg:w-1/2">
            <Text className="mb-2 text-xl text-gray-400">专精</Text>
            <View
              className="flex items-center justify-between bg-gray-800 p-3 rounded-md cursor-pointer"
              onClick={() => setIsSpecializationOpen(!isSpecializationOpen)}
            >
              <Text>{selectedSpecialization}</Text>
              <AtIcon value="chevron-down" size="20" color="#ccc" />
            </View>
            {isSpecializationOpen && (
              <View className="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {specializations.map((spec, index) => (
                  <View
                    key={index}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-700 ${
                      spec === selectedSpecialization ? 'bg-gray-700' : ''
                    }`}
                    onClick={() => {
                      setSelectedSpecialization(spec)
                      setIsSpecializationOpen(false)
                    }}
                  >
                    <Text>{spec}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        <View className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {currentPreset?.slots.map((slot, index) => (
            <View
              key={index}
              className="flex items-center gap-4 bg-gray-800 p-4 rounded-md cursor-pointer hover:bg-gray-700"
              onClick={() => openModal(index)}
            >
              <View className="w-16 h-16 flex justify-center items-center bg-gray-700 rounded-md">
                <Image
                  src={slot.skill?.icon || 'https://assets.garmoth.com/icons/blackspirit.png'}
                  alt={slot.skill?.skillName || '添加技能强化'}
                  className="w-12 h-12 rounded-md"
                />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-semibold">
                  {slot.skill?.skillName || '可用的技能强化'}
                </Text>
                {slot.effect && (
                  <Text className="text-sm text-gray-400">{slot.effect.effectName}</Text>
                )}
              </View>
              <AtIcon value="chevron-right" size="20" color="#ccc" />
            </View>
          ))}
        </View>
      </View>

      {isModalOpen && currentSlot !== null && currentPreset && (
        <SkillModal
          onClose={closeModal}
          onSave={handleSave}
          addonAvailableSkillData={
            groupedSkillsByClassId[selectedProfessionId]?.filter((item) => {
              if (selectedSpecialization === '觉醒') {
                return !item.name.includes('Prime:')
              }
              else {
                return item.type !== 'awak'
              }
            }) || []
          }
          skillAddonDetails={uniqueSkillAddonDetails ?? []}
          skillData={groupedFullSkillsById ?? {}}
        />
      )}
    </View>
  )
}

export default SkillAddonPlanner
