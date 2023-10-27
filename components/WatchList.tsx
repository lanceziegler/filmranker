'use client';
import { useState, useEffect } from 'react';
import LocalMovie from './LocalMovie';

// DnDKit STAGGER IMPORT
function WatchList() {
  const [array, setArray] = useState<any>([]);

  useEffect(() => {
    const parsedArray =
      JSON.parse(localStorage.getItem('myArray1') as string) || [];

    setArray(parsedArray);
    console.log('THIS IS STATE: ', parsedArray);
  }, []);

  return (
    <div className='mt-24 border-gray-200 border-2 rounded-3xl'>
      <h1 className='text-3xl p-5 font-montserrat font-semibold underline underline-offset-4 pb-2'>
        Your Movies:
      </h1>
      <div className='flex flex-wrap justify-center'>
        {array.map((movie: any, i: number) => {
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
      </div>
    </div>
  );
}

export default WatchList;
