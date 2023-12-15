const BASE_DELAY = 5000;
const MAX_RETRIES = 5;

export const fetchURL = async (
  title,
  artist,
  authStr,
  writeFS,
  tryCount = 0
) => {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        title
      )}&artist=${encodeURIComponent(artist)}&type=track`,
      {
        headers: {
          Authorization: authStr,
        },
      }
    );
    if (response.status === 429) throw new Error("Too many requests");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    if (data.tracks.items) {
      const {
        external_urls: { spotify: spotifyURL },
        id,
      } = data.tracks.items[0];

      const audioFeatures = await fetch(
        `https://api.spotify.com/v1/artists/${id}`
      );

      writeFS.write(`${title}, ${spotifyURL}\n`);
    } else {
      throw new Error("No tracks found");
    }
  } catch (error) {
    console.error("Error:", error.message);

    if (error.message === "Too many requests" && tryCount < MAX_RETRIES) {
      let delay = BASE_DELAY * Math.pow(BASE_DELAY, tryCount);
      setTimeout(delay, async () => {
        console.log("Retrying...");
        await fetchURL(title, artist, authStr, writeFS, tryCount + 1);
      });
    }
  }
};
