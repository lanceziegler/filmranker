'use client';
import { useDraggable } from '@dnd-kit/core';
import { ReactNode, useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { SavedMoviesContext } from '@/app/libs/MoviesProvider';
import { useContext } from 'react';

export default function Draggable({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };
  const [isDragging, setIsDragging] = useState(false);
  const {
    array,
    setArray,
    watchListArray,
    setWatchListArray,
    tierListObject,
    setTierListObject,
  } = useContext(SavedMoviesContext)!;

  function handleDragStart() {
    setIsDragging(true);
  }

  function handleDragEnd(event: any) {
    setIsDragging(false);
    const { active, over } = event;

    if (active.id !== over.id) {
      const updatedArray = [...watchListArray];
      const draggedIndex = updatedArray.findIndex(
        (movie) => movie.id === active.id
      );
      const targetIndex = updatedArray.findIndex(
        (movie) => movie.id === over.id
      );

      if (draggedIndex !== -1 && targetIndex !== -1) {
        // Reorder the array
        const [draggedMovie] = updatedArray.splice(draggedIndex, 1);
        updatedArray.splice(targetIndex, 0, draggedMovie);

        // Update state with the reordered array
        setWatchListArray(updatedArray);
      }
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}
    </div>
  );
}
