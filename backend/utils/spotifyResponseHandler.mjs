export const spotifyResponseHandler = async (url, authStr) => {
  const response = await fetch(url, {
    headers: {
      Authorization: authStr,
    },
  });

  if (response.status === 429) throw new Error("Too many requests");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
};
