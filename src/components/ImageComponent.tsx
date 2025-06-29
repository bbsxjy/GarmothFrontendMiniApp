import React from 'react';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageComponent: React.FC<ImageProps> = ({ src, alt, className }) => {
  return <img src={src} alt={alt} className={className} loading="lazy" />;
};

export default ImageComponent;
