import { Divider, Group } from '@mantine/core';

interface propTypes {
  id: number;
  row: string;
}

const Row = ({ id, row }: propTypes) => {
  return (
    <div className='h-20 flex flex-col justify-center hover:bg-red-500'>
      <div>
        <Group>
          <div className='pl-4 font-montserrat text-xl font-semibold flex'>
            {row.toUpperCase()}
          </div>
          <Divider orientation='vertical' size='md' />
        </Group>
      </div>
    </div>
  );
};

export default Row;
