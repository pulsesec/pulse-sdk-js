import axios, { AxiosInstance } from "axios";
import { APIError, APIResponse, errors } from "./error";

export class PulseAPI {
  private http: AxiosInstance;
  private siteKey: string;
  private secretKey: string;

  constructor(siteKey: string, secretKey: string) {
    this.http = axios.create({
      baseURL: "https://www.pulsesecurity.org",
    });

    this.siteKey = siteKey;
    this.secretKey = secretKey;
  }

  public async classify(token: string): Promise<boolean> {
    const payload: APIClassifyPayload = {
      token,
      siteKey: this.siteKey,
      secretKey: this.secretKey,
    };

    const response = await this.http.post("/api/classify", payload, {
      headers: { "Content-Type": "application/json" },
    });

    const data = response.data as APIClassifyResponse;
    if ("errors" in data) {
      const error = data.errors[0];
      if (!error) {
        throw new APIError({ code: "UNKNOWN", error: "Error not provided" });
      }

      const errorClass = errors[error.code];
      if (errorClass) {
        throw new errorClass(error);
      }

      throw new APIError(error);
    }

    return data.isBot;
  }
}

type APIClassifyPayload = {
  token: string;
  siteKey: string;
  secretKey: string;
};

type APIClassifyResponse = APIResponse<{
  isBot: boolean;
}>;

export { APIError, TokenNotFoundError, TokenUsedError } from "./error";
