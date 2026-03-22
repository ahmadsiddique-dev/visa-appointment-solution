const { chromium } = require("playwright");
const DownloadCaptcha = require("../utils/captchaDownloader");
const solveCaptcha = require("../utils/captcha_solver");
const { passport_number, visa_number } = require("../vaiable");

async function run(path) {
    console.log("Starting Captcha Recognition using Python CNN Engine...");
    try {
        const result = await solveCaptcha(path);
        return result;
    } catch (error) {
        console.error("Failed to solve captcha:\n", error);
        return "";
    }
}
async function playWrightUpdate() {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://www.qatarvisacenter.com/");
    await page.locator('div[data-bs-toggle="dropdown"]').click();
    await page.getByText("English").click();
    await page.locator('input[placeholder="-- Select Country --"]').click();
    await page.getByText("Pakistan").click();
    await page.locator('a.card-box:has-text("Book Appointment")').click();
    await page.waitForTimeout(4000);
    try {
        await page.getByAltText("close").click({ timeout: 5000 });
    } catch (error) {
        console.log("no close here");
    }
    const captchaLocator = page.locator('img[id="captchaImage"]');
    await captchaLocator.waitFor({ state: 'visible', timeout: 10000 });
    const src = await captchaLocator.getAttribute("src");
    const path = await DownloadCaptcha(src);
    const code = await run(path);

    await page.locator('input[placeholder="Passport Number"]').fill(passport_number);
    await page.locator('input[placeholder="Visa Number"]').fill(visa_number);
    const captchaText = (code || "").toUpperCase();
    await page.locator('input[placeholder="Enter Captcha"]').fill(captchaText);
    await page.locator('button[type="button"]').nth(1).click();

    // I want that either click this one or the other
    try {
        await page.locator('button[translate="manage.ok"], .modal-footer button.cir-em-btn:has-text("ok")').first().click({ timeout: 10000 });
    } catch (e) {
        console.log("No ok button found, continuing...");
    }

    await page.locator('input[id="phone"]').fill('00923015284950')
    await page.locator('input[id="email"]').fill('asshikrani66@gmail.com')
    await page.locator('input[id="checkVal"]').check();

    await page.waitForTimeout(6000);
    await browser.close();
}

playWrightUpdate();

module.exports = playWrightUpdate;
