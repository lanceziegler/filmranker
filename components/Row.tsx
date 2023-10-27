import { Divider, Group } from '@mantine/core';

interface propTypes {
  id: number;
  row: string;
}

const Row = ({ id, row }: propTypes) => {
  return (
    <div className='h-20 flex flex-col justify-center'>
      <div>
        <Group>
          <div className='pl-4 font-montserrat text-xl font-semibold'>
            {row}
          </div>
          <Divider orientation='vertical' size='md' />
        </Group>
      </div>
    </div>
  );
};

export default Row;
