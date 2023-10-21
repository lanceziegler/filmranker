'use client';
import { Title } from '@mantine/core';
import TierList from '@/components/TierList';
import WatchList from '@/components/WatchList';
import Nav from '@/components/Nav';
import { DndContext } from '@dnd-kit/core';
import { useState } from 'react';

export default function HomePage() {
  const [parent, setParent] = useState(null);
  return (
    <>
      <Nav btnLink='/popular/0' text='Popular' />
      <main>
        <div className='min-h-screen flex gap-4 items-center'>
          <DndContext onDragEnd={handleDragEnd}>
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
  function handleDragEnd(event: any) {
    const { over } = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);
  }
}
