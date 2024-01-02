import { tokenURL, clientId, clientSecret } from "../data.js";

export class SpotifyAuth {
  private static instance: SpotifyAuth | null = null;
  private clientId: string;
  private clientSecret: string;
  private _token: string | null;

  static async getInstance() {
    if (!this.instance) {
      this.instance = new SpotifyAuth();
      await this.instance.getNewToken();
    }
    return this.instance;
  }

  static destroyInstance() {
    this.instance = null;
  }

  private constructor() {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this._token = null;
  }

  async getNewToken() {
    try {
      await this.fetchToken();
    } catch (err) {
      console.log(`At getNewToken: ${err}`);
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

  public get token(): string | null {
    return this._token;
  }
}
