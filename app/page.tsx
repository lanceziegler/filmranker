import TierList from '@/components/TierList';
import WatchList from '@/components/WatchList';
import Nav from '@/components/Nav';
import Trash from '@/components/Trash';

export default function HomePage() {
  return (
    <>
      <Nav btnLink='/popular/1' text='Popular' />
      <main>
        <div className='flex gap-5'>
          <div className='flex flex-1 justify-center'>
            <TierList />
          </div>
          <div className='flex flex-1 justify-center'>
            <WatchList />
          </div>
          <Trash />
        </div>
      </main>
    </>
  );
}
