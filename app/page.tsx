import TierList from '@/components/TierList';
import WatchList from '@/components/WatchList';
import Nav from '@/components/Nav';

export default function HomePage() {

  return (
    <>
      <Nav btnLink='/popular/1' text='Popular' />
      <main>
        <div className='flex gap-5'>
          <div className='flex flex-1'>
            <TierList />
          </div>
          <div className='flex flex-1'>
            <WatchList />
          </div>
        </div>
      </main>
    </>
  );
}
