import 'jest-preset-angular/setup-jest';

(globalThis as any).IntersectionObserver = class {
  constructor(callback: any) {
    (globalThis as any).__intersectionObserverCallback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
  root = null;
  rootMargin = '';
  thresholds = [];
  takeRecords() {
    return [];
  }
} as unknown as typeof IntersectionObserver;
