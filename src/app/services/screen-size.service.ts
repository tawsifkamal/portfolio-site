import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  private SMALL_SCREEN = '(max-width: 1023px)';
  private MEDIUM_SCREEN = '(min-width: 1024px) and (max-width: 1439px)';
  private LARGE_SCREEN = '(min-width: 1440px)';

  // We convert the observable to a signal so we don't need manual subscriptions and can use OnPush
  private breakpointState = toSignal(
    this.breakpointObserver.observe([
      this.SMALL_SCREEN,
      this.MEDIUM_SCREEN,
      this.LARGE_SCREEN,
    ])
  );

  get isSmall() {
    this.breakpointState(); // Register as a reactive dependency
    return this.breakpointObserver.isMatched(this.SMALL_SCREEN);
  }

  get isMedium() {
    this.breakpointState();
    return this.breakpointObserver.isMatched(this.MEDIUM_SCREEN);
  }

  get isLarge() {
    this.breakpointState();
    return this.breakpointObserver.isMatched(this.LARGE_SCREEN);
  }

  constructor(private breakpointObserver: BreakpointObserver) {}
}
