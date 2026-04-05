import { Injectable, computed, Signal } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  private SMALL_SCREEN = '(max-width: 1023px)';
  private MEDIUM_SCREEN = '(min-width: 1024px) and (max-width: 1439px)';
  private LARGE_SCREEN = '(min-width: 1440px)';

  private breakpointSignal: Signal<any>;

  public isSmall: Signal<boolean>;
  public isMedium: Signal<boolean>;
  public isLarge: Signal<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) {
    const breakpointObservable = breakpointObserver.observe([
      this.SMALL_SCREEN,
      this.MEDIUM_SCREEN,
      this.LARGE_SCREEN,
    ]);

    this.breakpointSignal = toSignal(breakpointObservable);

    this.isSmall = computed(() => {
      this.breakpointSignal(); // Establish dependency
      return breakpointObserver.isMatched(this.SMALL_SCREEN);
    });

    this.isMedium = computed(() => {
      this.breakpointSignal(); // Establish dependency
      return breakpointObserver.isMatched(this.MEDIUM_SCREEN);
    });

    this.isLarge = computed(() => {
      this.breakpointSignal(); // Establish dependency
      return breakpointObserver.isMatched(this.LARGE_SCREEN);
    });
  }
}
