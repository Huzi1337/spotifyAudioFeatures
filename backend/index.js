import express from "express";
import multer from "multer";
import * as fs from "fs";
import * as readline from "readline";

//file post check

export const app = express();

const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), async (req, res) => {
  console.log(req.file);
  console.log(req.body);
  const readFS = fs.createReadStream(req.file.path, { encoding: "utf-8" });
  const readLine = readline.createInterface({ input: readFS });
  readLine.on("line", (line) => console.log(line));
  readLine.on("close", () => console.log("____________\n"));
  fs.unlink(req.file.path);
  res.send("Elo");
});

const PORT = 3000;

const server = app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`)
);

export const closeServer = () => {
  server.close();
};
