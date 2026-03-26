import 'jest-preset-angular/setup-jest';

const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
  root: null,
  rootMargin: '',
  thresholds: [],
  takeRecords: () => []
});

(globalThis as any).IntersectionObserver = mockIntersectionObserver;
