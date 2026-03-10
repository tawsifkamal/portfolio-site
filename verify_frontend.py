from playwright.sync_api import Page, expect, sync_playwright
import time

def test_frontend_visibility(page: Page):
  # 1. Arrange: Go to the local server
  page.goto("http://localhost:4000")

  # wait for page to load completely
  page.wait_for_selector(".mouse-follower")

  # Move mouse to trigger mouse move event
  page.mouse.move(500, 500)

  # Check that mouse-follower is visible
  expect(page.locator(".mouse-follower")).to_be_visible()

  # scroll down to trigger intersection observer
  page.evaluate("window.scrollTo(0, 1000);")

  # Give some time for the intersection observer to fire
  time.sleep(2)

  # 4. Screenshot: Capture the final result for visual verification.
  page.screenshot(path="/app/verification.png")

if __name__ == "__main__":
  with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    try:
      test_frontend_visibility(page)
    finally:
      browser.close()