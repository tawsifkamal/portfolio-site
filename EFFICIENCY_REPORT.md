# Portfolio Site Efficiency Report

This report documents efficiency issues identified in the tawsifkamal/portfolio-site codebase, along with recommendations for improvement.

## Executive Summary

During code review, several efficiency issues were identified ranging from critical memory leaks to optimization opportunities. This report categorizes them by severity and provides actionable recommendations.

---

## 🔴 CRITICAL Issues

### 1. Memory Leak in ScreenSizeService

**Location:** `src/app/services/screen-size.service.ts` (lines 18-24)

**Issue:**
The `ScreenSizeService` subscribes to a `BreakpointObserver` observable in the constructor but never unsubscribes, causing a memory leak.

```typescript
constructor(private breakpointObserver: BreakpointObserver) {
  breakpointObserver
    .observe([this.SMALL_SCREEN, this.MEDIUM_SCREEN, this.LARGE_SCREEN])
    .subscribe(() => {
      this.isSmall = breakpointObserver.isMatched(this.SMALL_SCREEN);
      this.isMedium = breakpointObserver.isMatched(this.MEDIUM_SCREEN);
      this.isLarge = breakpointObserver.isMatched(this.LARGE_SCREEN);
    });
}
```

**Impact:**
- The service is provided at root level (`providedIn: 'root'`)
- It's injected into multiple components across the app
- The subscription persists even after components are destroyed
- Accumulates memory over time with repeated navigation

**Recommendation:**
Implement the `OnDestroy` interface and unsubscribe in `ngOnDestroy()`:
```typescript
import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export class ScreenSizeService implements OnDestroy {
  private breakpointSubscription: Subscription;
  
  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointSubscription = breakpointObserver.observe(...).subscribe(...);
  }
  
  ngOnDestroy(): void {
    if (this.breakpointSubscription) {
      this.breakpointSubscription.unsubscribe();
    }
  }
}
```

**Status:** ✅ FIXED in this PR

---

## 🟠 HIGH Priority Issues

### 2. Inefficient Mouse Movement Handler

**Location:** `src/app/app.component.ts` (lines 87-92)

**Issue:**
The `onMouseMove` event handler executes on every single pixel of mouse movement without any throttling or debouncing.

```typescript
@HostListener('document:mousemove', ['$event'])
onMouseMove(e: MouseEvent) {
  const follower = document.querySelector('.mouse-follower') as HTMLElement;
  follower.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
}
```

**Impact:**
- Fires hundreds of times per second during mouse movement
- Performs DOM query on every event
- Updates inline styles constantly
- Significant CPU usage, especially on slower devices

**Recommendation:**
1. Cache the DOM element reference
2. Use RxJS `throttleTime` or `debounceTime` to limit update frequency
3. Consider using `requestAnimationFrame` for smoother updates

```typescript
private mouseFollower: HTMLElement | null = null;

ngAfterViewInit() {
  this.mouseFollower = this.document.querySelector('.mouse-follower') as HTMLElement;
}

@HostListener('document:mousemove', ['$event'])
onMouseMove(e: MouseEvent) {
  if (this.mouseFollower) {
    requestAnimationFrame(() => {
      this.mouseFollower!.style.background = 
        `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
    });
  }
}
```

**Status:** ⏳ Not fixed in this PR (documented for future work)

---

### 3. Inefficient Scroll Handler

**Location:** `src/app/app.component.ts` (lines 63-85)

**Issue:**
The scroll event handler runs on every scroll event without debouncing or throttling.

```typescript
@HostListener('window:scroll', ['$event'])
onWindowScroll() {
  const scrollPosition = window.pageYOffset || /* ... */;
  // Multiple conditional checks on every scroll event
}
```

**Impact:**
- Executes dozens of times per second during scrolling
- Performs multiple calculations and comparisons
- Can cause janky scrolling on slower devices

**Recommendation:**
Use RxJS `debounceTime` or `throttleTime` operators:

```typescript
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

ngAfterViewInit() {
  fromEvent(window, 'scroll')
    .pipe(throttleTime(100))
    .subscribe(() => this.updateCurrentSection());
}

