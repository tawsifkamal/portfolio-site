import 'jest-preset-angular/setup-jest';

globalThis.IntersectionObserver = class IntersectionObserver {
  constructor(public callback: any, public options: any) {}
  observe() {}
  unobserve() {}
  disconnect() {}
} as any;
