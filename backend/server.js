//Include other audio features from Spotify API
//Scrap for streams
//Return data in 1 file.
//Make a frontend that let's you upload a file/
//Get the access token on invalid token error

import * as puppeteer from "puppeteer";
import * as fs from "fs";
import * as readline from "readline";
import { getToken } from "./authorization.js";
import { clientId, clientSecret } from "./data.js";
import { fetchSpotify } from "./utils/fetchSpotify.js";
import { fetchSearch } from "./utils/fetchSearch.js";
import { processFile } from "./utils/processFile.js";

const INPUT_FILE_PATH = "./inputs/5.csv";
const OUTPUT_FILE_PATH = "./output.csv";
const writeFS = fs.createWriteStream(OUTPUT_FILE_PATH, { encoding: "utf-8" });

const startServer = async () => {
  const authStr = await getToken(clientId, clientSecret);
  console.log(authStr);

  const queue = await processFile(INPUT_FILE_PATH);
  let queue2 = [];
  while (queue.length) {
    const { title, artist } = queue.shift();
    queue2.push(await fetchSpotify({ title, artist, authStr }, fetchSearch));
  }
  while (queue2.length) {
    let tracks = queue2.slice(0, 100).join(",");
    console.log(tracks);
    //fetch audio features

    queue2 = queue2.slice(100);
  }

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
