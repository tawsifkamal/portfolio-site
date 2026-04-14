import 'jest-preset-angular/setup-jest';

(globalThis as any).IntersectionObserver = class IntersectionObserver {
  root: any;
  rootMargin: any;
  thresholds: any;

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    (globalThis as any).__intersectionObserverCallback = callback;
    this.root = options?.root ?? null;
    this.rootMargin = options?.rootMargin ?? '';
    this.thresholds = Array.isArray(options?.threshold) ? options?.threshold : [options?.threshold ?? 0];
  }

  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
} as unknown as typeof IntersectionObserver;
