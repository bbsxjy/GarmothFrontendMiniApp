
import React from 'react';
import { View, Image, Text, Navigator } from '@tarojs/components';

interface NoticeProp {
  href: string;
  imgSrc: string;
  title: string;
  dateTime: string;
  className?: string;
}

const Notice: React.FC<NoticeProp> = ({
  href,
  imgSrc,
  title,
  dateTime,
  className = ""
}) => {
  return (
    <Navigator
      url={href}
      openType="navigate"
      target="self"
      className={`h-[17.5rem] min-w-[185px] max-w-[185px] transition hover:scale-[1.03] ${className}`}
    >
      <Image
        src={imgSrc}
        lazyLoad
        className="h-56 rounded-lg bg-600 object-none object-top"
      />
      <Text className="cut-text py-1 text-sm font-semibold">{title}</Text>
      <Text className="text-xs text-200">{dateTime}</Text>
    </Navigator>
  );
};

export default Notice;
