const puppeteer = require("puppeteer");
const chromium = require('chrome-aws-lambda');

const takeImage = async (html, elementId = "#snapShotElement") => {
    const browser = await puppeteer.launch({
        devtools: false, args: [
            ...chromium.args,
            '--single-process',
        ],
    });
    const page = await browser.newPage();

    await page.setContent(html, {
        waitUntil: 'networkidle0',
    });
    await page.setViewport({ width: 1280, height: 720 });
    await page.evaluate(() => document.body.style.background = 'transparent');
    await page.waitForSelector(`#${elementId}`)
    const content = await page.$(`#${elementId}`);

    const imageBuffer = await content.screenshot({ encoding: "base64", omitBackground: true });
    await page?.close();
    await browser?.close();
    return imageBuffer;

};

module.exports = takeImage;