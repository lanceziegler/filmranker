'use client';
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import LocalMovie from './LocalMovie';
import { SavedMoviesContext } from '@/app/libs/MoviesProvider';
import { useContext } from 'react';
import Trash from './Trash';
import Draggable from './Draggable';
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
import { IconLoader } from '@tabler/icons-react';

// DnDKit STAGGER IMPORT
function WatchList() {
  const watchListRef = useRef(null);
  // const [array, setArray] = useState<any>([]);
  const {
    array,
    setArray,
    watchListArray,
    setWatchListArray,
    tierListObject,
    setTierListObject,
  } = useContext(SavedMoviesContext)!;
  const watchListArrayCopy = [...watchListArray];

  const watchListArrayIds = useMemo(
    () => watchListArray.map((item) => item.id),
    [watchListArray]
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeTitle, setActiveTitle] = useState<string | null>(null);
  const [activePoster, setActivePoster] = useState<string | null>(null);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  //* HANDLE DRAG START ----------------------------------- Handle drag start
  const handleDragStart = useCallback(
    (event: any) => {
      const { id, data } = event.active;
      const index = watchListArray.findIndex((item) => item.id === id);

      if (index !== -1) {
        setActiveId(id);
        setActiveTitle(watchListArray[index].title);
        setActivePoster(watchListArray[index].poster_path);
      } else {
        // Handle the case when the movie with the given id is not found
        console.error(`Movie with id ${id} not found in watchListArray`);
      }
    },
    [watchListArray]
  );

  //* HANDLE DRAG END -------------------------------------- Handle drag end
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      console.log(`active id: ${active.id}`);
      console.log(`over id: ${over?.id}`);

      if (
        active.data.current!.source === 'WatchList' &&
        over?.data.current!.source === 'WatchList'
      ) {
        // Checking if the ID of the current movie is different than the one it's over
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
            const oldIndex = newArray.findIndex(
              (item) => item.id === active.id
            );
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
      }
    },
    [setWatchListArray]
  );

  //* HANDLE DRAG CANCEL ----------------------------------- Handle drag cancel
  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  //TODO -------------- REMOVE IF NOT NEEDED ---------------------------------------
  // useEffect(() => {
  //   const parsedArray =
  //     JSON.parse(localStorage.getItem('myArray1') as string) || []; //TODO Alter to start fresh

  //   setArray(parsedArray);
  //   console.log('THIS IS STATE: ', parsedArray);
  // }, [setArray]);

  // function handleDrop(e: React.DragEvent) {
  //   const movie = JSON.parse(e.dataTransfer.getData('movie'));
  //   const movieId = movie.id;
  //   const source = e.dataTransfer.getData('source');
  //   const updatedTierListObject = { ...tierListObject };

  //   if (!watchListArrayCopy.some((m: any) => m.id === movieId)) {
  //     watchListArrayCopy.push(movie);
  //     setWatchListArray(watchListArrayCopy);
  //     console.log(`${movie.title} dropped into WatchList`);
  //     //! Need to set localstorage
  //   }

  //************* Tier List Indexes */
  // const tierListIndexes = Object.entries(tierListObject)
  //   .map(([tier, array]: [string, any]) => {
  //     const index = array.findIndex((item: any) => item.id === movie.id);
  //     return index !== -1 ? { tier, index } : undefined;
  //   })
  //   .filter((entry) => entry !== undefined);

  //   // use tierList indexes resuls

  //   console.log('TIER LIST INDEXES:', tierListIndexes);
  //   console.log('SOURCE: ' + source);
  // }

  // function handleDragOver(e: React.DragEvent) {
  //   e.preventDefault();
  //   console.log('dragging over Watchlist');
  // }
  //TODO -------------- END REMOVE IF NOT NEEDED ------------------------------------

  return (
    <div
      ref={watchListRef}
      className='mt-2 border-gray-200 border-2 rounded-3xl relative w-3/4 overflow-scroll no-scrollbar'
      id='watch'
      // onDrop={handleDrop}
      // onDragOver={handleDragOver}
    >
      <h1 className='text-3xl p-5 font-montserrat font-semibold underline underline-offset-4 pb-2'>
        Your Movies:
      </h1>
      {/** Make this div have onDragOver, onDragLeave, and onDrop functions */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext
          items={watchListArrayIds}
          strategy={rectSortingStrategy}
        >
          {watchListArray.length === 0 ? (
            <IconLoader className='animate-spin absolute top-1/2 right-1/2' />
          ) : (
            <div className='flex flex-wrap justify-center'>
              {watchListArray.map((movie: any, i: number) => (
                // <div key={i} className='hover:scale-105 transition-transform'>
                // {/* <Draggable id={i.toString()}> */}

                <SortableItem
                  key={movie.id}
                  id={movie.id}
                  row={null} //TODO Use this in Row.tsx to determine if movie exists in current row already or not
                  title={movie.title}
                  poster={movie.poster_path}
                  movie={movie}
                  source='WatchList'
                />

                // <LocalMovie
                //   key={i.toString()}
                //   id={movie.title}
                //   title={movie.title}
                //   poster={movie.poster_path}
                //   movie={movie}
                //   source='WatchList'
                // />
                // {/* </Draggable> */}
                // </div>
              ))}
            </div>
          )}
        </SortableContext>
        <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
          {activeId ? (
            <LocalMovie
              id={activeId}
              title={activeTitle || 'Missing title'}
              poster={activePoster || null}
              source='WatchList'
              isDragging
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

export default WatchList;
