import React from 'react';

interface ArrowIconProps {
  direction: 'up' | 'down';
  size?: number;
  color?: string;
}

const ArrowIcon: React.FC<ArrowIconProps> = ({ direction, size = 20, color = 'currentColor' }) => {
  const rotateDegree = direction === 'up' ? 'rotate-0' : 'rotate-180';
  
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`transition ${rotateDegree}`}
      fill={color}
    >
      <path d="M12 6.879l-7.061 7.06l2.122 2.122L12 11.121l4.939 4.94l2.122-2.122z" />
    </svg>
  );
};

export default ArrowIcon;
