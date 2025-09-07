"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamic import of the HeroBackgroundSlideshow with SSR disabled
const HeroBackgroundSlideshowDynamic = dynamic(
  () => import('./HeroBackgroundSlideshow'),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-orange-50 to-green-100">
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
      </div>
    )
  }
);

export default function HeroSlideshowWrapper() {
  return (
    <Suspense fallback={
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-orange-50 to-green-100">
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
      </div>
    }>
      <HeroBackgroundSlideshowDynamic />
    </Suspense>
  );
}