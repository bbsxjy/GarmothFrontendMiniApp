// src/components/ECharts/index.tsx
import React, { useEffect, useRef } from 'react'
import { Canvas } from '@tarojs/components'
import * as echarts from '../../components/echarts/echarts' // Adjust the path as needed

interface EChartsProps {
  option: echarts.EChartOption
  onEvents?: { [key: string]: Function }
}

const ECharts: React.FC<EChartsProps> = ({ option, onEvents }) => {
  const chartRef = useRef<any>(null)

  useEffect(() => {
    const chart = echarts.init(chartRef.current, null, { renderer: 'svg' })
    chart.setOption(option)

    if (onEvents) {
      Object.keys(onEvents).forEach((eventName) => {
        chart.on(eventName, onEvents[eventName])
      })
    }

    return () => {
      chart.dispose()
    }
  }, [option, onEvents])

  return <Canvas canvasId="mychart" style={{ width: '100%', height: '400px' }} ref={chartRef} />
}

export default ECharts
