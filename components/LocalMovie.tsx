'use client';

import { Tooltip } from '@mantine/core';
import Image from 'next/image';
import { useState } from 'react';

interface propTypes {
  title: string;
  poster: string;
  id: string;
  movie: any;
  source: 'WatchList' | 'TierList';
}

const LocalMovie = ({ title, poster, id, movie, source }: propTypes) => {
  const [clickScale, setClickScale] = useState(false);
  const [lastDragged, setLastDragged] = useState<{
    tier: string;
    index: number;
  } | null>(null);

  function handleOnDrag(e: React.DragEvent, title: string) {
    e.dataTransfer.setData('title', title);
    e.dataTransfer.setData('movie', JSON.stringify(movie));
    e.dataTransfer.setData('source', source);
    setClickScale(true);
  }

  function handleDragEnd() {
    setClickScale(false);
  }

  function handleMouseDown() {
    setClickScale(true);
  }

  function handleMouseUp() {
    setClickScale(false);
  }

  return (
    <div
      draggable
      onDragStart={(e) => handleOnDrag(e, id)}
      onDragEnd={handleDragEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className={`${
        clickScale ? 'scale-110' : ''
      } transition-transform hover:cursor-pointer fadeIn`}
    >
      <Tooltip label={title} withArrow arrowSize={10}>
        {poster !== null ? (
          <Image
            alt={title}
            src={`https://image.tmdb.org/t/p/w154${poster}`}
            width={50}
            height={50}
            //   sizes='100vw'
            loading='lazy'
            className='p-1 hover:scale-105 transition-transform w-auto h-auto'
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
    </div>
  );
};

export default LocalMovie;
