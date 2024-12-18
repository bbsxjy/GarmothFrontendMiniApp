import React from 'react'
import { Input, Text, View } from '@tarojs/components'
import { AtInput } from 'taro-ui'

interface FilterPanelProps {
  skill: number
  setSkill: (value: number) => void
  contributionPoints: number
  setContributionPoints: (value: number) => void
  selectedLevels: string[]
  setSelectedLevels: (value: string[]) => void
  activeTab: string
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  skill,
  setSkill,
  contributionPoints,
  setContributionPoints,
  selectedLevels,
  setSelectedLevels,
  activeTab,
}) => {
  return (
    <div className="p-2 rounded shadow ">
      <h2 className="text-lg font-semibold mb-1">请输入以下数据以得到最终利润：</h2>
      <div className="flex flex-row space-x-4">
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium text-gray-200">
            {activeTab === 'food' ? '烹饪熟练度' : '炼金熟练度'}
          </label>
          <AtInput
            name="skill"
            type="number"
            value={skill}
            onChange={value => setSkill(Number(value))}
            placeholder="请输入熟练度"
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium text-gray-200">家门贡献度</label>
          <AtInput
            name="contributionPoints"
            type="number"
            value={contributionPoints}
            onChange={value => setContributionPoints(Number(value))}
            placeholder="请输入贡献度"
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          />
        </div>
      </div>
    </div>
  )
}

export default FilterPanel
