import 'jest-preset-angular/setup-jest';

(globalThis as any).IntersectionObserver = class IntersectionObserver {
  root = null;
  rootMargin = '';
  thresholds = [];

  constructor(private callback: (entries: any[], observer: any) => void, options?: any) {
    if (options) {
      this.root = options.root || null;
      this.rootMargin = options.rootMargin || '';
      this.thresholds = options.threshold || [];
    }
    (globalThis as any).__intersectionObserverCallback = callback;
  }

  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
} as unknown as typeof IntersectionObserver;
