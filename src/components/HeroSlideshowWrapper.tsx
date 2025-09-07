"use client";

import HeroBackgroundSlideshow from './HeroBackgroundSlideshow';

export default function HeroSlideshowWrapper() {
  return (
    <div className="absolute inset-0 z-0">
      <HeroBackgroundSlideshow />
    </div>
  );
}