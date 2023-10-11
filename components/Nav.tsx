import { IconUser } from '@tabler/icons-react';
import { Title, Button } from '@mantine/core';
import Search from './Search';
import { UserButton } from './UserButton';

function Nav() {
  return (
    <nav className='fixed top-0 left-0 w-full flex justify-between items-center p-4 shadow-lg'>
      <div className='flex gap-16 items-center'>
        <div className='flex gap-2 items-center'>
          <Title order={1} size='h1'>
            FilmRanker
          </Title>
          <Title order={6} size='h6' className='italic'>
            {'Rank your movies'}
          </Title>
        </div>
        <Button>Recently Released</Button>
        <Search />
      </div>
      <div className='relative'>
        <UserButton />
      </div>
    </nav>
  );
}

export default Nav;
