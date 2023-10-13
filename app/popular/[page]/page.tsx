import getMoviesPage from '@/app/libs/getMoviesPage';
import Image from 'next/image';
import Nav from '@/components/Nav';

interface pageProps {
  page: number;
}

async function MoreMovies({ params: { page } }: any) {
  const pageData = await getMoviesPage(page);
  // const data = await Promise.all(pageData.results);
  //!Look into preloading data

  return (
    <>
      <Nav btnLink='/' text='Home' />
      <div className='main'>
        {pageData.results.map((movie: any, i: number) => (
          <div key={i} className='movie'>
            <Image
              alt={movie.title}
              src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`}
              width={50}
              height={50}
              //   sizes='100vw'
              style={{ width: 'auto', height: 'auto' }}
              placeholder='empty'
              priority
            />
            <div className='movie-info'>
              <h3>{movie.title}</h3>
              {/* <span className= {`vote ${this.props.imdbColor}`}>{this.props.vote}</span> */}
            </div>
            <div className='overview'>
              <h3>Overview:</h3>
              {movie.overview}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default MoreMovies;
