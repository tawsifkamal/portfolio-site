import 'jest-preset-angular/setup-jest';

const mockIntersectionObserver = jest.fn((callback) => {
  (globalThis as any).__intersectionObserverCallback = callback;
  return {
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
    root: null,
    rootMargin: '',
    thresholds: [],
    takeRecords: () => [],
  };
}) as unknown as typeof IntersectionObserver;

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: mockIntersectionObserver,
});
