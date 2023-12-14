import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import LocalMovie from './LocalMovie';
import { memo } from 'react';

//! Need to create props for LocalMovie
const SortableItem = memo((props: any) => {
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: props.id,
    data: {
      row: props.row,
      source: props.source,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
  };

  const additionalData = {
    title: props.title,
    poster: props.poster,
  };

  return (
    <LocalMovie
      id={props.id}
      ref={setNodeRef}
      style={style}
      withOpacity={isDragging}
      {...props}
      {...attributes}
      {...listeners}
      data={additionalData}
    />
  );
});

SortableItem.displayName = 'SortableItem';

export default SortableItem;
