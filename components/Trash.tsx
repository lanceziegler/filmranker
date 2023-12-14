'use client';
import { useState, useContext, useEffect } from 'react';
import { IconTrash, Icon24Hours } from '@tabler/icons-react';
import { Tooltip } from '@mantine/core';
import { SavedMoviesContext } from '@/app/libs/MoviesProvider';
import { useDroppable } from '@dnd-kit/core';

const Trash = () => {
  const [toolTip, setToolTip] = useState(false);
  const {
    array,
    setArray,
    watchListArray,
    setWatchListArray,
    tierListObject,
    setTierListObject,
  } = useContext(SavedMoviesContext)!;
  const { setNodeRef, isOver } = useDroppable({
    id: `trash`,
    data: { trash: true },
  });

  // function handledrop(e: React.DragEvent) {}

  // //TODO: Figure out if there is a way to activate tooltip on dragover

  // function handleDragOver(e: React.DragEvent) {
  //   e.preventDefault();
  //   setToolTip(true);
  //   console.log('dragging over Trash Can');
  // }

  // function handleDragLeave(e: React.DragEvent) {
  //   e.preventDefault();
  //   setToolTip(false);
  // }

  return (
    <div
      ref={setNodeRef}
      // onDrop={handledrop}
      // onDragOver={handleDragOver}
      // onDragLeave={handleDragLeave}
      className='absolute bottom-5 right-5 scale-150 z-60'
    >
      {toolTip ? (
        <Tooltip label='Remove movie from profile' withArrow>
          <IconTrash />
        </Tooltip>
      ) : (
        <Tooltip label='Trash'>
          <IconTrash />
        </Tooltip>
      )}
      {/* <Tooltip label='Trash'>
        <IconTrash />
      </Tooltip> */}
    </div>
  );
};

export default Trash;
