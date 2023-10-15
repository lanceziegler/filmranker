'use client';
import { useState, useEffect } from 'react';
import { TextInput, Button } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useFocusWithin } from '@mantine/hooks';
import Image from 'next/image';
import { Waypoint } from 'react-waypoint';

function SearchResults({ results }: any) {
  return (
    <div className='search-results absolute overflow-y-scroll max-h-96 bg-black'>
      {results.map((result: any, i: number) => (
        <div key={i} className='flex hover:bg-gray-800'>
          <Image
            alt={result.title}
            src={`https://image.tmdb.org/t/p/w1280${result.poster_path}`}
            width={50}
            height={50}
            //   sizes='100vw'
            style={{ width: 'auto', height: 'auto' }}
            placeholder='empty'
            priority
          />
          {result.title}
        </div>
      ))}
    </div>
  );
}

function Search() {
  const { ref, focused } = useFocusWithin();
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState<null | number>(null);

  useEffect(() => {
    const handleSearch = async () => {
      if (query.trim() === '') {
        setSearchResults([]);
        return;
      }

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${query}`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('TMDB API Response:', data);
        setSearchResults(data.results);
        setPage(data.page);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    handleSearch();
  }, [query]);

  return (
    <div ref={ref}>
      <TextInput
        radius={7}
        variant='filled'
        leftSection={<IconSearch />}
        placeholder='Search movies'
        aria-label='search bar'
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className={focused ? 'drop-shadow-glow' : ''}
      />
      <SearchResults results={searchResults} />
    </div>
  );
}

export default Search;
