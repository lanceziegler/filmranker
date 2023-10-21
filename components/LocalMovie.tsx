import React from 'react';
import { Tooltip } from '@mantine/core';
import Image from 'next/image';
import { useDraggable } from '@dnd-kit/core';

interface propTypes {
  title: string;
  key: number;
  poster: string;
}

const LocalMovie = ({ title, key, poster }: propTypes) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: key,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <Tooltip label={title} key={key}>
      {poster !== null ? (
        <Image
          alt={title}
          src={`https://image.tmdb.org/t/p/w154${poster}`}
          width={50}
          height={50}
          //   sizes='100vw'
          loading='lazy'
          className='rounded-full hover:scale-105 transition-transform hover:drop-shadow-glow w-auto h-auto'
          style={style}
          ref={setNodeRef}
        />
      ) : (
        <Image
          alt={title}
          src='/noImage.jpeg'
          width={50}
          height={50}
          //   sizes='100vw'
          style={{ width: 'auto', height: 'auto' }}
        />
      )}
    </Tooltip>
  );
};

export default LocalMovie;
