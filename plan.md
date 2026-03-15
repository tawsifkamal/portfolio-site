1. Refactor `app.component.ts` to optimize DOM interactions and event listeners.
   - Inject `PLATFORM_ID`, `NgZone`, and `Renderer2`.
   - Remove `@HostListener('window:scroll')` and `@HostListener('document:mousemove')`.
   - Implement `ngAfterViewInit` to cache the `.mouse-follower` element and attach a `mousemove` listener outside the Angular Zone using `NgZone.runOutsideAngular`.
   - Use `Renderer2` for updating the background style of `.mouse-follower`.
   - Implement an `IntersectionObserver` with thresholds to track scroll spy visibility for `#ABOUT`, `#EXPERIENCE`, and `#PROJECTS` instead of calculating scroll offsets manually.
   - Ensure all browser-specific globals like `document` and `IntersectionObserver` are guarded with `isPlatformBrowser`.
   - Implement `ngOnDestroy` to clean up event listeners and the `IntersectionObserver`.
2. Update `app.component.spec.ts` if needed to reflect these changes.
   - Mock elements modified by `Renderer2` like `.mouse-follower` in `beforeEach` and remove them in `afterEach`.
3. Complete pre-commit steps
   - Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.
4. Submit changes
