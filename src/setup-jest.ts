import 'jest-preset-angular/setup-jest';

(globalThis as any).__intersectionObserverCallback = null;

class IntersectionObserverMock {
  root: any = null;
  rootMargin: string = '';
  thresholds: ReadonlyArray<number> = [];

  constructor(callback: any, options: any) {
    (globalThis as any).__intersectionObserverCallback = callback;
    if (options) {
      this.root = options.root || null;
      this.rootMargin = options.rootMargin || '';
      this.thresholds = options.threshold || [];
    }
  }

  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  takeRecords = jest.fn(() => []);
}

(globalThis as any).IntersectionObserver = IntersectionObserverMock as unknown as typeof IntersectionObserver;
