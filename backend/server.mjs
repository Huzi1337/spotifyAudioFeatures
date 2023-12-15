//Include other audio features from Spotify API
//Scrap for streams
//Return data in 1 file.
//Make a frontend that let's you upload a file/
//Get the access token on invalid token error

import * as puppeteer from "puppeteer";
import * as fs from "fs";
import * as readline from "readline";
import { getToken } from "./authorization.mjs";
import { clientId, clientSecret } from "./data.mjs";
import { fetchURL } from "./utils/fetchURL.mjs";

const INPUT_FILE_PATH = "./inputs/1.csv";
const OUTPUT_FILE_PATH = "./output.csv";
const readFS = fs.createReadStream(INPUT_FILE_PATH, { encoding: "utf-8" });
const writeFS = fs.createWriteStream(OUTPUT_FILE_PATH, { encoding: "utf-8" });

const startServer = async () => {
  const authStr = await getToken(clientId, clientSecret);
  console.log(authStr);

  const queue = [];

  const readLine = readline.createInterface({ input: readFS });
  readLine.on("line", async (line) => {
    const [title, artist] = line.split(";");
    queue.push({ title, artist });
  });

  readLine.on("close", async () => {
    while (queue.length) {
      const { title, artist } = queue.shift();
      await fetchURL(title, artist, authStr, writeFS);
    }
  });
  writeFS.on("finish", () => {
    console.log(queue);
  });

  writeFS.on("error", (err) => {
    console.error("Error writing to file:", err);
  });
};

await startServer();

// (async () => {
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();
//   await page.goto("https://open.spotify.com/track/27NovPIUIRrOZoCHxABJwK");
//   await page.waitForSelector('[data-testid="playcount"]');

//   const data = await page.evaluate(() => {
//     const playCount = document.querySelectorAll(
//       ".Type__TypeElement-sc-goli3j-0"
//     );
//     console.log(document.querySelector('[data-testid="playcount"]'));
//     return document.querySelector('[data-testid="playcount"]').textContent;
//   });
//   console.log(data);
// })();
