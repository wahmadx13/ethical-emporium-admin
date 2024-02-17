import React, { ReactNode } from 'react';
import AppWrappers from './AppWrappers';
import Providers from '../components/Providers';
import { CognitoIdTokenPayload } from 'aws-jwt-verify/jwt-model';
import { headers } from 'next/headers';

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const requestHeaders = await headers();

  const data: CognitoIdTokenPayload = JSON.parse(
    requestHeaders.get('USER-DATA'),
  );

  const jwtToken: string = requestHeaders.get('JWT-TOKEN');

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
