import 'jest-preset-angular/setup-jest';

class MockIntersectionObserver {
  root: Element | null = null;
  rootMargin: string = '';
  thresholds: ReadonlyArray<number> = [];

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    (globalThis as any).__intersectionObserverCallback = callback;
    if (options) {
      if (options.root instanceof Element) {
        this.root = options.root;
      }
      if (options.rootMargin) {
        this.rootMargin = options.rootMargin;
      }
      if (options.threshold !== undefined) {
        if (Array.isArray(options.threshold)) {
          this.thresholds = options.threshold;
        } else {
          this.thresholds = [options.threshold];
        }
      }
    }
  }

  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] { return []; }
}

(globalThis as any).IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
