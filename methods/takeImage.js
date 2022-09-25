const puppeteer = require("puppeteer");
const chromium = require('chrome-aws-lambda');

const delay = async (ms) => {
    return await new Promise(r => setTimeout(r, ms));
};

const takeImage = async (html, elementId = "#snapShotElement", options = {}) => {
    const browser = await puppeteer.launch({
        devtools: false, args: [
            ...chromium.args,
            '--single-process',
        ],
    });
    const page = await browser.newPage();

    if (typeof html === "string") {
        await page.setContent(html, {
            waitUntil: 'networkidle0',
        });
    };

    if (html.url) {
        await page.goto(html.url, {
            waitUntil: 'networkidle0',
        });
    };

    await page.setViewport({ width: 1280, height: 720 });
    await page.evaluate(() => document.body.style.background = 'transparent');
    await page.waitForSelector(`#${elementId}`)
    const content = await page.$(`#${elementId}`);
    
    if (options.delay) await delay(options.delay);

    const imageBuffer = await content.screenshot({ encoding: "base64", omitBackground: true });
    await page?.close();
    await browser?.close();
    return imageBuffer;

};

module.exports = takeImage;