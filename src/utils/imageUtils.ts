export interface OptimizedImageConfig {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'png' | 'avif';
  loading?: 'lazy' | 'eager';
  sizes?: string;
  class?: string;
}

/**
 * Generate srcset for responsive images
 */
export function generateSrcSet(src: string, widths: number[] = [320, 640, 1024, 1280, 1920]): string {
  return widths
    .map(width => `${src}?width=${width} ${width}w`)
    .join(', ');
}

/**
 * Generate sizes attribute for responsive images
 */
export function generateSizes(breakpoints?: { [key: string]: string }): string {
  const defaultSizes = {
    '(max-width: 640px)': '100vw',
    '(max-width: 1024px)': '50vw',
    '(max-width: 1280px)': '33vw',
    'default': '25vw'
  };

  const sizes = breakpoints || defaultSizes;

  return Object.entries(sizes)
    .map(([condition, size]) =>
      condition === 'default' ? size : `${condition} ${size}`
    )
    .join(', ');
}

/**
 * Get optimized image URL with query parameters
 */
export function getOptimizedImageUrl(
  src: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: string;
  } = {}
): string {
  const params = new URLSearchParams();

  if (options.width) params.set('width', options.width.toString());
  if (options.height) params.set('height', options.height.toString());
  if (options.quality) params.set('quality', options.quality.toString());
  if (options.format) params.set('format', options.format);

  const queryString = params.toString();
  return queryString ? `${src}?${queryString}` : src;
}

/**
 * Preload critical images
 */
export function preloadImage(src: string, as: 'image' = 'image'): HTMLLinkElement {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = src;
  link.as = as;

  return link;
}

/**
 * Lazy loading intersection observer setup
 */
export class LazyImageLoader {
  private observer: IntersectionObserver;

  constructor(options: IntersectionObserverInit = {}) {
    const defaultOptions = {
      root: null,
      rootMargin: '50px',
      threshold: 0.1
    };

    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      { ...defaultOptions, ...options }
    );
  }

  private handleIntersection(entries: IntersectionObserverEntry[]) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.dataset.src;
        const srcset = img.dataset.srcset;

        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
        }

        if (srcset) {
          img.srcset = srcset;
          img.removeAttribute('data-srcset');
        }

        img.classList.remove('lazy-loading');
        img.classList.add('lazy-loaded');

        this.observer.unobserve(img);
      }
    });
  }

  observe(element: Element) {
    this.observer.observe(element);
  }

  unobserve(element: Element) {
    this.observer.unobserve(element);
  }

  disconnect() {
    this.observer.disconnect();
  }
}

/**
 * Image placeholder generator (base64 encoded blur)
 */
export function generatePlaceholder(width: number = 40, height: number = 30): string {
  // Simple SVG placeholder with blur effect
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="blur">
          <feGaussianBlur stdDeviation="2"/>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <rect x="25%" y="25%" width="50%" height="25%" fill="#e5e7eb" filter="url(#blur)"/>
      <rect x="10%" y="60%" width="80%" height="10%" fill="#e5e7eb" filter="url(#blur)"/>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
}