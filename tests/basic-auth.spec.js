// @ts-check

import { test, expect, chromium } from '@playwright/test';

test('login to basic auth user and password', async ({ }) => {
    // Launch Browser
    const browser = await chromium.launch({ headless: false }); // Launch browser
    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to the target website
    await page.goto('https://the-internet.herokuapp.com');

    // Define the selector for the link to access form basic auth
    const linkBasicAuth = page.getByRole('link', { name: 'Basic Auth' });
    
    // Click link to access modal 
    await linkBasicAuth.click();



    // Close browser
    await browser.close();
});