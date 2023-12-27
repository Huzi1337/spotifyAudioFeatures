import * as fs from "fs";
import * as readline from "readline";

export const processFile = (filePath) => {
  return new Promise((resolve, reject) => {
    const readFS = fs.createReadStream(filePath, { encoding: "utf-8" });
    const queue = [];

    const readLine = readline.createInterface({ input: readFS });
    readLine.on("line", async (line) => {
      const [title, artist] = line.split(";");
      queue.push({ title, artist });
    });

    readLine.on("close", resolve(queue));
    readLine.on("error", (err) => reject(err));
  });
};
