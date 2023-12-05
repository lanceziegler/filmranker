'use client';
import { useState, useEffect, useMemo, useCallback } from 'react';
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
} from '@dnd-kit/core';
import { IconLoader } from '@tabler/icons-react';

// DnDKit STAGGER IMPORT
function WatchList() {
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
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragStart = useCallback((event: any) => {
    setActiveId(event.active.id);
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setWatchListArray((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over!.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }, []);

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

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

  //   const tierListIndexes = Object.entries(tierListObject)
  //     .map(([tier, array]: [string, any]) => {
  //       const index = array.findIndex((item: any) => item.id === movie.id);
  //       return index !== -1 ? { tier, index } : undefined;
  //     })
  //     .filter((entry) => entry !== undefined);

  //   // use tierList indexes resuls

  //   console.log('TIER LIST INDEXES:', tierListIndexes);
  //   console.log('SOURCE: ' + source);
  // }

  // function handleDragOver(e: React.DragEvent) {
  //   e.preventDefault();
  //   console.log('dragging over Watchlist');
  // }

  return (
    <div
      className='mt-2 border-gray-200 border-2 rounded-3xl relative w-3/4'
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
                  key={i}
                  id={movie.id}
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
      </DndContext>
    </div>
  );
}

export default WatchList;
