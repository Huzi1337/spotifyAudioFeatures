import express from "express";
import "dotenv/config";
import audioFeatureRoutes from "./dist/src/routes/audioFeatures.js";
import ServerlessHttp from "serverless-http";
import cors from "cors";
export const startServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use("/api/v1/audioFeatures", audioFeatureRoutes);
  return app;
};
console.log("loo");
export const handler = ServerlessHttp(startServer());
//# sourceMappingURL=server.js.map
