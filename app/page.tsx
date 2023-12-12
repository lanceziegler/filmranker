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
  closestCorners,
} from '@dnd-kit/core';
import { createPortal } from 'react-dom';
import LocalMovie from '@/components/LocalMovie';

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
  const [hoveringRow, setHoveringRow] = useState<boolean | null>(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  //TODO Need to use the ROW data atttribute to perform logic on Rows.
  //* HANDLE DRAG START ----------------------------------- Handle drag start
  const handleDragStart = useCallback(
    (event: any) => {
      const { id, data } = event.active;
      //* Checks if movie is being dragged FROM WatchList
      if (data.current.source === 'WatchList') {
        console.log('ACTIVE: ', event.active);
        console.log('handleDragStart data source is WatchList');

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
      //* Checks if movie is being dragged FROM TierList
      if (data.current.source === 'TierList') {
        console.log('handleDragStart data source is TierList');
        const row = data.current.row;
        const getArrayForRow = (tierListObject: any, row: string) => {
          return tierListObject[row] || [];
        };
        const tierListRowArray = getArrayForRow(tierListObject, row);
        const index = tierListRowArray.findIndex((item: any) => item.id === id);

        if (index !== -1) {
          console.log('dragging item in tier: ', row.toUpperCase());
          // console.log(`title: ${tierListRowArray[index].title}`);
          // console.log(`poster: ${tierListRowArray[index].poster_path}`);
          setActiveId(id);
          setActiveTitle(tierListRowArray[index].title);
          setActivePoster(tierListRowArray[index].poster_path);
        } else {
          // Handle the case when the movie with the given id is not found
          console.error(`Movie with id ${id} not found in tierListRowArray`);
        }
      }
    },
    [watchListArray, tierListObject]
  );

  //* HANDLE DRAG END -------------------------------------- Handle drag end
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      const watchListArrayCopy = [...watchListArray];

      console.log(`active id: ${active.id}`);
      console.log(`over id: ${over?.id}`);

      //***********************************! Logic for dropping over WatchList from WatchList (AKA Reorder and implement arrayMove)
      if (
        active.data.current!.source === 'WatchList' &&
        over?.data.current!.source === 'WatchList'
      ) {
        // Checking if the ID of the current movie is different than the one it's over
        if (active.id !== over?.id) {
          setWatchListArray((watchListArray) => {
            // Create a new copy of the array before modifying it

            // const localStorageWatchList = localStorage.getItem(
            //   'localStorageWatchList'
            // );
            // const existingWatchListArray = localStorageWatchList
            //   ? JSON.parse(localStorageWatchList)
            //   : [];

            // Find the indices in the copied array
            const oldIndex = watchListArrayCopy.findIndex(
              (item) => item.id === active.id
            );
            //over!.id
            const newIndex = watchListArrayCopy.findIndex(
              (item) => item.id === over?.id
            );

            // Modify the copied array
            const movedArray = arrayMove(
              watchListArrayCopy,
              oldIndex,
              newIndex
            );

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

      //TODO To determine which row an item is dragging over, use active.data.current.rowComponent or over.data.current.rowComponent
      //TODO To determine row item is FROM which row, use active.data.current.row or over.data.current.row
      //*************************************************! Logic for dropping over WatchList from TierList Row (any)
      if (
        active.data.current!.source === 'TierList' &&
        over?.data.current!.source === 'WatchList'
      ) {
        //TODO 1: Get index of active TierList Row item
        // @ts-ignore
        const tierListItemIndex = tierListObject[
          active.data.current?.row
        ].findIndex((item: any) => item.id === active.id);

        //TODO 2: Push Item to COPIED watchListArray
        watchListArrayCopy.push(active);

        //TODO 3: Remove item from Row
        // const localStorageTierList = localStorage.getItem(
        //         'localStorageTierList'
        //       );
        // const existingTierList = localStorageTierList
        // ? JSON.parse(localStorageTierList)
        // : [];
        // const existingTierListRowArray = existingTierList
        //@ts-ignore
        const rowArray = tierListObject[active.data.current?.row];
        rowArray.splice(tierListItemIndex, 1);

        //TODO 4: Update localStorage tierList AND watchList
      }
      //*************************************************! Logic for dropping over TierList Row from SAME Row (Reorder and implement arrayMove)
      //TODO 1:
      //TODO 2:
      //TODO 3:

      //*************************************************! Logic for dropping over TierList Row from DIFFERENT Row
      //TODO 1:
      //TODO 2:
      //TODO 3:

      //*************************************************! Logic for dropping over TierList Row from WatchList
      //TODO 1:
      //TODO 2:
      //TODO 3:

      //*************************************************! Logic for dropping over TRASH from WatchList
      //TODO 1:
      //TODO 2:
      //TODO 3:

      //*************************************************! Logic for dropping over TRASH from TierList Row
      //TODO 1:
      //TODO 2:
      //TODO 3:
    },
    [setWatchListArray]
  );

  //TODO Use to test if registering drag from WatchList
  const handleDragOver = (event: any) => {
    const { active, over } = event;

    if (
      active.data.current.source === 'WatchList' &&
      over.data.current?.source === 'TierList'
    ) {
      console.log('Testing drag FROM WatchList TO TierList');
      // console.log(hoveringRow);
    }
    if (
      active.data.current.source === 'TierList' &&
      over.data.current?.source === 'WatchList'
    ) {
      console.log('Testing drag FROM TierList TO WatchList');
    }
    if (
      (active.data.current.source === 'WatchList' &&
        over.data.current?.source === 'WatchList') ||
      (active.data.current.source === 'TierList' &&
        over.data.current?.source === 'TierList')
    ) {
      console.log(
        `Testing drag within ${active.data.current.source} to ${active.data.current.source}`
      );
    }
    // Testing accessing row data
    if (
      active.data.current.source === 'WatchList' &&
      over.data.current.rowComponent
    ) {
      console.log(over.data.current.rowComponent);
    }
    //! Not working
    if (active.data.current.source === 'WatchList' && over.data.current.trash) {
      // console.log(over.data.current.trash);
      console.log('OVER TRASH');
    }
  };

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  return (
    <>
      <Nav btnLink='/popular/1' text='Popular' />
      <main>
        <div className='flex gap-5 max-h-[42rem]'>
          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragCancel={handleDragCancel}
            collisionDetection={closestCorners}
          >
            <div className='flex flex-1 justify-center'>
              <TierList
                activeId={activeId}
                setActiveId={setActiveId}
                activeTitle={activeTitle}
                activePoster={activePoster}
                setHoveringRow={setHoveringRow}
              />
            </div>
            <div className='flex flex-1 justify-center'>
              <WatchList
                activeId={activeId}
                activeTitle={activeTitle}
                activePoster={activePoster}
              />
            </div>
            <DragOverlay
              style={{ transformOrigin: '0 0 ' }}
              dropAnimation={{
                duration: 100,
                easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
              }}
              modifiers={[restrictToWindowEdges]}
            >
              {activeId ? (
                <LocalMovie
                  id={activeId}
                  title={activeTitle || 'Missing title'}
                  poster={activePoster || null}
                  // source='WatchList'
                  isDragging
                />
              ) : null}
            </DragOverlay>
            <Trash />
          </DndContext>
        </div>
      </main>
    </>
  );
}
