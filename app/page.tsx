import { Title } from '@mantine/core';
import TierList from '@/components/TierList';
import WatchList from '@/components/WatchList';
import Nav from '@/components/Nav';

export default function HomePage() {
  return (
    <>
      <Nav btnLink='/popular/1' text='Popular' />
      <main>
        <div className='min-h-screen flex items-center'>
          <div className='flex justify-center flex-1'>
            <TierList />
          </div>
          <div className='flex justify-center flex-1'>
            <WatchList />
          </div>
        </div>
      </main>
    </>
  );
}
