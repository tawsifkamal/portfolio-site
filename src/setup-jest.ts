import 'jest-preset-angular/setup-jest';

class MockIntersectionObserver {
  constructor(public callback: any) {
    (globalThis as any).__intersectionObserverCallback = callback;
  }
  root = null;
  rootMargin = '';
  thresholds = [];
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  takeRecords = jest.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver as unknown as typeof IntersectionObserver,
});
