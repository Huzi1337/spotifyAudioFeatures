import { app, closeServer } from "..";
import request from "supertest";

describe("File Upload Endpoint", () => {
  it("Should upload a file and be ok", async () => {
    try {
      const filePath = "./uploads/testFile.txt";

      const response = await request(app)
        .post("/upload")
        .attach("file", filePath);
      expect(response.status).toBe(200);
    } catch (error) {
      console.log(error);
    }
  });
  afterAll(() => {
    closeServer();
  });
});

let arr = [];
let arr2 = [2, 3];
arr.concat;
