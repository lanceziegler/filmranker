import ColorSchemeToggle from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Title } from '@mantine/core';

export default function HomePage() {
  return (
    <main>
      <div className='min-h-screen flex items-center justify-center flex-col'>
        <Title order={5}>Hi</Title>
        <ColorSchemeToggle />
      </div>
    </main>
  );
}
