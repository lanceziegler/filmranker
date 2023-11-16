import React from 'react';
import getMoviesPage from '@/app/libs/getMoviesPage';

const MoviesFetched = async () => {
  const { moviesFetch } = await getMoviesPage(1);

  return moviesFetch;
};

export default MoviesFetched;
