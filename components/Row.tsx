'use client';
import { Divider } from '@mantine/core';
import { useDroppable } from '@dnd-kit/core';

interface propTypes {
  id: number;
  row: string;
}

const Row = ({ id, row }: propTypes) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });
  const style = {
    color: isOver ? 'green' : undefined,
    background: isOver ? 'red' : undefined,
  };

  return (
    <div ref={setNodeRef}>
      <div style={style}>{row}</div>
      <Divider size='lg' />
    </div>
  );
};

export default Row;
