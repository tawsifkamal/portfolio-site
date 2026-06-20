import { Injectable, Signal } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

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
    this.isSmall = toSignal(
      this.breakpointObserver.observe([this.SMALL_SCREEN]).pipe(
        map((state) => state.matches)
      ),
      { initialValue: false }
    );
    this.isMedium = toSignal(
      this.breakpointObserver.observe([this.MEDIUM_SCREEN]).pipe(
        map((state) => state.matches)
      ),
      { initialValue: false }
    );
    this.isLarge = toSignal(
      this.breakpointObserver.observe([this.LARGE_SCREEN]).pipe(
        map((state) => state.matches)
      ),
      { initialValue: false }
    );
  }
}
