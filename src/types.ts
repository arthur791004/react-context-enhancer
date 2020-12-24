import * as React from 'react';

export interface ContextProviderProps {
  value: any;
  children: React.ReactNode;
}

export type SelectorFn = (value: any) => any;
