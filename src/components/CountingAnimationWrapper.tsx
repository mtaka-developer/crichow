"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

interface CountingAnimationWrapperProps {
  from: number;
  to: number;
  duration?: number;
  className?: string;
  triggerOnView?: boolean;
}

// Dynamic import of the CountingAnimation with SSR disabled
const CountingAnimationDynamic = dynamic(
  () => import('./CountingAnimation'),
  {
    ssr: false,
    loading: () => (
      <span className="opacity-50">0</span>
    )
  }
);

export default function CountingAnimationWrapper(props: CountingAnimationWrapperProps) {
  return (
    <Suspense fallback={<span className="opacity-50">{props.from}</span>}>
      <CountingAnimationDynamic {...props} />
    </Suspense>
  );
}