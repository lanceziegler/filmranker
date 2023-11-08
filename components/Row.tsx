'use client';

import { Divider, Group } from '@mantine/core';
import { useContext, useState } from 'react';
import { SavedMoviesContext } from '@/app/libs/MoviesProvider';
import LocalMovie from './LocalMovie';

interface propTypes {
  id: number;
  row: string;
  bgColor: string;
  textColor: string;
  color: string;
}

const Row = ({ id, row, bgColor, textColor, color }: propTypes) => {
  const {
    array,
    setArray,
    watchListArray,
    setWatchListArray,
    tierListObject,
    setTierListObject,
  } = useContext(SavedMoviesContext)!;

  const [dragOver, setDragOver] = useState(false);

  function handleDrop(e: React.DragEvent) {
    const movieName = e.dataTransfer.getData('title') as string;
    console.log(movieName, `dropped into ${row}`);
    setDragOver(false);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    console.log('dragging over ', row);
    setDragOver(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    setDragOver(false);
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`h-24 flex flex-col justify-center ${
        dragOver ? color : ''
      } ${bgColor} ${textColor} hover:text-black`}
    >
      <div>
        <Group>
          <div className={`pl-4 font-montserrat text-xl font-semibold flex`}>
            {row.toUpperCase()}
          </div>
          <Divider orientation='vertical' size='md' />

          {/**@ts-ignore */}
          {tierListObject[row].map((movie: any, i: number) => {
            return (
              <div key={i} className='hover:scale-105 transition-transform'>
                <LocalMovie
                  title={movie.title}
                  poster={movie.poster_path}
                  id={movie.title}
                />
              </div>
            );
          })}
        </Group>
      </div>
    </div>
  );
};

export default Row;
