import React from 'react';
import { useFetchTradeItemsQuery } from '@/api/common/tradeApi';
import MenuItem from './MenuItem';

const MobileMenu: React.FC = () => {
  const { data: tradeCategories, error, isLoading } = useFetchTradeItemsQuery();

  return (
    <div className="fixed inset-x-0 bottom-0 top-12 z-50 overflow-y-auto">
      <div className="overflow-hidden border-t border-600 bg-700" style={{ maxHeight: '1080px', transition: 'max-height 0.4s ease-in-out' }}>
        <div>
          <div className="my-2 grid gap-2 px-3 grid-cols-2">
            <div className="rounded-md border bg-600 py-1 text-center border-green">工具</div>
            <div className="rounded-md border bg-600 py-1 text-center border-500">指南</div>
          </div>

          {tradeCategories?.map((category, index) => (
            <div key={index} className="group text-center">
              <div className="flex items-center border-t border-600 px-3 pt-2 text-sm font-semibold text-200 group-hover:underline">
                {category.categoryName}
              </div>
              <div className="grid grid-cols-2 gap-2 p-2">
                {category.data.map(item => (
                  <div key={item.imgAlt} className="w-full">
                    <MenuItem {...item} isMobile />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
