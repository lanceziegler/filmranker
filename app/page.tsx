import { Title } from '@mantine/core';
import TierList from '@/components/TierList';
import WatchList from '@/components/WatchList';

export default function HomePage() {
  return (
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
  );
}
