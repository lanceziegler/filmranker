'use client';
import React, { useState } from 'react';
import { Skeleton } from '@mantine/core';
import Image from 'next/image';

interface LazyImageProps {
  alt: string;
  src: string;
  width: number;
  height: number;
  sizes: string;
  style: React.CSSProperties;
}

const LazyImage: React.FC<LazyImageProps> = ({
  alt,
  src,
  width,
  height,
  sizes,
  style,
}) => {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <div style={{ position: 'relative', width, height }}>
      {!loaded && <Skeleton style={{ position: 'absolute', width, height }} />}
      <Image
        alt={alt}
        src={src}
        width={width}
        height={height}
        sizes={sizes}
        style={{ ...style, opacity: loaded ? 1 : 0 }}
        onLoad={handleLoad}
      />
    </div>
  );
};

export default LazyImage;
