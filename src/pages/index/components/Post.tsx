

import React from "react";
import { View, Image, Text, Navigator } from "@tarojs/components";
import type { PostItem } from "types";

interface PostProps extends PostItem {
  className?: string;
}

const Post: React.FC<PostProps> = ({
  link,
  backgroundImageUrl,
  title,
  badgeText,
  timeAgo,
  className = "",
}) => {


  const Content = () => (
    <>
      <View
        className="h-36 lg:h-52"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></View>
      <View
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top left, rgba(22, 23, 25, 0.25), rgba(0, 0, 0, 0), rgba(22, 23, 25, 0.6))",
        }}
      ></View>
      <Text className="absolute left-2 top-2 max-w-[11rem] text-base font-semibold opacity-90">
        {title}
      </Text>
      {badgeText && (
        <View className="absolute -right-0.5 -top-0.5 rounded-bl-md rounded-tr-md bg-blue px-2 text-sm font-semibold shadow-md shadow-black/25">
          <Text>{badgeText}</Text>
        </View>
      )}
      {timeAgo && (
        <Text className="absolute bottom-2 right-2 text-xs opacity-75">
          {timeAgo}
        </Text>
      )}
    </>
  );

  return <Navigator
    url={link}
    openType="navigate"
    className={`relative block rounded-md bg-600 shadow-lg transition hover:scale-[1.02] ${className}`}
    style={{ position: "relative", overflow: "hidden" }}
  >
    <Content />
  </Navigator>
};

export default Post;
