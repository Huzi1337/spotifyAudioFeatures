export const fetchTrackData = async (req, res, next) => {
  try {
    //Fetch the
    res.send("Response ok.");
  } catch (err) {
    res.statusCode = 404;
    res.send("Bad request");
  }
};
