'use client';
import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  rem,
  Button,
} from '@mantine/core';
import {
  IconChevronRight,
  IconChevronDown,
  IconUser,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useFocusWithin } from '@mantine/hooks';
import ColorSchemeToggle from './ColorSchemeToggle/ColorSchemeToggle';

export function UserButton() {
  const [showMenu, setShowMenu] = useState(false);
  //   const { ref, focused } = useFocusWithin();

  return (
    <UnstyledButton
      className='fixed top-2 right-0 block rounded-xl'
      //   ref={ref}
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      <Group className='p-2 box-border'>
        <div className='border-2 border-gray-300 border-dashed rounded-full'>
          <Avatar src='' radius='xl'>
            <IconUser />
          </Avatar>
        </div>

        <div style={{ flex: 1 }}>
          <Text size='sm' fw={500}>
            Signed in as guest
          </Text>

          <Text c='dimmed' size='xs'>
            Currently saving to localstorage
          </Text>
        </div>
        {/* {focused ? (
          <IconChevronDown
            style={{ width: rem(14), height: rem(14) }}
            stroke={1.5}
          />
        ) : (
          <IconChevronRight
            style={{ width: rem(14), height: rem(14) }}
            stroke={1.5}
          />
        )}
      </Group>
      {focused ? (
        <Group className='fixed'>
          <div></div>
        </Group>
      ) : null} */}
        {showMenu ? (
          <IconChevronDown
            style={{ width: rem(14), height: rem(14) }}
            stroke={1.5}
          />
        ) : (
          <IconChevronRight
            style={{ width: rem(14), height: rem(14) }}
            stroke={1.5}
          />
        )}
      </Group>
      {showMenu ? (
        <Group className='flex items-center justify-center content-center'>
          <Button color='green'>Sign In</Button>
          <ColorSchemeToggle />
        </Group>
      ) : null}
    </UnstyledButton>
  );
}
