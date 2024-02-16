'use client';
import React, { ReactNode, useEffect } from 'react';
import '../styles/App.css';
import '../styles/Contact.css';
import '../styles/MiniCalendar.css';
import { ChakraProvider } from '@chakra-ui/react';
import { CacheProvider } from '@chakra-ui/next-js';
import theme from '../theme/theme';
import { amplifyInit } from '../utils/amplifyInit';

export default function AppWrappers({ children }: { children: ReactNode }) {
  amplifyInit();
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>{' '}
    </CacheProvider>
  );
}
