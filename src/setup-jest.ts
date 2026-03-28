import 'jest-preset-angular/setup-jest';

class MockIntersectionObserver {
  root = null;
  rootMargin = '';
  thresholds = [];

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    (globalThis as any).__intersectionObserverCallback = callback;
  }

  disconnect() {}
  observe(element: Element) {}
  takeRecords() { return []; }
  unobserve(element: Element) {}
}

globalThis.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
