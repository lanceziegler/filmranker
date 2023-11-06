'use client';
import { useState, useEffect, useContext } from 'react';
import { TextInput, Button } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useFocusWithin } from '@mantine/hooks';
import Image from 'next/image';
import { Waypoint } from 'react-waypoint';
import { Tooltip } from '@mantine/core';
import { useMantineColorScheme } from '@mantine/core';
// import { SavedMoviesContext } from '@/app/page';
import { SavedMoviesContext } from '@/app/libs/MoviesProvider';
import getProviders from '@/app/libs/getProviders';

function SearchResults({ results, show }: any) {
  // Check what current color scheme is
  const colorScheme = useMantineColorScheme();
  let theme = colorScheme.colorScheme;
  let bgColor = theme === 'dark' ? 'bg-black' : 'bg-white';
  let textColor = theme === 'dark' ? 'white' : 'black';
  let hover = theme === 'dark' ? 'hover:bg-gray-900' : 'hover:bg-gray-100';
  // const [array, setArray] = useState<any>([]);
  const { array, setArray } = useContext(SavedMoviesContext)!;

  // useEffect(() => {
  //   //@ts-ignore
  //   const parsedArray = JSON.parse(localStorage.getItem('myArray1')) || [];
  //   setArray(parsedArray);
  //   console.log('THIS IS STATE: ', parsedArray);
  // }, [setArray]);

  //* LocalStorage button handler
  const handleClickLocal = (movie: any) => {
    //@ts-ignore
    const existingArray = JSON.parse(localStorage.getItem('myArray1')) || []; //TODO Alter these localStorage arrays to start fresh
    const isItemInLocalStorage = existingArray.some(
      (item: any) => item.id === movie.id
    );
    const index = existingArray.findIndex((item: any) => item.id === movie.id);

    if (isItemInLocalStorage) {
      existingArray.splice(index, 1);
      localStorage.setItem('myArray1', JSON.stringify(existingArray)); //TODO
      setArray(existingArray);
    } else {
      existingArray.push(movie);
      localStorage.setItem('myArray1', JSON.stringify(existingArray)); //TODO
      console.log('ExistingArray', existingArray);
      setArray(existingArray);
    }
  };

  return (
    <>
      {show ? (
        <div
          className={`search-results absolute overflow-y-scroll max-h-96 z-30 ${bgColor} border-2 border-${textColor} text-${textColor} rounded-b-3xl rounded-tr-3xl no-scrollbar w-96`}
        >
          {results.map((result: any, i: number) => (
            <div
              key={i}
              className={`flex ${hover} transition-colors duration-50 border-gray-300 items-center gap-4 relative select-none cursor-default`}
            >
              <Tooltip label='Add to Library'>
                <button
                  className={`absolute top-2 right-3 z-20 w-7 rounded-full border-black border-2 box-border text-black ${
                    array.some((item: any) => item.id === result.id)
                      ? 'bg-red-600'
                      : 'bg-green-600'
                  }`}
                  onClick={() => handleClickLocal(result)}
                >
                  {array.some((item: any) => item.id === result.id) ? '-' : '+'}
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
