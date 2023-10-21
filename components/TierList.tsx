import { SimpleGrid, Divider } from '@mantine/core';
import Row from './Row';
import { DndContext } from '@dnd-kit/core';

function TierList() {
  const rows = ['S', 'A', 'B', 'C', 'D', 'F'];

  return (
    <div className='m-10 flex flex-col border-white border-2 min-w-full'>
      <SimpleGrid cols={1} spacing='sm'>
        {rows.map((row, i) => {
          return <Row key={i} id={i} row={row} />;
        })}
      </SimpleGrid>
    </div>
  );
}

export default TierList;
