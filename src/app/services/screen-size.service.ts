import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  private SMALL_SCREEN = '(max-width: 1023px)';
  private MEDIUM_SCREEN = '(min-width: 1024px) and (max-width: 1439px)';
  private LARGE_SCREEN = '(min-width: 1440px)';

  private isSmall = new BehaviorSubject<boolean>(false);
  isSmall$ = this.isSmall.asObservable();

  private isMedium = new BehaviorSubject<boolean>(false);
  isMedium$ = this.isMedium.asObservable();

  private isLarge = new BehaviorSubject<boolean>(false);
  isLarge$ = this.isLarge.asObservable();

  constructor(private breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe([this.SMALL_SCREEN, this.MEDIUM_SCREEN, this.LARGE_SCREEN])
      .subscribe(() => {
        this.isSmall.next(breakpointObserver.isMatched(this.SMALL_SCREEN));
        this.isMedium.next(breakpointObserver.isMatched(this.MEDIUM_SCREEN));
        this.isLarge.next(breakpointObserver.isMatched(this.LARGE_SCREEN));
      });
  }
}
