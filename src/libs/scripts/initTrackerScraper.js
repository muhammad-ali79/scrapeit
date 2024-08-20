import puppeteer from "puppeteer";

const initScraper = async function (url) {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });

  const selectors = {
    container: "#dp-container",
    price: ".a-offscreen",
    title: "#productTitle",
    image: ".imgTagWrapper > img",
  };

  try {
    const data = await page.$eval(
      selectors.container,
      (container, selectors) => {
        const title = container
          .querySelector(selectors.title)
          .textContent.trim();
        const price = container
          .querySelector(selectors.price)
          .textContent.trim()
          .split("$")[1];
        const image =
          container.querySelector(selectors.image).getAttribute("src") ?? "";

        return {
          title,
          price: parseInt(price),
          image,
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

export default initScraper;
