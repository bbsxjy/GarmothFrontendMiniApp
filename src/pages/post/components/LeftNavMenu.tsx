import React, { useState } from 'react'
import { Input, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtIcon } from 'taro-ui'
import { useGetGuidesQuery } from '@/api'

const categoryMap = {
  0: '基础',
  1: '装备',
  2: '升级',
  3: '任务',
  4: '赚钱',
  5: 'PVP',
  6: '玩法',
  7: '日志',
  8: '其他',
}

const LeftNavMenu: React.FC<{
  isMenuOpen: boolean
  closeMenu: () => void
}> = ({ isMenuOpen, closeMenu }) => {
  const [expandedSections, setExpandedSections] = useState({})
  const { data, error, isLoading } = useGetGuidesQuery({})

  if (isLoading || error) {
    return null
  }

  const toggleSection = (sectionName) => {
    setExpandedSections(prevState => ({
      ...prevState,
      [sectionName]: !prevState[sectionName],
    }))
  }

  const categorizedGuides = data.reduce((acc, guide) => {
    const category = guide.fk_category
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(guide)
    return acc
  }, {})

  const navigateTo = (url) => {
    Taro.navigateTo({ url })
    closeMenu()
  }

  return (
    <>
      {isMenuOpen && (
        <View
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 40,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          onClick={closeMenu}
        />
      )}
      <View
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 50,
          width: '256px',
          height: '100%',
          backgroundColor: '#222222',
          transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-in-out',
          overflowY: 'auto',
        }}
      >
        <View style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '16px' }}>
          <View style={{ marginBottom: '16px' }}>
            <Input
              type="text"
              placeholder="搜索..."
              style={{
                width: '90%',
                padding: '8px',
                backgroundColor: '#1f2937',
                borderRadius: '8px',
                color: '#fff',
              }}
            />
          </View>
          <View style={{ flex: 1, overflowY: 'auto' }}>
            <View style={{ marginBottom: '16px' }}>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px',
                  borderRadius: '8px',
                  backgroundColor: '#1f2022',
                  cursor: 'pointer',
                }}
                onClick={() => navigateTo('/pages/post/index')}
              >
                <AtIcon value="file-text" size="20" color="#fff" />
                <Text style={{ fontSize: '16px', color: '#fff' }}>所有攻略</Text>
              </View>
            </View>
            {Object.entries(categorizedGuides).map(([categoryKey, guides]) => (
              <View key={categoryKey} style={{ marginBottom: '8px' }}>
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px',
                    borderRadius: '8px',
                    backgroundColor: '#1f2022',
                    cursor: 'pointer',
                  }}
                  onClick={() => toggleSection(categoryKey)}
                >
                  <Text style={{ fontSize: '16px', color: '#fff' }}>{categoryMap[Number(categoryKey)]}</Text>
                  <AtIcon
                    value={expandedSections[categoryKey] ? 'chevron-up' : 'chevron-down'}
                    size="16"
                    color="#fff"
                  />
                </View>
                {expandedSections[categoryKey] && (
                  <View style={{ marginTop: '8px', paddingLeft: '16px', borderLeft: '1px solid #4a5568' }}>
                    {guides.map(guide => guide.listing && (
                      <Text
                        key={guide.id}
                        style={{
                          display: 'block',
                          paddingTop: '4px',
                          paddingBottom: '4px',
                          fontSize: '14px',
                          color: '#cbd5e0',
                          cursor: 'pointer',
                        }}
                        onClick={() => navigateTo(`/pages/post/guide-post?title=${encodeURIComponent(guide.title)}`)}
                      >
                        {guide.title}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      </View>
    </>
  )
}

export default LeftNavMenu
