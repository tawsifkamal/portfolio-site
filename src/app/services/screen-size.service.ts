import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

/**
 * A service that provides information about the screen size.
 */
@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  /**
   * The breakpoint for small screens.
   */
  private SMALL_SCREEN = '(max-width: 1023px)';
  /**
   * The breakpoint for medium screens.
   */
  private MEDIUM_SCREEN = '(min-width: 1024px) and (max-width: 1439px)';
  /**
   * The breakpoint for large screens.
   */
  private LARGE_SCREEN = '(min-width: 1440px)';

  /**
   * Whether the screen is small.
   */
  isSmall: boolean;
  /**
   * Whether the screen is medium.
   */
  isMedium: boolean;
  /**
   * Whether the screen is large.
   */
  isLarge: boolean;

  /**
   * The constructor of the service.
   * @param breakpointObserver The breakpoint observer.
   */
  constructor(private breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe([this.SMALL_SCREEN, this.MEDIUM_SCREEN, this.LARGE_SCREEN])
      .subscribe(() => {
        this.isSmall = breakpointObserver.isMatched(this.SMALL_SCREEN);
        this.isMedium = breakpointObserver.isMatched(this.MEDIUM_SCREEN);
        this.isLarge = breakpointObserver.isMatched(this.LARGE_SCREEN);
      });
  }
}
