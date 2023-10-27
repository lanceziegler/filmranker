'use client';
import { Title } from '@mantine/core';
import TierList from '@/components/TierList';
import WatchList from '@/components/WatchList';
import Nav from '@/components/Nav';
import { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';

export default function HomePage() {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  // DND Handlers
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
  }

  return (
    <>
      <Nav btnLink='/popular/1' text='Popular' />
      <main>
        <div className='min-h-screen flex gap-4 items-center'>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            // onDragMove={handleDragMove}
            // onDragEnd={handleDragEnd}
          >
            <div className='flex justify-center flex-1'>
              <TierList />
            </div>
            <div className='flex justify-center flex-1'>
              <WatchList />
            </div>
          </DndContext>
        </div>
      </main>
    </>
  );
}
