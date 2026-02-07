from playwright.sync_api import sync_playwright

def verify_app():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            page.goto("http://localhost:8080")
            page.wait_for_load_state("networkidle")

            # Verify title
            print(f"Title: {page.title()}")

            # Verify images have alt text
            images = page.locator("img").all()
            print(f"Found {len(images)} images")
            for i, img in enumerate(images):
                alt = img.get_attribute("alt")
                src = img.get_attribute("src")
                print(f"Image {i}: src={src}, alt='{alt}'")
                if not alt:
                    print(f"ERROR: Image {i} missing alt text!")

            # Verify external links have rel="noopener noreferrer"
            links = page.locator("a[target='_blank']").all()
            print(f"Found {len(links)} external links")
            for i, link in enumerate(links):
                href = link.get_attribute("href")
                rel = link.get_attribute("rel")
                print(f"Link {i}: href={href}, rel='{rel}'")
                if rel is None or "noopener" not in rel or "noreferrer" not in rel:
                     print(f"ERROR: Link {i} missing rel attributes!")

            page.screenshot(path="verification_screenshot.png", full_page=True)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_app()
