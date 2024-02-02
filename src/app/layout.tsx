import React, { ReactNode } from 'react';
import AppWrappers from './AppWrappers';
import StoreProvider from 'components/StoreProvider';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body id={'root'}>
        <StoreProvider>
          <AppWrappers>{children}</AppWrappers>
        </StoreProvider>
      </body>
    </html>
  );
}
