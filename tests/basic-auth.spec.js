// @ts-check

import { test, expect, chromium } from '@playwright/test';

test('login to basic auth and verify successful access', async ({ }) => {
    // Launch Browser
    const browser = await chromium.launch({ headless: false }); // Launch browser
    const context = await browser.newContext();
    const page = await context.newPage();

    // Define the username and password for basic auth
    const username = 'admin';
    const password = 'admin';

    // Use the URL with basic auth credentials embedded
    await page.goto(`https://${username}:${password}@the-internet.herokuapp.com/basic_auth`);

    // Verify successful login by checking the page content
    const content = await page.textContent('div.example');
    expect(content).toContain('Congratulations! You must have the proper credentials.');

    // Close browser
    await browser.close();
});