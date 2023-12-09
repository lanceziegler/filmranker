'use client';

import TierList from '@/components/TierList';
import WatchList from '@/components/WatchList';
import Nav from '@/components/Nav';
import Trash from '@/components/Trash';
import {
  DndContext,
  useSensors,
  useSensor,
  TouchSensor,
  MouseSensor,
  closestCenter,
} from '@dnd-kit/core';
import { createPortal } from 'react-dom';

export default function HomePage() {
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  return (
    <>
      <Nav btnLink='/popular/1' text='Popular' />
      <main>
        <div className='flex gap-5 max-h-[42rem]'>
          <DndContext sensors={sensors} collisionDetection={closestCenter}>
            <div className='flex flex-1 justify-center'>
              <TierList />
            </div>
            <div className='flex flex-1 justify-center'>
              <WatchList />
            </div>
          </DndContext>
          <Trash />
        </div>
      </main>
    </>
  );
}
