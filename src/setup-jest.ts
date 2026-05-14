import 'jest-preset-angular/setup-jest';

(globalThis as any).IntersectionObserver = class IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    (globalThis as any).__intersectionObserverCallback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] { return []; }
} as unknown as typeof IntersectionObserver;

HTMLElement.prototype.scrollIntoView = jest.fn();
