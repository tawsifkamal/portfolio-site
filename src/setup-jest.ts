import 'jest-preset-angular/setup-jest';

class MockIntersectionObserver {
  root: Element | Document | null = null;
  rootMargin: string = '';
  thresholds: ReadonlyArray<number> = [];

  constructor(public callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    (globalThis as any).__intersectionObserverCallback = callback;
    if (options) {
      if (options.root) this.root = options.root;
      if (options.rootMargin) this.rootMargin = options.rootMargin;
      if (options.threshold) {
        this.thresholds = Array.isArray(options.threshold) ? options.threshold : [options.threshold];
      }
    }
  }

  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  takeRecords = jest.fn(() => []);
}

globalThis.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
