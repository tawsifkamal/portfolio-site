import { Injectable, computed } from '@angular/core';
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

  private screenState = toSignal(
    this.breakpointObserver
      .observe([this.SMALL_SCREEN, this.MEDIUM_SCREEN, this.LARGE_SCREEN])
      .pipe(
        map(() => ({
          small: this.breakpointObserver.isMatched(this.SMALL_SCREEN),
          medium: this.breakpointObserver.isMatched(this.MEDIUM_SCREEN),
          large: this.breakpointObserver.isMatched(this.LARGE_SCREEN),
        }))
      ),
    {
      initialValue: {
        small: this.breakpointObserver.isMatched(this.SMALL_SCREEN),
        medium: this.breakpointObserver.isMatched(this.MEDIUM_SCREEN),
        large: this.breakpointObserver.isMatched(this.LARGE_SCREEN),
      },
    }
  );

  isSmall = computed(() => this.screenState().small);
  isMedium = computed(() => this.screenState().medium);
  isLarge = computed(() => this.screenState().large);

  constructor(private breakpointObserver: BreakpointObserver) {}
}
