import 'jest-preset-angular/setup-jest';

(window as any).IntersectionObserver = class IntersectionObserver {
  constructor(private callback: any, private options: any) {}
  observe(element: any) {}
  unobserve(element: any) {}
  disconnect() {}
};
