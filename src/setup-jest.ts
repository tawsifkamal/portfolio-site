import 'jest-preset-angular/setup-jest';

class MockIntersectionObserver {
  constructor(callback: any) {
    (globalThis as any).__intersectionObserverCallback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
  root: any = null;
  rootMargin: string = '';
  thresholds: ReadonlyArray<number> = [];
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver as unknown as typeof IntersectionObserver,
});
