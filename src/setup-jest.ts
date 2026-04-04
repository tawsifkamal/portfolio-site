import 'jest-preset-angular/setup-jest';

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];

  constructor(public callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    (globalThis as any).__intersectionObserverCallback = callback;
    if (options && options.threshold) {
      this.thresholds = Array.isArray(options.threshold) ? options.threshold : [options.threshold];
    }
  }

  disconnect(): void {}
  observe(target: Element): void {}
  takeRecords(): IntersectionObserverEntry[] { return []; }
  unobserve(target: Element): void {}
}

(globalThis as any).IntersectionObserver = MockIntersectionObserver;
