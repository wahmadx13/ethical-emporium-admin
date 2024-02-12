'use client';
import React, { ReactNode, useEffect } from 'react';
import '../styles/App.css';
import '../styles/Contact.css';
import '../styles/MiniCalendar.css';
import { ChakraProvider } from '@chakra-ui/react';
import { CacheProvider } from '@chakra-ui/next-js';
import { useAppDispatch } from '../redux/hooks';
import { setUser, setJwtToken } from '../redux/features/authSlice';
import theme from '../theme/theme';

export default function AppWrappers({
  children,
  data,
  jwtToken,
}: {
  children: ReactNode;
  data: any;
  jwtToken: string;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setUser(data));
    dispatch(setJwtToken(jwtToken));
  }, [data, dispatch, jwtToken]);

  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>{' '}
    </CacheProvider>
  );
}
