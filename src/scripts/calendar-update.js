const { chromium } = require('playwright')

async function playWrightUpdate() {
    const browser = await chromium.launch({ headless: false })
    const page = await browser.newPage();

    await page.goto('https://www.qatarvisacenter.com/')
    await page.locator('div:[data-bs-toggle="dropdown"]')
    await page.getByText('English').click();

    await browser.close();
}


playWrightUpdate();

// module.exports = playWrightUpdate;