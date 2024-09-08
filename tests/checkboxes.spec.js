// @ts-check

import { test, expect, chromium } from '@playwright/test';

test('check checkboxes and select checkbox to select the option', async ({ }) => {
    // Launch Browser
    const browser = await chromium.launch({ headless: false }); // Launch browser
    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to the target website
    await page.goto('https://the-internet.herokuapp.com/checkboxes');

    // Verify checkbox page
    await expect(page.getByRole('heading', { name: 'Checkboxes' })).toBeVisible();

    // Define the selector for the checkbox to select option
    const checkboxes = await page.getByRole('checkbox');

    // Check the first checkbox if it is not already checked
    if(!(await checkboxes.nth(0).isChecked())){
        await checkboxes.nth(0).check();
    }

    if(await checkboxes.nth(1).isChecked()){
        await checkboxes.nth(1).uncheck();
    }

    // Verify the checkboxes' states
    await expect(checkboxes.nth(0)).toBeChecked();
    await expect(checkboxes.nth(1)).not.toBeChecked();
    
    // Close browser
    await browser.close();
});