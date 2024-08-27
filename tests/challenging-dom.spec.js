// @ts-check

import { test, expect, chromium } from '@playwright/test';

test('check DOM for button and table content', async ({ }) => {
    // Launch Browser
    const browser = await chromium.launch({ headless: false }); // Launch browser
    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to the target website
    await page.goto('https://the-internet.herokuapp.com/challenging_dom');

    // Define selectors as constants
    // const BUTTON_SELECTOR_1 = page.getByRole('button', { name: 'bar' });
    // const BUTTON_SELECTOR_2 = page.getByRole('button', { name: 'qux' });
    // const BUTTON_SELECTOR_3 = page.getByRole('button', { name: 'foo' });
    // const TABLE_SELECTOR = 'table';
    // const TABLE_CELL_SELECTOR = 'table tbody tr:nth-child(1) td:nth-child(2)';

    // Define selectors as constants
    const BUTTON_SELECTOR_1 = 'div > div > a.button';
    const BUTTON_SELECTOR_2 = 'div > div > a.button.alert';
    const BUTTON_SELECTOR_3 = 'div > div > a.button.success';
    const TABLE_SELECTOR = 'table';
    const TABLE_CELL_SELECTOR = 'table tbody tr:nth-child(1) td:nth-child(2)';

    // Interact with buttons
    await page.click(BUTTON_SELECTOR_1);
    await page.click(BUTTON_SELECTOR_2);
    await page.click(BUTTON_SELECTOR_3);

    // Assert the table is present
    const table = await page.$(TABLE_SELECTOR);
    expect(table).not.toBeNull();

    // Check a specific cell value
    const cellValue = await page.textContent(TABLE_CELL_SELECTOR);
    console.log(`First row, second column value: ${cellValue}`);

    // Implement meaningful assertions (example)
    expect(cellValue).not.toBeNull();
    
    // Close browser
    await browser.close();
});