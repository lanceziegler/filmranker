import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from '../theme';
import './globals.css';
import Nav from '@/components/Nav';
import MoviesProvider from './libs/MoviesProvider';

export const metadata = {
  title: 'FilmRanker',
  description: 'Your movies, your ranking',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang='en' className='scroll-smooth'>
      <head>
        <ColorSchemeScript />
        <link rel='shortcut icon' href='./favicon.ico' />
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no'
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <MoviesProvider>{children}</MoviesProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
