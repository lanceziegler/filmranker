async function getProviders(movie_id: number) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}/watch/providers`
  );
  //   const response = await fetch(
  //     `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&sort_by=release_date.desc&page=${page}`
  //   );

  const data = await response.json();

  if (!response.ok) throw new Error('failed to fetch page');

  return data;
}

export default getProviders;
