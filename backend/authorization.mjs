export const getToken = async (id, secret) => {
  try {
    const formData = {
      grant_type: "client_credentials",
      client_id: id,
      client_secret: secret,
    };
    const searchParams = new URLSearchParams();
    Object.entries(formData).forEach(([key, value]) => {
      searchParams.append(key, value);
    });

    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: searchParams.toString(),
    });
    const data = await res.json();
    console.log(data);

    let authString = `${data.token_type} ${data.access_token}`;
    console.log(authString);
    return authString;
  } catch (err) {
    console.log(err);
  }
};
