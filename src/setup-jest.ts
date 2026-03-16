import 'jest-preset-angular/setup-jest';

globalThis.IntersectionObserver = class {
  root: Element | Document | null = null;
  rootMargin: string = '';
  thresholds: ReadonlyArray<number> = [];
  constructor(public callback: IntersectionObserverCallback, public options?: IntersectionObserverInit) {
    if (options?.root) this.root = options.root;
    if (options?.rootMargin) this.rootMargin = options.rootMargin;
    if (options?.threshold) {
      if (Array.isArray(options.threshold)) {
         this.thresholds = options.threshold;
      } else {
         this.thresholds = [options.threshold];
      }
    }
  }
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] { return []; }
} as unknown as typeof IntersectionObserver;
