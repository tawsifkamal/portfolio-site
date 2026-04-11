import 'jest-preset-angular/setup-jest';

const mockIntersectionObserver = class {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];

  constructor(public callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {}

  observe(target: Element): void {}
  unobserve(target: Element): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
};

(globalThis as any).IntersectionObserver = mockIntersectionObserver;
(globalThis as any).__intersectionObserverCallback = (callback: IntersectionObserverCallback) => {
    // This allows capturing the callback to simulate intersection events if needed
};
