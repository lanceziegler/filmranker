'use client';

import { TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useFocusWithin } from '@mantine/hooks';

function Search() {
  const { ref, focused } = useFocusWithin();

  return (
    <div ref={ref}>
      <TextInput
        radius={7}
        variant='filled'
        leftSection={<IconSearch />}
        placeholder='Search movies'
        aria-label='search bar'
        className={focused ? 'drop-shadow-glow' : ''}
      ></TextInput>
    </div>
  );
}

export default Search;
