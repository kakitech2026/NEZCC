'use client';

import { useState } from 'react';

export default function ActivityPhoto({
  filename,
  className = '',
}: {
  filename: string;
  className?: string;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const imagePath = `/images/activities/${encodeURIComponent(filename)}`;

  return (
    <div
      role="img"
      aria-label={imageLoaded ? `NEZCC photo: ${filename}` : `Photo placeholder. Add ${filename} at apps/web/public${imagePath}`}
      data-image-path={imagePath}
      className={`relative overflow-hidden rounded-xl ${className}`}
    >
      {(!imageLoaded || imageFailed) && (
        <div className="absolute inset-0 flex items-center justify-center border border-dashed border-primary/40 bg-gradient-to-br from-primary-container/20 via-surface to-secondary-container/20 text-primary">
          <div className="flex flex-col items-center gap-2 px-3 text-center">
            <span className="material-symbols-outlined text-4xl" aria-hidden="true">add_a_photo</span>
            <span className="font-label-md text-label-md">Add photo</span>
            <span className="font-mono text-xs text-on-surface-variant">{filename}</span>
          </div>
        </div>
      )}
      {!imageFailed && (
        <img
          src={imagePath}
          alt=""
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageFailed(true)}
        />
      )}
    </div>
  );
}
