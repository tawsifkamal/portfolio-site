import 'jest-preset-angular/setup-jest';

class MockIntersectionObserver {
  root = null;
  rootMargin = '';
  thresholds = [];

  constructor(public callback: any) {
    (globalThis as any).__intersectionObserverCallback = callback;
  }

  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
}

globalThis.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
