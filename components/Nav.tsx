'use client';

import { IconUser } from '@tabler/icons-react';
import { Title, Button } from '@mantine/core';
import Search from './Search';
import { UserButton } from './UserButton';
import { useEffect } from 'react';
import { IconMilitaryRank } from '@tabler/icons-react';

interface NavProps {
  btnLink: string;
  text: string;
}

function Nav({ btnLink, text }: NavProps) {
  return (
    <nav className='fixed top-0 left-0 w-full flex justify-between items-center p-4 shadow-lg z-50'>
      <div className='flex gap-16 items-center'>
        <div className='flex gap-1 items-center cursor-default select-none'>
          <IconMilitaryRank size={40} />
          <div className='flex flex-col justify-center items-center'>
            <h1 className='font-caveat text-4xl underline underline-offset-4 decoration-1 decoration-amber-800 font-semibold'>
              FilmRanker
            </h1>
            <h4 className='text-xs italic -m-1'>{'- Rank your movies -'}</h4>
          </div>
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
