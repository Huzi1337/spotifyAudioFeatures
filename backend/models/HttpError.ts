export default class HttpError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    console.log("New error", message, status);
  }
}

export enum ErrorCodes {
  TOO_MANY_REQUESTS = 429,
  BAD_TOKEN = 401,
}
