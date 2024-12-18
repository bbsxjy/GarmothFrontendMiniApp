import Taro from '@tarojs/taro'
import { useState } from 'react'
import { Text, View } from '@tarojs/components'

// Extend the Task interface to include a url field
interface TaskWithUrl {
  start: Date
  end: Date
  name: string
  id: string
  type: string
  progress: number
  dependencies: string[]
  isDisabled: boolean
  styles: {
    progressColor: string
    progressSelectedColor: string
  }
  url?: string
}

const GanttChart: React.FC = () => {
  const tasks: TaskWithUrl[] = [
    {
      start: new Date(2024, 9, 14),
      end: new Date(2024, 9, 21),
      name: '和姿态一起“抢家门”',
      id: '1',
      type: 'task',
      progress: 100,
      dependencies: [],
      isDisabled: true,
      styles: { progressColor: '#f56565cc', progressSelectedColor: '#f56565cc' },
      url: 'https://bd.qq.com/cp/a20240715gwyqyy/newsdetail.shtml?newsid=./newsdetail.shtml?newsid=18515647',
    },
    {
      start: new Date(2024, 9, 15),
      end: new Date(2024, 9, 30),
      name: '活动 2',
      id: '2',
      type: 'task',
      progress: 100,
      dependencies: [],
      isDisabled: true,
      styles: { progressColor: '#48bb78cc', progressSelectedColor: '#48bb78cc' },
      url: '#',
    },
    {
      start: new Date(2024, 9, 16),
      end: new Date(2024, 10, 30),
      name: '活动 3',
      id: '3',
      type: 'task',
      progress: 100,
      dependencies: [],
      isDisabled: true,
      styles: { progressColor: '#4299e1cc', progressSelectedColor: '#4299e1cc' },
      url: '#',
    },
    {
      start: new Date(2024, 9, 17),
      end: new Date(2024, 10, 21),
      name: '活动 4',
      id: '4',
      type: 'task',
      progress: 100,
      dependencies: [],
      isDisabled: true,
      styles: { progressColor: '#ffbb54', progressSelectedColor: '#ffbb54' },
      url: '#',
    },
    {
      start: new Date(2024, 9, 18),
      end: new Date(2024, 12, 30),
      name: '活动 5',
      id: '5',
      type: 'task',
      progress: 100,
      dependencies: [],
      isDisabled: true,
      styles: { progressColor: '#9f7aeacc', progressSelectedColor: '#9f7aeacc' },
      url: '#',
    },
    {
      start: new Date(2024, 9, 19),
      end: new Date(2024, 12, 10),
      name: '活动 6',
      id: '6',
      type: 'task',
      progress: 100,
      dependencies: [],
      isDisabled: true,
      styles: { progressColor: '#ed64a6cc', progressSelectedColor: '#ed64a6cc' },
      url: '#',
    },
  ]

  const [view, setView] = useState('Day') // ViewMode 类似值

  const handleTaskClick = (task: TaskWithUrl) => {
    if (task.url) {
      Taro.navigateTo({ url: task.url })
    }
  }

  return (
    <View className="">
      <Text>活动日历一览</Text>
      <View className="mt-3">
        {/* Gantt 组件替换为兼容 Taro 的图表库或自定义实现 */}
        {/*
                <Gantt
                    tasks={tasks}
                    viewMode={view}
                    viewDate={new Date()}
                    locale="zh-CN"
                    onClick={handleTaskClick}
                />
                */}

      </View>

      {/* Custom CSS for dynamic width */}
      <style>
        {`
                .gantt-container {
                    width: 100% !important;
                    background-color: #161719 !important;
                    color: #fdfdfd !important;
                }

                .gantt-container svg {
                    width: 100% !important;
                }

                rect[height="50"] {
                    fill: #1685A9 !important;
                }

                .calendar text {
                    fill: #fdfdfd !important;
                }

                .grid .rows rect {
                    fill: #161719 !important;
                }

                .grid .rowLines line, .grid .ticks line {
                    stroke: transparent !important;
                }

                .grid {
                    stroke: #fdfdfd !important;
                }

                .bar rect.progress {
                    fill: inherit !important;
                }

                .bar text {
                    fill: #fdfdfd !important;
                }
            `}
      </style>
    </View>
  )
}

export default GanttChart
