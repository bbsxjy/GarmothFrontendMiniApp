import React from 'react';
import { useGetSummaryQuery } from '@/api/grind-tracker/api';

const Summary: React.FC = () => {
  const { data, error, isLoading } = useGetSummaryQuery({});

  if (isLoading) {
    return <div>加载中...</div>;
  }

  if (error || !data) {
    return <div>加载失败</div>;
  }

  return (
    <div className="h-full grow overflow-y-auto px-2 py-1 pb-2 lg:p-3">
      <h1 className="text-2xl">用户总结</h1>
      <div className="mb-3">
        <div>总狩猎次数: {data.totalHunts}</div>
        <div>平均小时数: {data.averageHours}</div>
        <div>总战利品: {data.totalLoot}</div>
      </div>
      <div className="mb-3 overflow-x-auto">
        <table className="min-w-[1024px] overflow-hidden rounded bg-600">
          <thead>
            <tr className="bg-700 text-sm">
              <th>名称</th>
              <th className="text-right">攻击力范围</th>
              <th className="text-right">小时</th>
              <th className="text-right">垃圾/小时</th>
              <th className="pr-4 text-right">银币/小时</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item: any) => (
              <tr key={item.name} className="cursor-pointer bg-600 hover:bg-500">
                <td>{item.name}</td>
                <td className="text-right">{item.attackPower}</td>
                <td className="text-right">{item.hours} h</td>
                <td className="text-right">{item.loot}</td>
                <td className="pr-4 text-right">{item.silverPerHour}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Summary;
