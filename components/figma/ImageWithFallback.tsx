import { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt?: string;
  fallback?: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number | string;
  height?: number | string;
}

/* ...existing code... */
export function ImageWithFallback({
  src,
  alt = '',
  fallback = 'https://via.placeholder.com/800x600?text=Image+Not+Found',
  className = '',
  style,
  width,
  height,
}: ImageWithFallbackProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [loaded, setLoaded] = useState(false);

  return (
    // eslint-disable-next-line jsx-a11y/img-redundant-alt
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      style={style}
      width={width}
      height={height}
      onLoad={() => setLoaded(true)}
      onError={() => {
        if (imageSrc !== fallback) setImageSrc(fallback);
        setLoaded(true);
      }}
    />
  );
}
