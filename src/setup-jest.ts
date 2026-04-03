import 'jest-preset-angular/setup-jest';

(globalThis as any).IntersectionObserver = class IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    (globalThis as any).__intersectionObserverCallback = callback;
  }

  disconnect() {}
  observe(target: Element) {}
  unobserve(target: Element) {}
  takeRecords(): IntersectionObserverEntry[] { return []; }
} as unknown as typeof IntersectionObserver;
