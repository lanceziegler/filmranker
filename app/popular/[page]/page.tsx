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

  //! Need conditional check or else everything loads at once
  useEffect(() => {
    // Load movies on initial render
    if (movies.length === 0) {
      loadMoreMovies();
    }
  }, [loadMoreMovies, movies]);

  return (
    <div className='relative'>
      <Nav btnLink='/' text='Home' />
      <div className='main flex justify-center gap-2'>
        {movies.map((movie: any, i: number) => (
          <div key={i} className='movie flex flex-col'>
            <Tooltip label='Add to Library'>
              <button className='absolute top-2 right-3 z-20 bg-green-600 px-2 rounded-full border-black border-2 box-border text-black'>
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
              loading='lazy'
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
