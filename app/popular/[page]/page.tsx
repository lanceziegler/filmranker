'use client';
import { useState, useEffect, useCallback } from 'react';
import { Waypoint } from 'react-waypoint';
import getMoviesPage from '@/app/libs/getMoviesPage';
import Image from 'next/image';
import Nav from '@/components/Nav';
import { IconLoaderQuarter } from '@tabler/icons-react';

interface pageProps {
  page: number;
}

function MoreMovies({ params: { page } }: any) {
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

  // useEffect(() => {
  //   loadMoreMovies();
  // }, [loadMoreMovies]);

  const handleEnter = useCallback(() => {
    loadMoreMovies();
  }, [loadMoreMovies]);

  useEffect(() => {
    // Load movies on initial render
    if (movies.length === 0) {
      loadMoreMovies();
    }
  }, [loadMoreMovies, movies]);

  return (
    <div className='relative'>
      <Nav btnLink='/' text='Home' />
      <div className='main flex fadeIn justify-center gap-2'>
        {movies.map((movie: any, i: number) => (
          <div key={i} className='movie flex flex-col'>
            <Image
              alt={movie.title}
              src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
              width={0}
              height={0}
              sizes='100vw'
              style={{ width: '100%', height: 'auto' }}
              loading='lazy'
            />
            <div className='movie-info flex items-center justify-center content-center text-center'>
              <h3>{movie.title}</h3>
              {/* <span className= {`vote ${this.props.imdbColor}`}>{this.props.vote}</span> */}
            </div>
            <div className='overview'>
              <h3>Overview:</h3>
              {movie.overview}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className='absolute top-0 right-0'>
            <IconLoaderQuarter className='animate-spin' />
          </div>
        )}
        <Waypoint onEnter={handleEnter} />
      </div>
    </div>
  );
}
export default MoreMovies;
