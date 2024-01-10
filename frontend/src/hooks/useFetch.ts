import { useState } from "react";

function useFetch<T>() {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  console.log(data);
  async function fetchData(url: string, options?: RequestInit) {
    try {
      console.log(options);
      console.log("running fetch data");
      setIsLoading(true);
      let response = await fetch(url, options);
      console.log("response", response);

      setData(await response.json());
    } catch (e) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return { error, isLoading, fetchData, data };
}

export default useFetch;

// async function submitHandler() {
//   const songs: SongQuery[] = [];
//   for (const arr of text.split("\n")) {
//     const [title, artist] = arr.split(";");
//     songs.push({ title, artist });
//   }

//   const query: UserQuery = { songs, includedAudioFeatures };
//   console.log(query);
//   const response = await fetch("http://localhost:3000/api/v1/audioFeatures", {
//     method: "POST",
//     body: JSON.stringify(query),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   let data = await response.json();
//   setRes(data.CSV);
// }
