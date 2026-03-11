import 'jest-preset-angular/setup-jest';

globalThis.IntersectionObserver = class IntersectionObserver {
  root: any = null;
  rootMargin: string = '';
  thresholds: ReadonlyArray<number> = [];
  constructor(public callback: any, public options: any) {}
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
};
