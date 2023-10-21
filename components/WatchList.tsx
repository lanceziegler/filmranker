'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Tooltip } from '@mantine/core';
import { DndContext } from '@dnd-kit/core';
import LocalMovie from './LocalMovie';

// DnDKit + Auto animate
function WatchList() {
  const [array, setArray] = useState<any>([]);
  const [parent, setParent] = useState(null);

  useEffect(() => {
    const parsedArray =
      JSON.parse(localStorage.getItem('myArray1') as string) || [];

    setArray(parsedArray);
    console.log('THIS IS STATE: ', parsedArray);
  }, []);

  return (
    <div className='mt-24 p-5 border-white border-2 rounded-3xl'>
      <h1 className='text-3xl font-inter font-semibold underline underline-offset-4 pb-2'>
        Your Movies:
      </h1>
      <div className='flex flex-wrap justify-center'>
        {array.map((movie: any, i: number) => {
          return (
            <div key={i} className='hover:scale-105 transition-transform'>
              <LocalMovie
                title={movie.title}
                key={i}
                poster={movie.poster_path}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WatchList;
