import { SimpleGrid, Divider } from '@mantine/core';
import Row from './Row';

function TierList() {
  const rows: string[] = ['S', 'A', 'B', 'C', 'D', 'F'];

  return (
    <div className='mt-24 rounded-3xl flex flex-col border-gray-200 border-2 min-w-full'>
      <h1 className='text-3xl p-5 font-montserrat font-semibold underline underline-offset-4 pb-2'>
        Tier List:
      </h1>
      <SimpleGrid cols={1} spacing='sm'>
        {rows.map((row, i) => {
          return (
            <div key={i}>
              <Row id={i} row={row} />
              {i < rows.length - 1 ? <Divider size='lg' /> : null}
            </div>
          );
        })}
      </SimpleGrid>
    </div>
  );
}

export default TierList;
