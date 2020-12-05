const puppeteerExtra = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const axios = require("axios");
const imageFinderFunction = require("./imageFinderFunction");

const getMainImage = async (parsedURL, shortenedURL, baseURL) => {
  return await axios
    .get(shortenedURL)
    .then(async (res) => {
      return imageFinderFunction(res.data, parsedURL, shortenedURL, baseURL);
    })
    .catch(async (error) => {
      if (error) {
        puppeteerExtra.use(StealthPlugin());

        let mainImage;

        await puppeteerExtra
          .launch({
            headless: true,
            args: ["--disable-features=site-per-process"],
            ignoreDefaultArgs: ["--enable-automation", "--disable-extensions"],
          })
          .then(async (browser) => {
            const page = await browser.newPage();
            await page.setDefaultNavigationTimeout(0);
            await page.goto(shortenedURL);
            await page.waitFor(5000);

            const html = await page.content();

            await browser.close();

            const returnedMainImage = await imageFinderFunction(
              html,
              parsedURL,
              shortenedURL,
              baseURL
            );

            mainImage = returnedMainImage;
          });
        return mainImage;
      }
    });
};

module.exports = getMainImage;
