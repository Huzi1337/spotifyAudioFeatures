import express from "express";

type SongQuery = { artist: string; title: string };

type AudioFeatures = {
  acousticness?: number;
  danceability?: number;
  duration_ms?: number;
  energy?: number;
  instrumentalness?: number;
  liveness?: number;
  loudness?: number;
  mode?: number;
  speechiness?: number;
  tempo?: number;
  time_signature?: number;
  valence?: number;
  key?: number;
};

type UserQuery = {
  songList: SongQuery[];
  audioFeatures: AudioFeatures;
};

export const startServer = async () => {
  const PORT = 3000;
  const app = express();

  app.post("/api/v1/upload", async (req, res) => {
    try {
      res.statusCode = 200;
      res.send("Response ok.");
    } catch (err) {
      res.statusCode = 404;
      res.send("Bad request");
    }
  });

  const server = app.listen(PORT, () =>
    console.log(`Server is running on port ${PORT}`)
  );

  const closeServer = () => {
    server.close();
    console.log("Server closing");
  };

  return [app, closeServer];
};
