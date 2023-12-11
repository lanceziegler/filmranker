import { SimpleGrid, Divider } from '@mantine/core';
import Row from './Row';
import { v4 as uuidv4 } from 'uuid';
import { DndContext, closestCenter } from '@dnd-kit/core';

function TierList({activeId, activeTitle, activePoster, setActiveId, setHoveringRow}: any) {
  const rows: string[] = ['s', 'a', 'b', 'c', 'd', 'f'];
  const colors: string[] = [
    'bg-[#fe7f7e]',
    'bg-[#febf7e]',
    'bg-[#feff7f]',
    'bg-[#7fff7f]',
    'bg-[#7ffffe]',
    'bg-[#ff7ffe]',
  ];
  const bgColors: string[] = [
    'hover:bg-[#fe7f7e]',
    'hover:bg-[#febf7e]',
    'hover:bg-[#feff7f]',
    'hover:bg-[#7fff7f]',
    'hover:bg-[#7ffffe]',
    'hover:bg-[#ff7ffe]',
  ];
  const textColors: string[] = [
    'text-[#fe7f7e]',
    'text-[#febf7e]',
    'text-[#feff7f]',
    'text-[#7fff7f]',
    'text-[#7ffffe]',
    'text-[#ff7ffe]',
  ];

  // const handleDragOver = () => {
  //   console.log('dragging over tier list');
  // };

  return (
    <div className='mt-2 ml-4 rounded-3xl flex flex-col border-gray-200 border-2 w-full'>
      <h1 className='text-3xl p-5 font-montserrat font-semibold underline underline-offset-4 pb-2'>
        Tier List:
      </h1>
      <div>
        {rows.map((row, i) => {
          const uuid = uuidv4();
          return (
            <div key={uuid}>
              <Row
                id={uuid}
                row={row}
                bgColor={bgColors[i]}
                textColor={textColors[i]}
                color={colors[i]}
                activeId={activeId}
                activeTitle={activeTitle}
                activePoster={activePoster}
                setActiveId={setActiveId}
                setHoveringRow={setHoveringRow}
              />
              {i < rows.length - 1 ? <Divider size='lg' /> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TierList;
