import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

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
    const breakpointState$ = breakpointObserver.observe([
      this.SMALL_SCREEN,
      this.MEDIUM_SCREEN,
      this.LARGE_SCREEN,
    ]);

    this.isSmall = toSignal(
      breakpointState$.pipe(map(() => breakpointObserver.isMatched(this.SMALL_SCREEN))),
      { initialValue: false }
    );
    this.isMedium = toSignal(
      breakpointState$.pipe(map(() => breakpointObserver.isMatched(this.MEDIUM_SCREEN))),
      { initialValue: false }
    );
    this.isLarge = toSignal(
      breakpointState$.pipe(map(() => breakpointObserver.isMatched(this.LARGE_SCREEN))),
      { initialValue: false }
    );
  }
}
