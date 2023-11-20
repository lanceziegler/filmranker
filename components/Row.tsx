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

  // function handleDrop(e: React.DragEvent) {
  //   const movieName = e.dataTransfer.getData('title') as string;
  //   const movie = JSON.parse(e.dataTransfer.getData('movie'));
  //   console.log(movieName, `dropped into ${row}`);
  //   const source = e.dataTransfer.getData('source');
  //   const updatedTierListObject = { ...tierListObject };

  //   const isItemInTierListState = Object.values(tierListObject).some(
  //     (array: any) => array.includes(movie)
  //   );
  //   //@ts-ignore
  //   const isItemInTierListStateArray = tierListObject[row].some(
  //     (item: any) => item.id === movie.id
  //   );
  //   // const isItemInTierListState = tierListObject[row].includes(movie);

  //   setDragOver(false);

  //   if (movie) {
  //     //******* LOGIC FOR WATCHLIST  *******************************************************WatchList/
  //     const localStorageWatchList = localStorage.getItem(
  //       'localStorageWatchList'
  //     );
  //     const existingWatchListArray = localStorageWatchList
  //       ? JSON.parse(localStorageWatchList)
  //       : [];
  //     const isItemInWatchListLocalStorage = existingWatchListArray.some(
  //       (item: any) => item.id === movie.id
  //     );

  //     const watchListIndex = existingWatchListArray.findIndex(
  //       (item: any) => item.id === movie.id
  //     );

  //     if (isItemInWatchListLocalStorage && !isItemInTierListState) {
  //       //* Remove movie if in WatchList local storage already
  //       existingWatchListArray.splice(watchListIndex, 1);
  //       localStorage.setItem(
  //         'localStorageWatchList',
  //         JSON.stringify(existingWatchListArray)
  //       );
  //       setWatchListArray(existingWatchListArray);
  //     }

  //     //******* LOGIC FOR TIERLIST **********************************************************TierList/
  //     // let movieAlreadyInTierList = false;
  //     // Object.keys(tierListObject).forEach((key) => {
  //     //   //@ts-ignore
  //     //   if (tierListObject[key].some((item: any) => item.id === movie.id)) {
  //     //     movieAlreadyInTierList = true;
  //     //   }
  //     // });
  //     if (!isItemInTierListStateArray) {
  //       //@ts-ignore
  //       //TODO need to find the index of the current
  //       updatedTierListObject[row].push(movie);
  //       setTierListObject(updatedTierListObject);
  //       console.log('tierListObject', tierListObject);
  //     }

  //     const localStorageTierList = localStorage.getItem('localStorageTierList');
  //     const existingTierList = localStorageTierList
  //       ? JSON.parse(localStorageTierList)
  //       : [];
  //     const isItemInTierListLocalStorage = Object.values(existingTierList).some(
  //       (array: any) => array.includes(movie)
  //     );

  //     const tierListIndexes = Object.entries(tierListObject)
  //       .map(([tier, array]: [string, any]) => {
  //         const index = array.findIndex((item: any) => item.id === movie.id);
  //         return index !== -1 ? { tier, index } : undefined;
  //       })
  //       .filter((entry) => entry !== undefined);

  //     console.log('TIER LIST INDEXES:', tierListIndexes);
  //     console.log('SOURCE: ' + source);

  //     if (source === 'TierList') {
  //       console.log('Item Dragged from TierList in TierList');
  //       // Figure out where item is being dragged from (tierListIndexes)
  //     }
  //   }
  // }

  // function handleDragOver(e: React.DragEvent) {
  //   e.preventDefault();
  //   console.log('dragging over ', row);
  //   setDragOver(true);
  // }

  // function handleDragLeave(e: React.DragEvent) {
  //   e.preventDefault();
  //   setDragOver(false);
  // }
  // Make it so that when a movie is dropped into the row, it has a border that is the color of the row for 500ms
  return (
    <div
      // onDrop={handleDrop}
      // onDragOver={handleDragOver}
      // onDragLeave={handleDragLeave}
      // className={`h-24 flex flex-col justify-center ${
      //   dragOver ? color : ''
      // } ${bgColor} ${textColor} hover:text-black`}
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
              <div key={i} className={`hover:scale-105 transition-transform`}>
                <LocalMovie
                  title={movie.title}
                  poster={movie.poster_path}
                  id={movie.title}
                  movie={movie}
                  source='TierList'
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
