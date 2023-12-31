var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { tokenURL, clientId, clientSecret } from "../data.js";
export class SpotifyAuth {
    static getInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.instance) {
                this.instance = new SpotifyAuth();
                console.log("Created new instance");
                yield this.instance.getNewToken();
            }
            return this.instance;
        });
    }
    constructor() {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this._token = null;
    }
    getNewToken() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.fetchToken();
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    fetchToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(tokenURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: this.createFormBody(),
            });
            const data = yield response.json();
            this._token = `${data.token_type} ${data.access_token}`;
        });
    }
    createFormBody() {
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
    get token() {
        return this._token;
    }
}
SpotifyAuth.instance = null;
function testSpotifyAuth() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield SpotifyAuth.getInstance();
        return response.token;
    });
}
function runTests() {
    return __awaiter(this, void 0, void 0, function* () {
        let token1 = yield testSpotifyAuth();
        let token2 = yield testSpotifyAuth();
        console.log(token1);
        console.log(token2);
        console.log(token1 === token2);
    });
}
runTests();
