import { Divider, Group } from '@mantine/core';

interface propTypes {
  id: number;
  row: string;
  bgColor: string;
  textColor: string;
}

const Row = ({ id, row, bgColor, textColor }: propTypes) => {
  return (
    <div
      className={`h-24 flex flex-col justify-center ${bgColor} ${textColor} hover:text-black`}
    >
      <div>
        <Group>
          <div className={`pl-4 font-montserrat text-xl font-semibold flex`}>
            {row.toUpperCase()}
          </div>
          <Divider orientation='vertical' size='md' />
        </Group>
      </div>
    </div>
  );
};

export default Row;
