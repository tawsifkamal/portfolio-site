import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  private SMALL_SCREEN = '(max-width: 1023px)';
  private MEDIUM_SCREEN = '(min-width: 1024px) and (max-width: 1439px)';
  private LARGE_SCREEN = '(min-width: 1440px)';

  isSmall: boolean;
  isMedium: boolean;
  isLarge: boolean;

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
