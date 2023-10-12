import Nav from '@/components/Nav';
import Image from 'next/image';

const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=1`;

async function getData() {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function RecentlyReleased() {
  const movies = await getData();
  console.log(movies);
  return (
    <>
      <Nav btnLink='/' text='Home' />
      <div className='min-h-screen flex items-center justify-center content-center'>
        {movies.results.map((movie: any, i: number) => (
          <div key={i}>
            <Image
              alt={movie.title}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              width={50}
              height={50}
            //   sizes='100vw'
              style={{ width: 'auto', height: 'auto' }}
              placeholder='empty'
              priority
            ></Image>
            {/* <div>{movie.poster_path}</div> */}
          </div>
        ))}
      </div>
    </>
  );
}

export default RecentlyReleased;
