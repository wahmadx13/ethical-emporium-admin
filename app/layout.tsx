import React, { ReactNode } from 'react';
import AppWrappers from './AppWrappers';
import Providers from '../components/Providers';
import { verifyRequest } from '../utils/verifyRequest';
import { amplifyInit } from '../utils/amplifyInit';

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  amplifyInit();
  const { data, jwtToken }: any = await verifyRequest();
  return (
    <html lang="en">
      <body id={'root'}>
        <Providers>
          <AppWrappers data={data} jwtToken={jwtToken}>
            {children}
          </AppWrappers>
        </Providers>
      </body>
    </html>
  );
}
