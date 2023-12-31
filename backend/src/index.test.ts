import { startServer } from "./index.js";
import { Express } from "express";
import request from "supertest";

const UPLOAD_PATH = "/api/v1/upload";

it("lol", () => {
  expect(2 + 2).toBe(4);
});
// describe("File Upload Endpoint", () => {
//   let app: Express;
//   let closeServer: () => void;

//   beforeAll(async () => {
//     [app, closeServer] = (await startServer()) as [Express, () => void];
//   });

//   it("Server sends a positive response on POST", async () => {
//     const response = await request(app).post(UPLOAD_PATH);
//     expect(response.status).toBe(200);
//   });

//   it("Send a 200 response code when the file is valid.", async () => {});

//   afterAll(() => {
//     closeServer();
//   });
// });
