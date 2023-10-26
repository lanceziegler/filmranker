import { Tooltip } from '@mantine/core';
import Image from 'next/image';

interface movieTypes {
  buttonSymbol: '+' | '-';
  buttonBg: string;
  movie: any;
}

const Movie = ({ buttonSymbol, buttonBg, movie }: movieTypes) => {
  const handleClickLocal = (movie: any) => {
    //@ts-ignore
    const existingArray = JSON.parse(localStorage.getItem('myArray1')) || []; //TODO Alter these localStorage arrays to start fresh
    const isItemInLocalStorage = existingArray.some(
      (item: any) => item.id === movie.id
    );
    const index = existingArray.findIndex((item: any) => item.id === movie.id);

    if (isItemInLocalStorage) {
      alert('Removed movie from local storage!');
      existingArray.splice(index, 1);
      localStorage.setItem('myArray1', JSON.stringify(existingArray)); //TODO)
    } else {
      existingArray.push(movie);
      localStorage.setItem('myArray1', JSON.stringify(existingArray)); //TODO
      console.log('ExistingArray', existingArray);
    }
  };

  return (
    <div className='movie flex flex-col hover:drop-shadow-glow hover:z-50 hover:scale-105 box-border transition-all'>
      <Tooltip label={buttonSymbol}>
        <button
          className={`absolute top-2 right-3 z-20 ${buttonBg} px-2 rounded-full border-black border-2 box-border text-black `}
          onClick={() => handleClickLocal(movie)}
        >
          {buttonSymbol}
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
  );
};

export default Movie;