private updateCurrentSection() {
  const scrollPosition = window.pageYOffset || /* ... */;
  // section logic
}
```

**Status:** ⏳ Not fixed in this PR (documented for future work)

---

### 4. Large Unoptimized Images

**Location:** `src/assets/images/`

**Issue:**
Multiple extremely large image files are being served without optimization:

- `headshotGood.jpeg` - **21 MB**
- `head.JPG` - **20 MB**
- `profile.jpeg` - **1.6 MB**
- `DeepQLearningThumbnail.png` - **2.2 MB**

**Impact:**
- Significantly slower initial page load
- High bandwidth usage
- Poor experience on mobile/slow connections
- SEO penalties for page speed
- Unnecessary hosting costs

**Recommendation:**
1. Resize images to appropriate display dimensions (typically max 1920px wide)
2. Optimize using tools like:
   - ImageOptim, TinyPNG, or Squoosh
   - WebP format for better compression
   - Responsive images with `srcset`
3. Consider lazy loading for below-the-fold images

**Example target sizes:**
- Profile images: ~200-400 KB max
- Thumbnails: ~100-200 KB max
- Hero images: ~500 KB max

**Status:** ⏳ Not fixed in this PR (documented for future work)

---

## 🟡 MEDIUM Priority Issues

### 5. Missing OnPush Change Detection Strategy

**Locations:** Multiple components

**Issue:**
All components use the default change detection strategy, causing Angular to check them on every change detection cycle, even when their inputs haven't changed.

**Affected Components:**
- `AppComponent`
- `ProjectSectionComponent`
- `WorkExperienceSectionComponent`
- `ProjectCardComponent`
- `WorkExperienceCardComponent`
- `NavigationComponent`

**Impact:**
- Unnecessary change detection cycles
- Reduced performance, especially with many components
- More significant on larger applications

**Recommendation:**
Add `changeDetection: ChangeDetectionStrategy.OnPush` to component decorators:

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-project-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ...
})
```

**Note:** This requires careful handling of component state and may require using `ChangeDetectorRef.markForCheck()` in some cases.

**Status:** ⏳ Not fixed in this PR (documented for future work)

---

### 6. Unused Imports and Properties

**Location:** `src/app/work-experience-section/work-experience-card/work-experience-card.component.ts`

**Issue:**
The component imports `Subscription` from RxJS and declares unused properties:

```typescript
import { Subscription } from 'rxjs';  // Unused import

export class WorkExperienceCardComponent {
  isSmallScreen: boolean = false;  // Unused property
  breakpointSubscription: Subscription;  // Unused property
}
```

**Impact:**
- Slightly larger bundle size
- Code confusion for maintainers
- Suggests incomplete refactoring

**Recommendation:**
Remove unused imports and properties.

**Status:** ✅ FIXED in this PR

---

## 🟢 LOW Priority Issues

### 7. Tracking by Index in @for Loops

**Locations:**
- `src/app/project-section/project-section.component.html` (line 6)
- `src/app/work-experience-section/work-experience-section.component.html` (line 6)
- `src/app/app.component.html` (line 74)
- `src/app/project-section/project-card/project-card.component.html` (line 34)
- `src/app/work-experience-section/work-experience-card/work-experience-card.component.html` (line 46)

**Issue:**
All `@for` loops use `track $index` instead of tracking by unique properties.

```typescript
@for (project of projects; track $index) {
  <app-project-card [project]="project" />
}
```

**Impact:**
- Inefficient re-rendering when list order changes
- Angular can't properly identify which items changed
- All items may be re-rendered instead of just modified ones

**Recommendation:**
Track by unique identifier when available:

```typescript
// In component
trackByProjectName(index: number, project: Project): string {
  return project.name;
}

// In template
@for (project of projects; track trackByProjectName($index, project)) {
  <app-project-card [project]="project" />
}
```

Or for newer Angular syntax:
```typescript
@for (project of projects; track project.name) {
  <app-project-card [project]="project" />
}
```

**Status:** ⏳ Not fixed in this PR (documented for future work)

---

## Summary Table

| Issue | Severity | Location | Status |
|-------|----------|----------|--------|
| Memory leak in ScreenSizeService | 🔴 Critical | `screen-size.service.ts` | ✅ Fixed |
| Inefficient mousemove handler | 🟠 High | `app.component.ts` | ⏳ Documented |
| Inefficient scroll handler | 🟠 High | `app.component.ts` | ⏳ Documented |
| Large unoptimized images | 🟠 High | `assets/images/` | ⏳ Documented |
| Missing OnPush strategy | 🟡 Medium | Multiple components | ⏳ Documented |
| Unused imports/properties | 🟡 Medium | `work-experience-card.component.ts` | ✅ Fixed |
| Tracking by index in loops | 🟢 Low | Multiple templates | ⏳ Documented |

---

## Recommendations for Next Steps

1. **Immediate:** Address remaining HIGH priority issues (throttle handlers, optimize images)
2. **Short-term:** Implement OnPush change detection strategy across components
3. **Long-term:** Add proper trackBy functions to all loops

## Testing Notes

After implementing any of these fixes:
- Test on various devices and screen sizes
- Monitor bundle size changes
- Verify functionality remains unchanged
- Check browser DevTools Performance tab for improvements

---

*Report generated: October 13, 2025*  
*Created by: Devin AI for @tawsifkamal*
