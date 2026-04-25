import 'jest-preset-angular/setup-jest';

if (typeof jest !== 'undefined') {
  (globalThis as any).HTMLElement.prototype.scrollIntoView = jest.fn();
  (globalThis as any).IntersectionObserver = class IntersectionObserver {
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
  } as unknown as typeof IntersectionObserver;
}
