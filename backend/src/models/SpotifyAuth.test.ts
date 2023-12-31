global.fetch = jest.fn().mockResolvedValue("Ass");

describe("SpotifyAuth test", () => {
  it("Ass", async () => {
    fetch("google.com");
    await testingf();
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

async function testingf() {
  let data = await fetch("google");
  return data;
}
