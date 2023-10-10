import { IconUser } from '@tabler/icons-react';
import { Title, Button } from '@mantine/core';
import Search from './Search';

function Nav() {
  return (
    <nav className='fixed flex gap-10 items-center'>
      <div>
        <Title order={1} size='h1'>
          FilmRanker
        </Title>
        <Title order={6} size='h6' className='italic'>
          {'Rank your movies'}
        </Title>
      </div>
      <Button>Recently Released</Button>
      <Search />
    </nav>
  );
}

export default Nav;
