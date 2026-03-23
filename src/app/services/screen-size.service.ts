import { Injectable, Signal } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  private SMALL_SCREEN = '(max-width: 1023px)';
  private MEDIUM_SCREEN = '(min-width: 1024px) and (max-width: 1439px)';
  private LARGE_SCREEN = '(min-width: 1440px)';

  isSmall: Signal<boolean>;
  isMedium: Signal<boolean>;
  isLarge: Signal<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) {
    const breakpoint$ = breakpointObserver.observe([
      this.SMALL_SCREEN,
      this.MEDIUM_SCREEN,
      this.LARGE_SCREEN,
    ]);

    this.isSmall = toSignal(
      breakpoint$.pipe(
        map(() => this.breakpointObserver.isMatched(this.SMALL_SCREEN))
      ),
      { initialValue: this.breakpointObserver.isMatched(this.SMALL_SCREEN) }
    );

    this.isMedium = toSignal(
      breakpoint$.pipe(
        map(() => this.breakpointObserver.isMatched(this.MEDIUM_SCREEN))
      ),
      { initialValue: this.breakpointObserver.isMatched(this.MEDIUM_SCREEN) }
    );

    this.isLarge = toSignal(
      breakpoint$.pipe(
        map(() => this.breakpointObserver.isMatched(this.LARGE_SCREEN))
      ),
      { initialValue: this.breakpointObserver.isMatched(this.LARGE_SCREEN) }
    );
  }
}
