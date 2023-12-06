'use client';

import { Divider, Group } from '@mantine/core';
import { useContext, useState, useCallback, useMemo } from 'react';
import { SavedMoviesContext } from '@/app/libs/MoviesProvider';
import LocalMovie from './LocalMovie';
// import { useDroppable } from '@dnd-kit/core';
import SortableItem from './SortableItem';
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import {
  DndContext,
  closestCenter,
  useSensors,
  useSensor,
  MouseSensor,
  TouchSensor,
  DragStartEvent,
  DragEndEvent,
  DragCancelEvent,
  DragOverlay,
} from '@dnd-kit/core';

interface propTypes {
  id: string;
  row: string;
  bgColor: string;
  textColor: string;
  color: string;
}

const Row = ({ id, row, bgColor, textColor, color }: propTypes) => {
  // const { setNodeRef } = useDroppable({
  //   id: id,
  // });
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeTitle, setActiveTitle] = useState<string | null>(null);
  const [activePoster, setActivePoster] = useState<string | null>(null);
  const {
    array,
    setArray,
    watchListArray,
    setWatchListArray,
    tierListObject,
    setTierListObject,
  } = useContext(SavedMoviesContext)!;

  // Function to retrieve array from relevant {row}
  const getArrayForRow = (tierListObject: any, row: string) => {
    return tierListObject[row] || [];
  };
  const tierListRowArray = getArrayForRow(tierListObject, row);
  console.log(`Array for Tier ${row}: `, tierListRowArray);

  const tierListRowArrayIds = useMemo(
    () => tierListRowArray.map((item: any) => item.id),
    [tierListRowArray]
  );

  // const [dragOver, setDragOver] = useState(false);

  //* HANDLE DRAG START ----------------------------------- Handle drag start
  const handleDragStart = useCallback(
    (event: any) => {
      const { id, data } = event.active;
      const index = tierListRowArray.findIndex((item: any) => item.id === id);

      if (index !== -1) {
        setActiveId(id);
        setActiveTitle(tierListRowArray[index].title);
        setActivePoster(tierListRowArray[index].poster_path);
      } else {
        // Handle the case when the movie with the given id is not found
        console.error(`Movie with id ${id} not found in tierListRowArray`);
      }
    },
    [tierListRowArray]
  );

  //TODO ->
  //* HANDLE DRAG END -------------------------------------- Handle drag end
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      console.log(`active id: ${active.id}`);
      console.log(`over id: ${over?.id}`);

      // Checking if the ID of the current movie is different than the one it's over
      //TODO Here is where we will use the newArray to remove the watchListArray item (need index...) AND update localstorage, add append it to the tierListRowArray AND update localstorage for that as well...
      if (active.id !== over?.id) {
        setWatchListArray((watchListArray) => {
          // Create a new copy of the array before modifying it
          const newArray = [...watchListArray];

          const localStorageWatchList = localStorage.getItem(
            'localStorageWatchList'
          );
          const existingWatchListArray = localStorageWatchList
            ? JSON.parse(localStorageWatchList)
            : [];

          // Find the indices in the copied array
          const oldIndex = newArray.findIndex((item) => item.id === active.id);
          //over!.id
          const newIndex = newArray.findIndex((item) => item.id === over?.id);

          console.log(`old index: ${oldIndex}`);
          console.log(`new index: ${newIndex}`);

          // Modify the copied array
          const movedArray = arrayMove(newArray, oldIndex, newIndex);

          //* Setting local Storage to new order of movedArray
          localStorage.setItem(
            'localStorageWatchList',
            JSON.stringify(movedArray)
          );

          // Return the modified array
          return movedArray;
        });
      }

      setActiveId(null);
    },
    [setWatchListArray]
  );

  //* HANDLE DRAG Cancel ----------------------------------- Handle drag cancel
  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  //TODO -------------- REMOVE IF NOT NEEDED ---------------------------------------
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
  //TODO -------------- END REMOVE IF NOT NEEDED ---------------------------------------

  //TODO Make it so that when a movie is dropped into the row, it has a border that is the color of the row for 500ms
  return (
    <div
      // onDrop={handleDrop}
      // onDragOver={handleDragOver}
      // onDragLeave={handleDragLeave}
      // className={`h-24 flex flex-col justify-center ${
      //   dragOver ? color : ''
      // } ${bgColor} ${textColor} hover:text-black`}
      // ref={setNodeRef}
      className={`h-24 flex flex-col justify-center ${textColor}`}
    >
      <div>
        <Group>
          <div className={`pl-4 font-montserrat text-xl font-semibold flex`}>
            {row.toUpperCase()}
          </div>
          <Divider orientation='vertical' size='md' />
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
          >
            <SortableContext
              items={tierListRowArrayIds}
              strategy={rectSortingStrategy}
            >
              {/**@ts-ignore */}
              {tierListObject[row].map((movie: any, i: number) => {
                return (
                  <div
                    key={i}
                    className={`hover:scale-105 transition-transform`}
                  >
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
            </SortableContext>
          </DndContext>
        </Group>
      </div>
    </div>
  );
};

export default Row;
