'use client';

import { type ReactNode, useId } from 'react';
import { cn } from '@/lib/cn';

export function Body({ children }: { children: ReactNode }): React.ReactElement {
  const mode = useMode();

  return <body className={cn(mode, 'relative flex min-h-screen flex-col')}>{children}</body>;
}

export function useMode(): string | undefined {
  return 'framework';
}


