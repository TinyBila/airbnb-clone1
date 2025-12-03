import { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt?: string;
  fallback?: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
}

export function ImageWithFallback({
  src,
  alt = '',
  fallback = 'https://via.placeholder.com/800x600?text=Image+Not+Found',
  className = '',
  width,
  height,
  style,
}: ImageWithFallbackProps) {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    // eslint-disable-next-line jsx-a11y/img-redundant-alt
    <img
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      style={style}
      className={className}
      onError={() => {
        if (imageSrc !== fallback) setImageSrc(fallback);
      }}
    />
  );
}
