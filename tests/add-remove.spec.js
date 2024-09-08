// @ts-check

import { test, expect, chromium } from '@playwright/test';

test('add and remove elements', async ({ }) => {
    // Launch Browser
    const browser = await chromium.launch({ headless: false }); // Launch browser
    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to the target website
    await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');

    // Define the selector for the button to add elements
    const addButton = page.getByRole('button', { name: 'Add Element' });
    
    // Click the add button to add the elements (it repeats about 3 times)
    for (let i = 0; i < 3; i++) {
        await addButton.click();

        await page.waitForSelector('text=Delete');
    }

    // Define the selector for the button to delete elements
    const deleteButton = page.getByRole('button', { name: 'Delete' });

    // Click the delete button to delete the elements (it repeats about 3 times)
    for (let i = 0; i < 3; i++) {
        await deleteButton.nth(0).click();
    }

    // Close browser
    await browser.close();
});