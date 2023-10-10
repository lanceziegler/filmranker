'use client';

import { Button, Group, useMantineColorScheme, Title } from '@mantine/core';
import { IconSun, IconMoon, IconLoader } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export default function ColorSchemeToggle() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <Button color='gray'>
        <IconLoader className='animate-spin' />
      </Button>
    );
  }

  return (
    <Group>
      <Button
        onClick={() =>
          colorScheme === 'dark'
            ? setColorScheme('light')
            : setColorScheme('dark')
        }
        color={colorScheme === 'dark' ? 'blue' : 'yellow'}
      >
        <span className={colorScheme === 'dark' ? 'text-white' : 'text-black'}>
          {colorScheme}
        </span>
        {colorScheme === 'dark' ? <IconMoon /> : <IconSun color='black' />}
      </Button>
      {/* <Button onClick={() => setColorScheme('auto')}>Auto</Button> */}
    </Group>
  );
}
