import { startServer } from "./index";
import { Express } from "express";
import request from "supertest";

const UPLOAD_PATH = "/api/v1/upload";

describe("File Upload Endpoint", () => {
  let app: Express;
  let closeServer: () => void;
  beforeAll(async () => {
    [app, closeServer] = (await startServer()) as [Express, () => void];
  });

  it("Server sends a positive response on POST", async () => {
    try {
      const response = await request(app).post(UPLOAD_PATH);
      expect(response.status).toBe(200);
    } catch (err) {
      console.log(err);
      throw err;
    }
  });

  afterAll(() => {
    closeServer();
  });
});
