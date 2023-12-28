import { tokenURL } from "../data";

export class SpotifyAuth {
  private clientId: string;
  private clientSecret: string;
  private _token: string;

  constructor({ clientId, clientSecret }) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  async getNewToken() {
    try {
      this.fetchToken();
    } catch (err) {
      console.log(err);
    }
  }

  private async fetchToken() {
    const response = await fetch(tokenURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: this.createFormBody(),
    });
    const data = await response.json();
    this._token = `${data.token_type} ${data.access_token}`;
  }

  private createFormBody() {
    const formData = {
      grant_type: "client_credentials",
      client_id: this.clientId,
      client_secret: this.clientSecret,
    };

    const searchParams = new URLSearchParams();

    Object.entries(formData).forEach(([key, value]) => {
      searchParams.append(key, value);
    });

    return searchParams.toString();
  }

  public get token(): string {
    return this._token;
  }
}
