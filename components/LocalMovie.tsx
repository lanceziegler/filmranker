import { Tooltip } from '@mantine/core';
import Image from 'next/image';

interface propTypes {
  title: string;
  poster: string;
  id: string;
}

const LocalMovie = ({ title, poster, id }: propTypes) => {
  function handleOnDrag(e: React.DragEvent, title: string) {
    e.dataTransfer.setData('title', title);
  }

  return (
    <div draggable onDragStart={(e) => handleOnDrag(e, id)}>
      <Tooltip label={title}>
        {poster !== null ? (
          <Image
            alt={title}
            src={`https://image.tmdb.org/t/p/w154${poster}`}
            width={50}
            height={50}
            //   sizes='100vw'
            loading='lazy'
            className='p-1 hover:scale-105 transition-transform w-auto h-auto'
          />
        ) : (
          <Image
            alt={title}
            src='/noImage.jpeg'
            width={50}
            height={50}
            //   sizes='100vw'
            style={{ width: 'auto', height: 'auto' }}
          />
        )}
      </Tooltip>
    </div>
  );
};

export default LocalMovie;
