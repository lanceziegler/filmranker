'use client';

import { Tooltip } from '@mantine/core';
import Image from 'next/image';
import { useState, forwardRef, HTMLAttributes, CSSProperties } from 'react';
import { useDraggable } from '@dnd-kit/core';
import Draggable from './Draggable';
// interface propTypes {
//   title: string;
//   poster: string;
//   id: string;
//   movie: any;
//   source: 'WatchList' | 'TierList';
// }
export type WatchListProps = HTMLAttributes<HTMLDivElement> & {
  // id: string;
  withOpacity?: boolean;
  isDragging?: boolean;
  title: string;
  poster: string;
  movie?: any;
  source?: 'WatchList' | 'TierList';
  tier?: 'a' | 'b' | 'c' | 'd' | 'f';
};

const LocalMovie = forwardRef<HTMLDivElement, WatchListProps>(
  ({ withOpacity, isDragging, style, ...props }, ref) => {
    const inlineStyles: CSSProperties = {
      opacity: withOpacity ? '0.5' : '1',
      transformOrigin: '50% 50%',
      cursor: isDragging ? 'grabbing' : 'grab',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: isDragging
        ? 'rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px'
        : 'rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px',
      transform: isDragging ? 'scale(1.05)' : 'scale(1)',
      ...style,
    };

    // const { attributes, listeners, setNodeRef } = useDraggable({
    //   id: id,
    // });
    // const [isDragging, setIsDragging] = useState(false);
    //test
    // const [clickScale, setClickScale] = useState(false);
    // const [lastDragged, setLastDragged] = useState<{
    //   tier: string;
    //   index: number;
    // } | null>(null);

    // function handleOnDrag(e: React.DragEvent, title: string) {
    //   e.dataTransfer.setData('title', title);
    //   e.dataTransfer.setData('movie', JSON.stringify(movie));
    //   e.dataTransfer.setData('source', source);
    //   setClickScale(true);
    // }

    // function handleDragEnd() {
    //   setClickScale(false);
    // }

    // function handleMouseDown() {
    //   setClickScale(true);
    // }

    // function handleMouseUp() {
    //   setClickScale(false);
    // }
    // function handleDragStart() {
    //   setIsDragging(true);
    // }

    // function handleDragEnd() {
    //   setIsDragging(false);
    // }
    return (
      // <Draggable id={id}>
      <div
        ref={ref}
        style={inlineStyles}
        id={props.id}
        {...props}
        // draggable
        // onDragStart={(e) => handleOnDrag(e, id)}
        // onDragEnd={handleDragEnd}
        // onMouseDown={handleMouseDown}
        // onMouseUp={handleMouseUp}
        // className={`${
        //   clickScale ? 'scale-110' : ''
        // } transition-transform hover:cursor-pointer fadeIn`}
        // onDragStart={handleDragStart}
        // onDragEnd={handleDragEnd}
      >
        <Tooltip
          label={props.title}
          withArrow
          arrowSize={10}
          disabled={isDragging}
        >
          {props.poster !== null ? (
            <Image
              alt={props.title || 'Movie Title'}
              src={`https://image.tmdb.org/t/p/w154${props.poster}`}
              width={50}
              height={50}
              //   sizes='100vw'
              loading='lazy'
              className='p-1 hover:scale-105 transition-transform w-auto h-auto'
            />
          ) : (
            <Image
              alt={props.title || 'Movie Title'}
              src='/noImage.jpeg'
              width={50}
              height={50}
              //   sizes='100vw'
              style={{ width: 'auto', height: 'auto' }}
            />
          )}
        </Tooltip>
      </div>
      // </Draggable>
    );
  }
);

LocalMovie.displayName = 'LocalMovie';

export default LocalMovie;
