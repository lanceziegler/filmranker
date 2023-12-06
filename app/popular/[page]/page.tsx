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
import { IconChevronUp, IconLoader } from '@tabler/icons-react';
import { Skeleton } from '@mantine/core';

//! When Overview takes up entire container, text becomes blurry... something to do with
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
  const [imageLoaded, setImageLoaded] = useState(false);
  const handleScrollTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
  const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str);

  const arbitraryArray = new Array(20).fill(null);

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

  //! Initial movies ************************
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

  const handleClickLocal = (movie: any) => {
    //* Get WatchList from localStorage and check if movie is in it
    const localStorageWatchList = localStorage.getItem('localStorageWatchList');
    const existingWatchListArray = localStorageWatchList
      ? JSON.parse(localStorageWatchList)
      : [];
    const isItemInWatchListLocalStorage = existingWatchListArray.some(
      (item: any) => item.id === movie.id
    );
    const watchListIndex = existingWatchListArray.findIndex(
      (item: any) => item.id === movie.id
    );

    //* Get TierList from localStorage and check if movie is in it
    const localStorageTierList = localStorage.getItem('localStorageTierList');
    const existingTierList = localStorageTierList
      ? JSON.parse(localStorageTierList)
      : [];
    const isItemInTierListLocalStorage = Object.values(existingTierList).some(
      (array: any) => array.includes(movie)
    );
    //create empty array to store array within TierListObject that contains the movie
    let tempTierListArray;
    // Get the index of
    const tierListIndex = Object.values(existingTierList).map((array: any) => {
      if (array.includes(movie)) {
        tempTierListArray = array;
        array.findIndex((item: any) => item.id === movie.id);
      }
    });

    if (isItemInWatchListLocalStorage) {
      //* Remove movie if in WatchList in local storage already
      existingWatchListArray.splice(watchListIndex, 1);
      localStorage.setItem(
        //!------------------- HERE ------------------------
        'localStorageWatchList',
        JSON.stringify(existingWatchListArray)
      );
      setWatchListArray(existingWatchListArray);
    } else {
      existingWatchListArray.push(movie);
      localStorage.setItem(
        'localStorageWatchList',
        JSON.stringify(existingWatchListArray)
      );
      console.log('existingWatchListArray: ', existingWatchListArray);
      setWatchListArray(existingWatchListArray);
    }

    if (isItemInTierListLocalStorage) {
      //@ts-ignore --- TIER LIST ARRAY POSSIBLY UNDEFINED
      tempTierListArray.splice(tierListIndex, 1);
      //TODO setTierListObject()
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
        {!imageLoaded && (
          <div className='flex flex-wrap content-center justify-center items-center gap-4'>
            {arbitraryArray.map((_, index) => {
              return (
                <div key={index}>
                  <Skeleton height={410} width='228px' radius={10} />
                </div>
              );
            })}
          </div>
        )}

        {movies.map((movie: any, i: number) => (
          <div
            key={i}
            className='movie flex flex-col hover:drop-shadow-glow hover:z-50 hover:scale-105 box-border transition-all fadeIn'
          >
            <Tooltip
              label={`${
                watchListArray.some((item: any) => item.id === movie.id)
                  ? 'Remove from Library'
                  : 'Add to Library'
              }`}
            >
              <button
                className={`absolute top-2 right-3 z-20 w-7 rounded-full border-black border-2 box-border text-black ${
                  watchListArray.some((item: any) => item.id === movie.id)
                    ? 'bg-red-600'
                    : 'bg-green-600'
                }`}
                onClick={() => handleClickLocal(movie)}
              >
                {watchListArray.some((item: any) => item.id === movie.id)
                  ? '-'
                  : '+'}
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
              priority
              placeholder='empty'
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(700, 475)
              )}`}
              onLoad={() => setImageLoaded(true)}
              // className='fadeIn'
            />
            <div className='m-auto'>
              <h3 className='font-inter tracking-wider titleText flex content-center items-center text-center'>
                {movie.title}
              </h3>
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
