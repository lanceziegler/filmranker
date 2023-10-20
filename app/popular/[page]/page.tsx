'use client';
import { useState, useEffect, useCallback } from 'react';
import { Waypoint } from 'react-waypoint';
import getMoviesPage from '@/app/libs/getMoviesPage';
import Image from 'next/image';
import Nav from '@/components/Nav';
import { IconLoaderQuarter } from '@tabler/icons-react';
import { Button, Tooltip } from '@mantine/core';
import { Suspense } from 'react';

//TODO: Initial page of popular loads twice
interface pageProps {
  params: { page: number };
}

function MoreMovies({ params: { page } }: pageProps) {
  const [currentPage, setCurrentPage] = useState(page);
  const [movies, setMovies] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [localList, setLocalList] = useState<any>([]);
  const [array, setArray] = useState<any>([]);
  const [buttonBg, setButtonBg] = useState('bg-green-600');

  const loadMoreMovies = useCallback(async () => {
    if (!isLoading) {
      setIsLoading(true);

      try {
        const nextPage = Number(currentPage) + 1;
        const newPageData = await getMoviesPage(nextPage);

        setCurrentPage(nextPage);
        setMovies((prevMovies: any) => [...prevMovies, ...newPageData.results]);
      } catch (error) {
        console.error('Error fetching more movies:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [isLoading, currentPage]);

  const handleEnter = useCallback(() => {
    if (movies.length > 20) loadMoreMovies();
  }, [loadMoreMovies, movies]);

  //* Need conditional check or else everything loads at once
  useEffect(() => {
    // Load movies on initial render
    if (movies.length === 0) {
      loadMoreMovies();
    }
  }, [loadMoreMovies, movies]);

  // useEffect(() => {
  //   console.log('localList: ', localList);
  // }, [localList]);

  // const handleClickLocal = (movie: any) => {
  //   // setLocalList((prevList: any) => [...prevList, movie]);

  useEffect(() => {
    //@ts-ignore
    const parsedArray = JSON.parse(localStorage.getItem('myArray1')) || [];
    setArray(parsedArray);
    console.log('THIS IS STATE: ', parsedArray);
  }, []);

  //   //@ts-ignore
  //   const existingArray = JSON.parse(localStorage.getItem('myArray')) || [];
  //   const newItem = movie; // Replace with the item you want to add
  //   existingArray.push(newItem);
  //   localStorage.setItem('myArray', JSON.stringify(existingArray));

  //   console.log('ExistingArray', existingArray);
  // };

  //* Checks if movie is already in localStorage and doesn't allow it to be added if so
  const handleClickLocal = (movie: any) => {
    //@ts-ignore
    const existingArray = JSON.parse(localStorage.getItem('myArray1')) || []; //TODO Alter this one
    const isItemInLocalStorage = existingArray.some(
      (item: any) => item.id === movie.id
    );

    if (isItemInLocalStorage) {
      console.error('Movie already in localStorage');
      alert('no');
    } else {
      existingArray.push(movie);
      localStorage.setItem('myArray1', JSON.stringify(existingArray)); //TODO AND Alter this one
      console.log('ExistingArray', existingArray);
    }
  };

  return (
    <div className='relative'>
      <Nav btnLink='/' text='Home' />
      <div className='main flex justify-center gap-2'>
        {movies.map((movie: any, i: number) => (
          <div key={i} className='movie flex flex-col'>
            <Tooltip label='Add to Library'>
              <button
                className={`absolute top-2 right-3 z-20 ${buttonBg} px-2 rounded-full border-black border-2 box-border text-black`}
                onClick={() => handleClickLocal(movie)}
              >
                +
              </button>
            </Tooltip>
            <Image
              alt={movie.title}
              src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
              width={0}
              height={0}
              sizes='100vw'
              style={{ width: '100%', height: 'auto' }}
            />
            <div className='movie-info flex text-center m-auto'>
              <h3 className='font-inter tracking-wider'>{movie.title}</h3>
              {/* <span className= {`vote ${this.props.imdbColor}`}>{this.props.vote}</span> */}
            </div>
            <div className='overview no-scrollbar'>
              <h3>Overview:</h3>
              {movie.overview}
            </div>
          </div>
        ))}
        <Waypoint onEnter={handleEnter} />
      </div>
    </div>
  );
}
export default MoreMovies;
