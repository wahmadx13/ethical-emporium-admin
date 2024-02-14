'use client';
import { ReactNode, useRef } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { AppStore, makeStore } from '../../redux/store';

export default function Providers({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <StoreProvider store={storeRef.current}>{children}</StoreProvider>;
}
