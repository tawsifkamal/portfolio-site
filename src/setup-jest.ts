import 'jest-preset-angular/setup-jest';

if (typeof jest !== 'undefined') {
  (globalThis as any).IntersectionObserver = class IntersectionObserver {
    root: any = null;
    rootMargin: string = '';
    thresholds: ReadonlyArray<number> = [];
    constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
      (globalThis as any).__intersectionObserverCallback = callback;
    }
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() { return []; }
  };

  HTMLElement.prototype.scrollIntoView = jest.fn();
}
