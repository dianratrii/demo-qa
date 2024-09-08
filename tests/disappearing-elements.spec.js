// @ts-check

import { test, expect, chromium } from '@playwright/test';

test('check disappearing elements and verify appearing after reload page', async ({ }) => {
    // Launch Browser
    const browser = await chromium.launch({ headless: false }); // Launch browser
    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to the target website
    await page.goto('https://the-internet.herokuapp.com/disappearing_elements');

    // Define menu items with name and selector
    const menuItems = [
        { name: 'Home', selector: 'ul li a[href="/"]' },
        { name: 'About', selector: 'ul li a[href="/about/"]' },
        { name: 'Contact Us', selector: 'ul li a[href="/contact-us/"]' },
        { name: 'Portfolio', selector: 'ul li a[href="/portfolio/"]' },
        { name: 'Gallery', selector: 'ul li a[href="/gallery/"]' }
    ];

    // Function to check the visibility of each menu item
    const checkMenuItems = async () => {
        for (const item of menuItems) {
            const isVisible = await page.isVisible(item.selector);
            console.log(`"${item.name}" is ${isVisible ? 'visible' : 'missing'}.`);
        }
    }
    
    // Initial check for menu items
    console.log('Initial Check: ');
    await checkMenuItems();

    // Perform a refresh to simulate changes in the elements' visibility
    await page.reload();

    // Second check for the menu items
    console.log('\nAfter Reload: ');
    await checkMenuItems();
    
    // Close browser
    await browser.close();
});