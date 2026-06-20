import 'jest-preset-angular/setup-jest';

(globalThis as any).IntersectionObserver = class {
  constructor(public callback: IntersectionObserverCallback) {
    (globalThis as any).__intersectionObserverCallback = callback;
  }
  root = null;
  rootMargin = '';
  thresholds = [];
  disconnect = jest.fn();
  observe = jest.fn();
  takeRecords = jest.fn();
  unobserve = jest.fn();
} as unknown as typeof IntersectionObserver;
