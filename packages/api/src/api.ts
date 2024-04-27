import axios, { AxiosInstance } from "axios";
import { APIError, errors } from "./error";
import { APIClassifyPayload, APIClassifyResponse } from "./types";

export class PulseAPI {
	private http: AxiosInstance;
	private siteKey: string;
	private secretKey: string;

	constructor(siteKey: string, secretKey: string) {
		this.http = axios.create({
			baseURL: "https://api.pulsesecurity.org",
			validateStatus: null,
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

		const data = response.data as APIClassifyResponse | undefined;
		if (!data) {
			throw new APIError({ code: "UNKNOWN", error: "No data returned" });
		}

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
