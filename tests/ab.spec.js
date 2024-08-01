// @ts-check

import { test, expect, chromium } from '@playwright/test';

test('opens link in new tab and checks title', async ({ }) => {
    // Launch Browser
    const browser = await chromium.launch({ headless: false }); // Launch browser
    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to the target website
    await page.goto('https://the-internet.herokuapp.com/abtest');

    // Define the selector for the link that opens in a new tab
    const newTabLinkSelector = 'a[target="_blank"]:has-text("Elemental Selenium")';

    // Click the link and wait for the new page (tab) to open
    const [newPage] = await Promise.all([
        context.waitForEvent('page'), // Wait for the new page to be created
        page.click(newTabLinkSelector), // Click the link
    ]);

    // Wait for the new page to fully load
    await newPage.waitForLoadState();

    // Check the title of the new page
    await expect(newPage).toHaveTitle(/.*Elemental Selenium/);

    // Close browser
    await browser.close();
});