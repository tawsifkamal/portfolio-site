import { Injectable, computed, inject } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  private SMALL_SCREEN = '(max-width: 1023px)';
  private MEDIUM_SCREEN = '(min-width: 1024px) and (max-width: 1439px)';
  private LARGE_SCREEN = '(min-width: 1440px)';

  private breakpointObserver = inject(BreakpointObserver);

  private screenState = toSignal(
    this.breakpointObserver.observe([this.SMALL_SCREEN, this.MEDIUM_SCREEN, this.LARGE_SCREEN]),
    { initialValue: { matches: false, breakpoints: {} as Record<string, boolean> } }
  );

  isSmallSignal = computed(() => {
    const state = this.screenState();
    return state.breakpoints[this.SMALL_SCREEN] ?? this.breakpointObserver.isMatched(this.SMALL_SCREEN);
  });

  isMediumSignal = computed(() => {
    const state = this.screenState();
    return state.breakpoints[this.MEDIUM_SCREEN] ?? this.breakpointObserver.isMatched(this.MEDIUM_SCREEN);
  });

  isLargeSignal = computed(() => {
    const state = this.screenState();
    return state.breakpoints[this.LARGE_SCREEN] ?? this.breakpointObserver.isMatched(this.LARGE_SCREEN);
  });

  // Getters for template compatibility
  get isSmall() { return this.isSmallSignal(); }
  get isMedium() { return this.isMediumSignal(); }
  get isLarge() { return this.isLargeSignal(); }
}
