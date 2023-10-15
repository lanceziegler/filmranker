'use client';

import { IconUser } from '@tabler/icons-react';
import { Title, Button } from '@mantine/core';
import Search from './Search';
import { UserButton } from './UserButton';
import { useEffect } from 'react';

interface NavProps {
  btnLink: string;
  text: string;
}

function Nav({ btnLink, text }: NavProps) {
  return (
    <nav className='fixed top-0 left-0 w-full flex justify-between items-center p-4 shadow-lg z-50'>
      <div className='flex gap-16 items-center'>
        <div className='flex gap-2 items-center'>
          <Title order={1} size='h1'>
            FilmRanker
          </Title>
          <Title order={6} size='h6' className='italic'>
            {'Rank your movies'}
          </Title>
        </div>

        <Button component='a' href={btnLink}>
          {text}
        </Button>

        <Search />
      </div>
      <div className='relative'>
        <UserButton />
      </div>
    </nav>
  );
}

export default Nav;
