'use client';
import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext,
  useRef,
} from 'react';
import TierList from '@/components/TierList';
import WatchList from '@/components/WatchList';
import Nav from '@/components/Nav';
import Trash from '@/components/Trash';
import { SavedMoviesContext } from '@/app/libs/MoviesProvider';
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
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
  useDroppable,
} from '@dnd-kit/core';
import { createPortal } from 'react-dom';

export default function HomePage() {
  const {
    array,
    setArray,
    watchListArray,
    setWatchListArray,
    tierListObject,
    setTierListObject,
  } = useContext(SavedMoviesContext)!;
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeTitle, setActiveTitle] = useState<string | null>(null);
  const [activePoster, setActivePoster] = useState<string | null>(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  //TODO Need to use the ROW data atttribute to perform logic on Rows.
  //* HANDLE DRAG START ----------------------------------- Handle drag start
  const handleDragStart = useCallback(
    (event: any) => {
      console.log('DRAGGING HI LANCE');
      const { id, data } = event.active;
      //* Check if movie is being dragged FROM WatchList
      if (data.current.source === 'WatchList') {
        console.log('hi');

        const index = watchListArray.findIndex((item) => item.id === id);

        if (index !== -1) {
          setActiveId(id);
          setActiveTitle(watchListArray[index].title);
          setActivePoster(watchListArray[index].poster_path);
        } else {
          // Handle the case when the movie with the given id is not found
          console.error(`Movie with id ${id} not found in watchListArray`);
        }
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

      //* Logic for dragging over WatchList from WatchList (Reorder...)
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
      //* END logic for dragging over WatchList from WatchList (Reorder...)
    },
    [setWatchListArray]
  );

  return (
    <>
      <Nav btnLink='/popular/1' text='Popular' />
      <main>
        <div className='flex gap-5 max-h-[42rem]'>
          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className='flex flex-1 justify-center'>
              <TierList />
            </div>
            <div className='flex flex-1 justify-center'>
              <WatchList
                activeId={activeId}
                setActiveId={setActiveId}
                activeTitle={activeTitle}
                activePoster={activePoster}
              />
            </div>
          </DndContext>
          <Trash />
        </div>
      </main>
    </>
  );
}
