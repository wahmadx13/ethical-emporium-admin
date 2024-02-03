import React, { ReactNode } from 'react';
import AppWrappers from './AppWrappers';
import Providers from '../components/Providers';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body id={'root'}>
        <Providers>
          <AppWrappers>{children}</AppWrappers>
        </Providers>
      </body>
    </html>
  );
}
