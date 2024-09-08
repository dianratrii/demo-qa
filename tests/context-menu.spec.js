// @ts-check

import { test, expect, chromium } from '@playwright/test';

test('check context menu and verify text from context menu', async ({ }) => {
    // Launch Browser
    const browser = await chromium.launch({ headless: false }); // Launch browser
    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to the target website
    await page.goto('https://the-internet.herokuapp.com/context_menu');

    // Verify context menu page
    await expect(page.getByRole('heading', { name: 'Context Menu' })).toBeVisible();

    // Ensure the context menu area is visible
    const contextMenuArea = await page.locator('#hot-spot');
    await contextMenuArea.waitFor({ state: 'visible' });

    // Right-click on the hot spot (context menu area) [not supported for playwright]
    await contextMenuArea.click({ button: 'right', force: true });

    // Expect the context menu to be triggered and alert to appear
    const dialog = await page.waitForEvent('dialog');
    await expect(dialog.message()).toContain('You selected a context menu');

    // Dismiss the dialog
    await dialog.dismiss();
    
    // Close browser
    await browser.close();
});