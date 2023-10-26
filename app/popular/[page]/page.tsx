'use client';
import { useState, useEffect, useCallback } from 'react';
import { Waypoint } from 'react-waypoint';
import getMoviesPage from '@/app/libs/getMoviesPage';
import Image from 'next/image';
import Nav from '@/components/Nav';
import { IconLoaderQuarter } from '@tabler/icons-react';
import { Button, Tooltip } from '@mantine/core';
import { Suspense } from 'react';

interface pageProps {
  params: { page: number };
}

function MoreMovies({ params: { page } }: pageProps) {
  const [currentPage, setCurrentPage] = useState(page);
  const [movies, setMovies] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
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
    // if (movies.length < 20) loadMoreMovies();
    loadMoreMovies();
  }, [loadMoreMovies]); //movies

  //* Need conditional check or else everything loads at once
  useEffect(() => {
    // Load movies on initial render
    const loadInitialMovies = async () => {
      try {
        const pageData = await getMoviesPage(1);

        setMovies(pageData.results);
      } catch (error) {
        console.error('Error fetching initial movies:', error);
      }
    };

    // loadMoreMovies();
    loadInitialMovies();
  }, []);

  useEffect(() => {
    //@ts-ignore
    const parsedArray = JSON.parse(localStorage.getItem('myArray1')) || [];
    setArray(parsedArray);
    console.log('THIS IS STATE: ', parsedArray);
  }, []);

  //* Checks if movie is already in localStorage and doesn't allow it to be added if so
  const handleClickLocal = (movie: any) => {
    //@ts-ignore
    const existingArray = JSON.parse(localStorage.getItem('myArray1')) || []; //TODO Alter these localStorage arrays to start fresh
    const isItemInLocalStorage = existingArray.some(
      (item: any) => item.id === movie.id
    );
    const index = existingArray.findIndex((item: any) => item.id === movie.id);

    if (isItemInLocalStorage) {
      alert('Removed movie from local storage!');
      existingArray.splice(index, 1);
      localStorage.setItem('myArray1', JSON.stringify(existingArray)); //TODO)
    } else {
      existingArray.push(movie);
      localStorage.setItem('myArray1', JSON.stringify(existingArray)); //TODO
      console.log('ExistingArray', existingArray);
    }
  };
  //! HANDLE NO IMAGE
  return (
    <div className='relative'>
      <Nav btnLink='/' text='Home' />
      <div className='main flex justify-center gap-2'>
        {movies.map((movie: any, i: number) => (
          <div
            key={i}
            className='movie flex flex-col hover:drop-shadow-glow hover:z-50 hover:scale-105 box-border transition-all'
          >
            <Tooltip
              label={`${
                array.some((item: any) => item.id === movie.id)
                  ? 'Remove movie from library'
                  : 'Add movie to library'
              }`}
            >
              <button
                className={`absolute top-2 right-3 z-20 ${buttonBg} px-2 rounded-full border-black border-2 box-border text-black ${
                  array.some((item: any) => item.id === movie.id)
                    ? 'bg-red-600'
                    : 'bg-green-600'
                }`}
                onClick={() => handleClickLocal(movie)}
              >
                {array.some((item: any) => item.id === movie.id) ? '-' : '+'}
              </button>
            </Tooltip>
            <Image
              alt={movie.title}
              src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
              width={0}
              height={0}
              sizes='100vw'
              style={{
                width: '100%',
                height: 'auto',
                boxSizing: 'border-box',
              }}
              placeholder='blur'
              blurDataURL='./images/noImage.jpeg'
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
