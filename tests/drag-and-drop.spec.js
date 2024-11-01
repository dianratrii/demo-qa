// @ts-check

import { test, expect, chromium } from '@playwright/test';

test('drag and drop functionality', async ({ page }) => {
    // Navigate to the page
    await page.goto('https://the-internet.herokuapp.com/drag_and_drop');

    // Define the elements for dragging and dropping
    const sourceBox = page.locator('#column-a'); // Element to drag
    const targetBox = page.locator('#column-b'); // Element to drop into

    // Perform the drag-and-drop action
    await sourceBox.dragTo(targetBox);

    // Assert the drop was successful
    const targetText = await targetBox.innerText();
    expect(targetText).toBe('A'); // Verify that 'A' is now in column B
});