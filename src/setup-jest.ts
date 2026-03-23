import 'jest-preset-angular/setup-jest';

globalThis.IntersectionObserver = class {
  root: Element | null = null;
  rootMargin: string = '0px';
  thresholds: ReadonlyArray<number> = [];
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  constructor(public callback: IntersectionObserverCallback, public options?: IntersectionObserverInit) {
    (globalThis as any).__intersectionObserverCallback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
} as unknown as typeof IntersectionObserver;
