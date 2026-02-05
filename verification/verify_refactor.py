from playwright.sync_api import Page, expect, sync_playwright

def verify_refactor(page: Page):
    # 1. Arrange: Go to the app.
    page.goto("http://localhost:4200")

    # 2. Assert: Check title
    expect(page).to_have_title("PortfolioWebsite")

    # 3. Assert: Check for content injected via service
    # Articles
    expect(page.get_by_role("heading", name="Articles")).to_be_visible()
    expect(page.get_by_text("An Intuitive Approach To Linear Regression")).to_be_visible()

    # Projects
    # Just check for one of the project titles
    expect(page.get_by_text("TinyGen: An LLM Coding Agent")).to_be_visible()

    # Work Experience
    expect(page.get_by_text("Machine Learning Engineering Intern")).to_be_visible()

    # 4. Screenshot
    page.screenshot(path="verification/verification.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_refactor(page)
        finally:
            browser.close()
