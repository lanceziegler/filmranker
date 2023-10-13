import Nav from '@/components/Nav';
import Image from 'next/image';
import getMovies from '../libs/getMovies';

async function Popular() {
  const movies = await getMovies();
  console.log(movies);
  return (
    <>
      <Nav btnLink='/' text='Home' />
      <div className='min-h-screen flex items-center justify-center content-center'>
        {movies.results.map((movie: any, i: number) => (
          <div key={i}>
            {/** Fix Fallback Image */}
            {!movie.poster_path ? (
              <Image
                alt={movie.title}
                src={`/images/noImage.jpeg`}
                width={50}
                height={50}
                //   sizes='100vw'
                style={{ width: 'auto', height: 'auto' }}
                placeholder='empty'
                priority
              ></Image>
            ) : (
              <Image
                alt={movie.title}
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                width={50}
                height={50}
                //   sizes='100vw'
                style={{ width: 'auto', height: 'auto' }}
                placeholder='empty'
                priority
              ></Image>
            )}
            {/* <Image
              alt={movie.title}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              width={50}
              height={50}
              //   sizes='100vw'
              style={{ width: 'auto', height: 'auto' }}
              placeholder='empty'
              priority
            ></Image> */}
            {/* <div>{movie.poster_path}</div> */}
          </div>
        ))}
      </div>
    </>
  );
}

export default Popular;
