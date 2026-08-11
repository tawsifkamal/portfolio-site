import { Injectable, computed } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  private SMALL_SCREEN = '(max-width: 1023px)';
  private MEDIUM_SCREEN = '(min-width: 1024px) and (max-width: 1439px)';
  private LARGE_SCREEN = '(min-width: 1440px)';

  private breakpointSignal = toSignal(
    this.breakpointObserver.observe([this.SMALL_SCREEN, this.MEDIUM_SCREEN, this.LARGE_SCREEN]),
    { initialValue: { matches: false, breakpoints: {} as Record<string, boolean> } }
  );

  get isSmall(): boolean {
    return this.breakpointSignal().breakpoints[this.SMALL_SCREEN] ?? false;
  }
  get isMedium(): boolean {
    return this.breakpointSignal().breakpoints[this.MEDIUM_SCREEN] ?? false;
  }
  get isLarge(): boolean {
    return this.breakpointSignal().breakpoints[this.LARGE_SCREEN] ?? false;
  }

  constructor(private breakpointObserver: BreakpointObserver) {}
}
