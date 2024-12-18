import React from "react";

interface EnhanceControlsProps {
  chance: number;
  onChanceChange: (newChance: number) => void;
}

const EnhanceControls: React.FC<EnhanceControlsProps> = ({
  chance,
  onChanceChange,
}) => {
  return (
    <div className="relative flex justify-between">
      <div className="group flex justify-between text-200">
        <div className="flex items-center gap-1">
          <img
            src="https://assets.garmoth.com/icons/enhancement/additional_enhancement_chance.png"
            loading="lazy"
            alt=""
            className="opacity-50"
          />
          <div className="hidden lg:block">增加强化机率</div>
        </div>
        <div className="relative flex items-center">
          <div className="mr-1">+</div>
          <input
            className="h-7 w-12 border border-500 bg-700 bg-opacity-50 p-0 px-1 text-right text-base font-normal text-white hover:bg-opacity-50"
            type="number"
            value={chance}
            onChange={(e) => onChanceChange(Number(e.target.value))}
          />
          <div
            className="absolute -right-8 flex size-7 cursor-pointer select-none items-center justify-center rounded border-2 border-400 border-opacity-50 bg-500 opacity-25 hover:opacity-100"
            onClick={() => onChanceChange(chance - 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              className="icon text-white"
              width="1em"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M432 256c0 17.7-14.3 32-32 32H48c-17.7 0-32-14.3-32-32s14.3-32 32-32h352c17.7 0 32 14.3 32 32"
              />
            </svg>
          </div>
          <div
            className="absolute -right-16 flex size-7 cursor-pointer select-none items-center justify-center rounded border border-400 border-opacity-50 bg-500 opacity-25 hover:opacity-100"
            onClick={() => onChanceChange(chance + 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              className="icon text-white"
              width="1em"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhanceControls;
