'use client';
import { useState, useEffect, useCallback } from 'react';
import { Waypoint } from 'react-waypoint';
import getMoviesPage from '@/app/libs/getMoviesPage';
import Image from 'next/image';
import Nav from '@/components/Nav';
import { IconLoaderQuarter } from '@tabler/icons-react';
import { Button, Tooltip } from '@mantine/core';
import { useContext } from 'react';
import { SavedMoviesContext } from '@/app/libs/MoviesProvider';
import { IconChevronUp } from '@tabler/icons-react';

interface pageProps {
  params: { page: number };
}

function MoreMovies({ params: { page } }: pageProps) {
  const [currentPage, setCurrentPage] = useState(page);
  const [movies, setMovies] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [array, setArray] = useState<any>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const {
    array,
    setArray,
    watchListArray,
    setWatchListArray,
    tierListObject,
    setTierListObject,
  } = useContext(SavedMoviesContext)!;

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

  // useEffect(() => {
  //   //@ts-ignore
  //   const parsedArray = JSON.parse(localStorage.getItem('myArray1')) || [];
  //   setArray(parsedArray);
  //   console.log('THIS IS STATE: ', parsedArray);
  //   //! Added setArray dependency
  // }, [setArray]);

  //TODO Turn into importable function
  //* Checks if movie is already in localStorage and doesn't allow it to be added if so
  const handleClickLocal = (movie: any) => {
    //@ts-ignore
    const existingArray = JSON.parse(localStorage.getItem('myArray2')) || []; //TODO Alter these localStorage arrays to start fresh
    const isItemInLocalStorage = existingArray.some(
      (item: any) => item.id === movie.id
    );
    const index = existingArray.findIndex((item: any) => item.id === movie.id);

    if (isItemInLocalStorage) {
      // Remove movie from local storage if it exists
      existingArray.splice(index, 1);
      localStorage.setItem('myArray2', JSON.stringify(existingArray)); //TODO)
      setArray(existingArray);
    } else {
      // add item to local storage if not already in
      existingArray.push(movie);
      localStorage.setItem('myArray2', JSON.stringify(existingArray)); //TODO
      console.log('ExistingArray', existingArray);
      setArray(existingArray);
    }
  };

  const handleScroll = () => {
    const threshold = 4000;

    if (window.scrollY >= threshold) {
      setOpacity(1);
      setShowScrollTop(true);
    } else {
      setOpacity(0);
      setShowScrollTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <div>
      <Nav btnLink='/' text='Home' />
      <div className='main flex justify-center gap-2' onScroll={handleScroll}>
        {showScrollTop ? (
          <Tooltip label='Scroll to Top'>
            <button
              className={`fixed bottom-10 right-0 w-12 bg-[#228be6] py-2 hover:bg-blue-800 rounded-l-lg z-60 hover:border-2 hover:border-white transition-opacity duration-1000 flex justify-center ${opacity}`}
              onClick={handleScrollTop}
            >
              <IconChevronUp color='white' />
            </button>
          </Tooltip>
        ) : null}

        {movies.map((movie: any, i: number) => (
          <div
            key={i}
            className='movie flex flex-col hover:drop-shadow-glow hover:z-50 hover:scale-105 box-border transition-all'
          >
            <Tooltip
              label={`${
                array.some((item: any) => item.id === movie.id)
                  ? 'Remove from Library'
                  : 'Add to Library'
              }`}
            >
              <button
                className={`absolute top-2 right-3 z-20 w-7 rounded-full border-black border-2 box-border text-black ${
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
