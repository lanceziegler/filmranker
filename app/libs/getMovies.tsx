const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=1`;

async function getMovies() {
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) throw new Error('unable to fetch movies');

  return data;
}

export default getMovies;
