import { SongRequest, SongsWithIds } from "../../models/types.js";
import fetchSpotify from "../../utils/fetchSpotify.js";
import getSongIds from "./getSongIds.js";

jest.mock("../../utils/fetchSpotify.js", () => {
  let id = 1,
    title = 1,
    spotifyURL = 1;
  return jest.fn().mockImplementation(() => {
    return {
      id: String(id++),
      title: `title${title++}`,
      spotifyURL: `URL${spotifyURL++}`,
    };
  });
});

let mockNext = jest.fn().mockResolvedValue("Next");

const songs = [
  { title: "song1", artist: "artist1" },
  { title: "song2", artist: "artist2" },
  { title: "song3", artist: "artist3" },
  { title: "song4", artist: "artist4" },
  { title: "song5", artist: "artist5" },
  { title: "song6", artist: "artist6" },
  { title: "song7", artist: "artist7" },
  { title: "song8", artist: "artist8" },
  { title: "song9", artist: "artist9" },
  { title: "song10", artist: "artist10" },
];

describe("getSongsId middleware", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Calls fetchSpotify and adds returned properties to the array element.", async () => {
    let mockRequest: unknown = {
      body: {
        songs,
      },
    };
    let res = {};

    await getSongIds(mockRequest as SongRequest, res as any, mockNext);
    expect(fetchSpotify).toHaveBeenCalledTimes(10);
    const {
      body: { songs: returnedSongs },
    } = mockRequest as SongRequest;
    type CorrectObj = {
      artist: string;
      id: string;
      spotifyURL: string;
      title: string;
    };
    const mockObject: CorrectObj = {
      artist: "artist2",
      id: "2",
      spotifyURL: "URL2",
      title: "title2",
    };
    expect(returnedSongs[1]).toMatchObject(mockObject);
  });
});
