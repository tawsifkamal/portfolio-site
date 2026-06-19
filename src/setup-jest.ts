import 'jest-preset-angular/setup-jest';

const mockIntersectionObserver = class {
  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    (globalThis as any).__intersectionObserverCallback = callback;
  }
  root: Element | Document | null = null;
  rootMargin: string = '';
  thresholds: ReadonlyArray<number> = [];
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  takeRecords = jest.fn();
} as unknown as typeof IntersectionObserver;

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: mockIntersectionObserver,
});

Object.defineProperty(globalThis, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: mockIntersectionObserver,
});
