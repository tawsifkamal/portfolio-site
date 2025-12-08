import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

/**
 * Service for detecting and responding to screen size changes.
 *
 * Provides reactive breakpoint detection for responsive design across the application.
 * Uses Angular CDK's BreakpointObserver to monitor viewport changes.
 *
 * Breakpoints:
 * - Small: max-width 1023px (mobile/tablet portrait)
 * - Medium: 1024px - 1439px (tablet landscape/small desktop)
 * - Large: 1440px and above (desktop/large screens)
 *
 * @example
 * ```typescript
 * constructor(private screenSizeService: ScreenSizeService) {
 *   if (this.screenSizeService.isSmall) {
 *     // Apply mobile layout
 *   }
 * }
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  /** Media query for small screens (mobile/tablet portrait) */
  private SMALL_SCREEN = '(max-width: 1023px)';

  /** Media query for medium screens (tablet landscape/small desktop) */
  private MEDIUM_SCREEN = '(min-width: 1024px) and (max-width: 1439px)';

  /** Media query for large screens (desktop/large displays) */
  private LARGE_SCREEN = '(min-width: 1440px)';

  /** True if viewport matches small screen breakpoint */
  isSmall: boolean;

  /** True if viewport matches medium screen breakpoint */
  isMedium: boolean;

  /** True if viewport matches large screen breakpoint */
  isLarge: boolean;

  constructor(private breakpointObserver: BreakpointObserver) {
    // Subscribe to breakpoint changes and update boolean flags
    breakpointObserver
      .observe([this.SMALL_SCREEN, this.MEDIUM_SCREEN, this.LARGE_SCREEN])
      .subscribe(() => {
        this.isSmall = breakpointObserver.isMatched(this.SMALL_SCREEN);
        this.isMedium = breakpointObserver.isMatched(this.MEDIUM_SCREEN);
        this.isLarge = breakpointObserver.isMatched(this.LARGE_SCREEN);
      });
  }
}
