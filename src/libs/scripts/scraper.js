"use server";

import puppeteer from "puppeteer";

const scraper = async function (url) {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });

  const selectors = {
    container: "#dp-container",
    price: ".a-offscreen",
  };

  try {
    const data = await page.$eval(
      selectors.container,
      (container, selectors) => {
        const price = container
          .querySelector(selectors.price)
          .textContent.trim()
          .split("$")[1];

        return {
          price: parseInt(price),
        };
      },
      selectors,
    );

    return data;
  } catch (error) {
    console.error(error);
  } finally {
    await browser.close();
  }
};

export default scraper;
