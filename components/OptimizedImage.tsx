// components/OptimizedImage.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fallbackSrc?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width = 800,
  height = 600,
  className = '',
  priority = false,
  fallbackSrc = '/images/placeholder.jpg',
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);
  const [isLoading, setIsLoading] = useState(true);

  // Якщо src - це data URL або вже закешоване зображення
  const isDataUrl = imgSrc?.startsWith('data:');

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isDataUrl ? (
        <Image
          src={imgSrc}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className={`
            duration-700 ease-in-out
            ${isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0'}
          `}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setImgSrc(fallbackSrc);
            setIsLoading(false);
          }}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imgSrc}
          alt={alt}
          className="w-full h-full object-cover"
          onLoad={() => setIsLoading(false)}
        />
      )}
    </div>
  );
}