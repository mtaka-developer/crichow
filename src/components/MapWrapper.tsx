"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamic import of the KisumuMap component with SSR disabled
const KisumuMapDynamic = dynamic(
  () => import('./KisumuMap'),
  {
    ssr: false,
    loading: () => (
      <div className="h-80 rounded-lg flex items-center justify-center bg-gradient-to-br from-green-100 to-orange-100 border-2 border-dashed border-gray-300">
        <div className="text-center">
          <div className="text-4xl mb-4">🗺️</div>
          <p className="font-poppins text-gray-600">
            Loading Interactive Map...
          </p>
        </div>
      </div>
    )
  }
);

export default function MapWrapper() {
  return (
    <Suspense fallback={
      <div className="h-80 rounded-lg flex items-center justify-center bg-gradient-to-br from-green-100 to-orange-100 border-2 border-dashed border-gray-300">
        <div className="text-center">
          <div className="text-4xl mb-4">🗺️</div>
          <p className="font-poppins text-gray-600">
            Loading Interactive Map...
          </p>
        </div>
      </div>
    }>
      <KisumuMapDynamic />
    </Suspense>
  );
}