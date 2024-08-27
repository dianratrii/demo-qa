// @ts-check

import { test, expect, chromium } from '@playwright/test';

test('check and verify for broken images', async ({ }) => {
    // Launch Browser
    const browser = await chromium.launch({ headless: false }); // Launch browser
    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to the target website
    await page.goto('https://the-internet.herokuapp.com/broken_images');

    // Get all image elements on the page
    const images = await page.$$eval('img', imgs => imgs.map(img => img.src));

    // Function to check image status
    const checkImageStatus = async (imageUrl) => {
        const response = await page.request.get(imageUrl);
        return response.status() === 200;
    };

    // Check each image
    for (const image of images) {
        const isImageOk = await checkImageStatus(image);
        if (!isImageOk) {
            console.log(`Broken image found: ${image}`);
        }
    }
    
    // Close browser
    await browser.close();
});