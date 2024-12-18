import React from "react";

interface EnhanceResultsProps {
  failureCount: number;
}

const EnhanceResults: React.FC<EnhanceResultsProps> = ({ failureCount }) => {
  return (
    <div className="max-h-[13rem] min-h-[13rem] w-full overflow-y-auto rounded-md bg-700 px-2 py-1">
      <div className="text-red flex grid grid-cols-2 gap-2 border-b border-600 py-0.5">
        <div className="block text-right">失败次数:</div>
        <span className="number">{failureCount.toFixed(3)}</span>
      </div>
    </div>
  );
};

export default EnhanceResults;
