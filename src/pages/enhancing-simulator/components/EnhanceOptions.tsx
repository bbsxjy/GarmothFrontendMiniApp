import React, { useState } from "react";

interface EnhanceOptionsProps {
  onEnhance: () => void;
}

const EnhanceOptions: React.FC<EnhanceOptionsProps> = ({ onEnhance }) => {
  const [attempts, setAttempts] = useState(0);

  const incrementAttempts = () => setAttempts(attempts + 1);
  const decrementAttempts = () => setAttempts(attempts > 0 ? attempts - 1 : 0);

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex justify-between">
        <button
          onClick={decrementAttempts}
          className="bg-500 border-400 w-7 h-7 flex items-center justify-center border rounded-md"
        >
          -
        </button>
        <input
          type="number"
          value={attempts}
          onChange={(e) => setAttempts(Number(e.target.value))}
          className="w-12 border border-500 text-center text-base"
        />
        <button
          onClick={incrementAttempts}
          className="bg-500 border-400 w-7 h-7 flex items-center justify-center border rounded-md"
        >
          +
        </button>
      </div>
      <div className="flex justify-between">
        <button
          onClick={onEnhance}
          className="border-green bg-green bg-opacity-80 w-full px-2 h-10 relative overflow-hidden font-normal py-0 border rounded-md transition hover:brightness-125 text-base font-bold"
        >
          强化
        </button>
        <button
          onClick={() => setAttempts(0)}
          className="bg-500 border-400 w-full px-2 h-10 relative overflow-hidden font-normal py-0 border rounded-md transition hover:brightness-125 text-base"
        >
          重置
        </button>
      </div>
    </div>
  );
};

export default EnhanceOptions;
