import { Button, Image, RichText, Text, View } from '@tarojs/components'
import { useEffect, useState } from 'react'
import { AtIcon } from 'taro-ui'
import type { Skill, SkillAddon, SkillAddonDetail } from '@/types'
import 'taro-ui/dist/style/components/icon.scss'

interface SkillT {
  effect: string
  skillName: string
  icon: string
  level: number
  description: string
}

interface Effect {
  effectName: string
  effectValue: string
  duration: string
}

interface SkillModalProps {
  onClose: () => void
  onSave: (skill: SkillT, effect: Effect) => void
  skillData: Record<string, Skill>
  addonAvailableSkillData: SkillAddon[]
  skillAddonDetails: SkillAddonDetail[]
}

function filterSkillAddonDetailsByTier(
  skillAddonDetails: SkillAddonDetail[],
  selectedSkill: SkillAddon | null,
) {
  if (!selectedSkill)
    return skillAddonDetails

  const cleanName = (name: string) => name.replace(/<span.*?>.*?<\/span>/g, '').trim()

  const groupedSkills = skillAddonDetails.reduce((acc, detail) => {
    const baseName = cleanName(detail.name)

    if (!acc[baseName]) {
      acc[baseName] = []
    }
    acc[baseName].push(detail)
    return acc
  }, {} as Record<string, SkillAddonDetail[]>)

  const filteredSkills = Object.values(groupedSkills).map((group) => {
    return group.reduce((highestTierSkill, currentSkill) => {
      const currentTier = selectedSkill.addon

      if (currentSkill.id > highestTierSkill.id && currentTier >= selectedSkill.addon) {
        return currentSkill
      }
      return highestTierSkill
    })
  })

  return filteredSkills
}

const SkillModal: React.FC<SkillModalProps> = ({
  onClose,
  onSave,
  skillData,
  addonAvailableSkillData,
  skillAddonDetails,
}) => {
  const [selectedSkill, setSelectedSkill] = useState<SkillAddon | null>(null)
  const [filteredSkillAddonDetails, setFilteredSkillAddonDetails] = useState<SkillAddonDetail[]>(
    skillAddonDetails,
  )
  const [selectedEffect, setSelectedEffect] = useState<Effect | null>(null)
  const [isSelectingSkill, setIsSelectingSkill] = useState(true)

  useEffect(() => {
    if (selectedSkill) {
      const filtered = filterSkillAddonDetailsByTier(skillAddonDetails, selectedSkill)
      setFilteredSkillAddonDetails(filtered)
    }
  }, [selectedSkill, skillAddonDetails])

  const handleSkillSelect = (skill: SkillAddon) => {
    setSelectedSkill(skill)
    setIsSelectingSkill(false)
  }

  const handleEffectSelect = (effect: Effect) => {
    setSelectedEffect(effect)
  }

  const handleSaveAndClose = () => {
    if (selectedSkill && selectedEffect) {
      onSave(selectedSkill, selectedEffect)
      onClose()
    }
  }

  return (
    <View
      className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-80"
      onClick={onClose}
    >
      <View
        className="relative max-h-full max-w-full rounded-md bg-gray-800 p-6 text-white"
        onClick={e => e.stopPropagation()}
      >

        <View
          onClick={onClose}
          className="absolute top-2 right-2 flex cursor-pointer items-center justify-center text-gray-400 hover:text-red-500"
        >
          <AtIcon value="close" size="24" />
        </View>

        <View className="flex flex-col lg:flex-row gap-6">

          <View className="flex flex-col gap-4 w-full lg:w-80">

            <View className="flex flex-col gap-2 bg-gray-700 p-4 rounded-md">
              <Text className="text-lg font-semibold">选择技能</Text>
              {selectedSkill
                ? (
                    <View className="flex items-center gap-3 p-2 bg-gray-600 rounded-md">
                      <Image
                        src={`https://assets.garmoth.com/img/${selectedSkill.img}`}
                        alt={selectedSkill.name}
                        className="w-12 h-12 rounded-md"
                      />
                      <RichText nodes={selectedSkill.lang} className="text-gray-200" />
                    </View>
                  )
                : (
                    <Button
                      className="flex items-center justify-center gap-2 bg-gray-600 p-3 rounded-md hover:bg-gray-500"
                      onClick={() => setIsSelectingSkill(true)}
                    >
                      <AtIcon value="add" size="24" />
                      <Text>添加技能</Text>
                    </Button>
                  )}
            </View>

            {selectedSkill && (
              <View className="flex flex-col gap-2 bg-gray-700 p-4 rounded-md">
                <Text className="text-lg font-semibold">选择效果</Text>
                {selectedEffect
                  ? (
                      <View className="flex items-center gap-3 p-2 bg-gray-600 rounded-md">
                        <RichText nodes={selectedEffect.effectName} className="text-gray-200" />
                      </View>
                    )
                  : (
                      <Button
                        className="flex items-center justify-center gap-2 bg-gray-600 p-3 rounded-md hover:bg-gray-500"
                        onClick={() => setIsSelectingSkill(false)}
                      >
                        <AtIcon value="add" size="24" />
                        <Text>添加效果</Text>
                      </Button>
                    )}
              </View>
            )}

            <Button
              className="bg-green-600 hover:bg-green-500 text-white py-2 rounded-md"
              onClick={handleSaveAndClose}
            >
              保存并关闭
            </Button>
          </View>

          <View className="flex-1 overflow-y-auto max-h-[70vh] bg-gray-700 p-4 rounded-md">
            {isSelectingSkill
              ? addonAvailableSkillData.map(skill => (
                <View
                  key={skill.id}
                  className="flex items-center justify-between p-3 bg-gray-800 rounded-md mb-2 cursor-pointer hover:bg-gray-600"
                  onClick={() => handleSkillSelect(skill)}
                >
                  <View className="flex items-center gap-3">
                    <Image
                      src={`https://assets.garmoth.com/img/${skill.img}`}
                      loading="lazy"
                      alt={skill.name}
                      className="w-10 h-10 rounded-md"
                    />
                    <RichText nodes={skill.lang} className="text-gray-200" />
                  </View>
                  <AtIcon value="chevron-right" size="20" color="#ccc" />
                </View>
              ))
              : filteredSkillAddonDetails.map(effect => (
                <View
                  key={effect.id}
                  className="flex items-center justify-between p-3 bg-gray-800 rounded-md mb-2 cursor-pointer hover:bg-gray-600"
                  onClick={() => handleEffectSelect(effect)}
                >
                  <RichText nodes={effect.lang} className="text-gray-200" />
                  <AtIcon value="chevron-right" size="20" color="#ccc" />
                </View>
              ))}
          </View>
        </View>
      </View>
    </View>
  )
}

export default SkillModal
