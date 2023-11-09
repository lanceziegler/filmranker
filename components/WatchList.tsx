'use client';
import { useState, useEffect } from 'react';
import LocalMovie from './LocalMovie';
import { SavedMoviesContext } from '@/app/libs/MoviesProvider';
import { useContext } from 'react';

// DnDKit STAGGER IMPORT
function WatchList() {
  // const [array, setArray] = useState<any>([]);
  const { array, setArray, watchListArray, setWatchListArray } =
    useContext(SavedMoviesContext)!;

  // useEffect(() => {
  //   const parsedArray =
  //     JSON.parse(localStorage.getItem('myArray1') as string) || []; //TODO Alter to start fresh

  //   setArray(parsedArray);
  //   console.log('THIS IS STATE: ', parsedArray);
  // }, [setArray]);

  function handleDrop(e: React.DragEvent) {
    const movieName = e.dataTransfer.getData('title') as string;
    console.log(`${movieName} dropped into WatchList`);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    console.log('dragging over Watchlist');
  }

  return (
    <div
      className='mt-2 border-gray-200 border-2 rounded-3xl'
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <h1 className='text-3xl p-5 font-montserrat font-semibold underline underline-offset-4 pb-2'>
        Your Movies:
      </h1>
      {/** Make this div have onDragOver, onDragLeave, and onDrop functions */}
      <div className='flex flex-wrap justify-center'>
        {watchListArray.map((movie: any, i: number) => {
          return (
            <div key={i} className='hover:scale-105 transition-transform'>
              <LocalMovie
                title={movie.title}
                poster={movie.poster_path}
                id={movie.title}
                movie={movie}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WatchList;
