// @ts-check

import { test, expect, chromium } from '@playwright/test';

test('login to digest auth and verify successful access', async ({ }) => {
    // Launch Browser
    const browser = await chromium.launch({ headless: false }); // Launch browser
    const context = await browser.newContext({
        httpCredentials: {
          username: 'admin',
          password: 'admin'
        }
      });
    
    // Open a new page in the context
    const page = await context.newPage();

    // Navigate to the page with Digest Auth
    await page.goto('https://the-internet.herokuapp.com/digest_auth');

    // Verify successful login by checking the page content
    const content = await page.textContent('div.example');
    expect(content).toContain('Congratulations! You must have the proper credentials.');

    //explanation about why between basic auth and digest auth in playwright code is similar

    //In both cases, we can configure the credentials when creating the browser context, 
    //and Playwright will handle the authentication automatically based on the type of 
    //authentication required by the URL.

    // Close browser
    await browser.close();
});