import 'jest-preset-angular/setup-jest';

class IntersectionObserver {
  constructor(callback: any, options: any) {
    (globalThis as any).__intersectionObserverCallback = callback;
  }
  observe(target: any) {}
  unobserve(target: any) {}
  disconnect() {}
  root: any = null;
  rootMargin: any = '';
  thresholds: any = [];
  takeRecords() { return []; }
}
(globalThis as any).IntersectionObserver = IntersectionObserver;
