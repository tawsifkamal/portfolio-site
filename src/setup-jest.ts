import 'jest-preset-angular/setup-jest';

const mockIntersectionObserver = jest.fn((callback) => {
  (globalThis as any).__intersectionObserverCallback = callback;
  return {
    root: null,
    rootMargin: '0px',
    thresholds: [],
    takeRecords: () => [],
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  } as unknown as IntersectionObserver;
});

(globalThis as any).IntersectionObserver = mockIntersectionObserver;
