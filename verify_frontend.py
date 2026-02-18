from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:4200")

        # Verify Navigation
        print("Verifying Navigation...")
        page.wait_for_selector(".menu-item")
        # .menu-item contains span with text.
        items = page.locator(".menu-text").all_inner_texts()
        print(f"Menu items: {items}")
        assert "ABOUT" in items
        assert "EXPERIENCE" in items
        assert "PROJECTS" in items

        # Verify Articles (loaded from service)
        print("Verifying Articles...")
        page.wait_for_selector(".article-link")
        articles = page.locator(".article-link").all_inner_texts()
        print(f"Articles: {articles}")
        assert "An Intuitive Approach To Linear Regression" in articles

        # Verify Projects (loaded from service)
        print("Verifying Projects...")
        page.wait_for_selector("app-project-card")

        # Verify Work Experience
        print("Verifying Work Experience...")
        page.wait_for_selector("app-work-experience-card")

        # Verify Mouse Follower
        print("Verifying Mouse Follower...")
        follower = page.locator(".mouse-follower")
        # Check if it exists and is visible (display: block set in ngAfterViewInit)
        # Note: it might have display:none initially in CSS, but JS sets it to block.
        assert follower.is_visible()

        # Screenshot
        screenshot_path = "verification_screenshot.png"
        page.screenshot(path=screenshot_path, full_page=True)
        print(f"Screenshot saved to {screenshot_path}")

        browser.close()

if __name__ == "__main__":
    run()
