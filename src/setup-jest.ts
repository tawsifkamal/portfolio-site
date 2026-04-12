import 'jest-preset-angular/setup-jest';

class MockIntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];

  constructor(public callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    (globalThis as any).__intersectionObserverCallback = callback;
    if (options) {
      if (options.root) this.root = options.root as Element;
      if (options.rootMargin) this.rootMargin = options.rootMargin;
      if (options.threshold) {
        this.thresholds = Array.isArray(options.threshold) ? options.threshold : [options.threshold];
      }
    }
  }

  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  takeRecords = jest.fn().mockReturnValue([]);
}

Object.defineProperty(globalThis, 'IntersectionObserver', {
  value: MockIntersectionObserver,
  writable: true,
});
