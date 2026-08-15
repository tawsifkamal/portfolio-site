import { Injectable, signal } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  private SMALL_SCREEN = '(max-width: 1023px)';
  private MEDIUM_SCREEN = '(min-width: 1024px) and (max-width: 1439px)';
  private LARGE_SCREEN = '(min-width: 1440px)';

  private _isSmall = signal(false);
  private _isMedium = signal(false);
  private _isLarge = signal(false);

  get isSmall() { return this._isSmall(); }
  get isMedium() { return this._isMedium(); }
  get isLarge() { return this._isLarge(); }

  constructor(private breakpointObserver: BreakpointObserver) {
    this._isSmall.set(this.breakpointObserver.isMatched(this.SMALL_SCREEN));
    this._isMedium.set(this.breakpointObserver.isMatched(this.MEDIUM_SCREEN));
    this._isLarge.set(this.breakpointObserver.isMatched(this.LARGE_SCREEN));

    breakpointObserver
      .observe([this.SMALL_SCREEN, this.MEDIUM_SCREEN, this.LARGE_SCREEN])
      .subscribe(() => {
        this._isSmall.set(breakpointObserver.isMatched(this.SMALL_SCREEN));
        this._isMedium.set(breakpointObserver.isMatched(this.MEDIUM_SCREEN));
        this._isLarge.set(breakpointObserver.isMatched(this.LARGE_SCREEN));
      });
  }
}
