from playwright.sync_api import sync_playwright

def verify_frontend():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Go to the local server
        page.goto("http://localhost:4000")

        # Wait for the main content to load
        page.wait_for_selector(".main")

        # Take a screenshot
        page.screenshot(path="verify.png", full_page=True)

        browser.close()

if __name__ == "__main__":
    verify_frontend()
