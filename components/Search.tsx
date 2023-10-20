'use client';
import { useState, useEffect, useRef } from 'react';
import { TextInput, Button } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useFocusWithin } from '@mantine/hooks';
import Image from 'next/image';
import { Waypoint } from 'react-waypoint';
import { Tooltip } from '@mantine/core';

function SearchResults({ results, show }: any) {
  return (
    <>
      {show ? (
        <div className='search-results absolute overflow-y-scroll max-h-96 bg-black z-30 border-2 border-white'>
          {results.map((result: any, i: number) => (
            <div
              key={i}
              className='flex hover:bg-gray-800 border-gray-300 items-center gap-4 relative'
            >
              <Tooltip label='Add to Library'>
                <button className='absolute top-2 right-3 z-20 bg-green-600 px-2 rounded-full border-black border-2 box-border text-black'>
                  +
                </button>
              </Tooltip>
              {result.poster_path !== null ? (
                <Image
                  alt={result.title}
                  src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                  width={50}
                  height={50}
                  //   sizes='100vw'
                  style={{ width: 'auto', height: 'auto' }}
                  loading='lazy'
                />
              ) : (
                <Image
                  alt={result.title}
                  src='/noImage.jpeg'
                  width={50}
                  height={50}
                  //   sizes='100vw'
                  style={{ width: 'auto', height: 'auto' }}
                />
              )}

              {result.title}
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}

function Search() {
  const { ref, focused } = useFocusWithin();
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState<null | number>(null);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleSearch = async () => {
      if (query.trim() === '') {
        setSearchResults([]);
        return;
      }

      try {
        // setLoading(true);
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
        // setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        // setLoading(false);
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
      {searchResults[0] !== undefined && (
        <SearchResults results={searchResults} show={focused} />
      )}
    </div>
  );
}

export default Search;
