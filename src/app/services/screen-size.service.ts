import { Injectable, signal } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  private SMALL_SCREEN = '(max-width: 1023px)';
  private MEDIUM_SCREEN = '(min-width: 1024px) and (max-width: 1439px)';
  private LARGE_SCREEN = '(min-width: 1440px)';

  readonly isSmall = signal<boolean>(false);
  readonly isMedium = signal<boolean>(false);
  readonly isLarge = signal<boolean>(false);

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([this.SMALL_SCREEN, this.MEDIUM_SCREEN, this.LARGE_SCREEN])
      .subscribe((result) => {
        this.isSmall.set(result.breakpoints[this.SMALL_SCREEN]);
        this.isMedium.set(result.breakpoints[this.MEDIUM_SCREEN]);
        this.isLarge.set(result.breakpoints[this.LARGE_SCREEN]);
      });
  }
}
