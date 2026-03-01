import { Injectable, computed } from '@angular/core';
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

  private breakpointState = toSignal(
    this.breakpointObserver.observe([
      this.SMALL_SCREEN,
      this.MEDIUM_SCREEN,
      this.LARGE_SCREEN,
    ]),
    { initialValue: { breakpoints: {} } as any } // Provide a safe initial state
  );

  isSmall = computed(() => this.breakpointObserver.isMatched(this.SMALL_SCREEN));
  isMedium = computed(() => this.breakpointObserver.isMatched(this.MEDIUM_SCREEN));
  isLarge = computed(() => this.breakpointObserver.isMatched(this.LARGE_SCREEN));

  constructor(private breakpointObserver: BreakpointObserver) {}
}
