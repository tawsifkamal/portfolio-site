import 'jest-preset-angular/setup-jest';

class IntersectionObserverMock {
  constructor(public callback: any, public options: any) {
    (globalThis as any).__intersectionObserverCallback = callback;
  }
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  takeRecords = jest.fn();
  root = null;
  rootMargin = '';
  thresholds = [];
}

globalThis.IntersectionObserver = IntersectionObserverMock as unknown as typeof IntersectionObserver;
