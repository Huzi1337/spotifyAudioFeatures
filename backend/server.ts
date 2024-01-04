// // (async () => {
// //   const browser = await puppeteer.launch({ headless: false });
// //   const page = await browser.newPage();
// //   await page.goto("https://open.spotify.com/track/27NovPIUIRrOZoCHxABJwK");
// //   await page.waitForSelector('[data-testid="playcount"]');

// //   const data = await page.evaluate(() => {
// //     const playCount = document.querySelectorAll(
// //       ".Type__TypeElement-sc-goli3j-0"
// //     );
// //     console.log(document.querySelector('[data-testid="playcount"]'));
// //     return document.querySelector('[data-testid="playcount"]').textContent;
// //   });
// //   console.log(data);
// // })();
