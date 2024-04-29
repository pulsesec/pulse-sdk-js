import axios, { AxiosInstance } from "axios";
import { PulseError, errors } from "./error";
import { APIClassifyPayload, APIClassifyResponse } from "./types";

export class Pulse {
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

	public async classify(token: string, signal?: axios.GenericAbortSignal): Promise<boolean> {
		const payload: APIClassifyPayload = {
			token,
			siteKey: this.siteKey,
			secretKey: this.secretKey,
		};

		const response = await this.http.post("/api/classify", payload, {
			headers: { "Content-Type": "application/json" },
			signal,
		});

		const data = response.data as APIClassifyResponse | undefined;
		if (!data) {
			throw new PulseError({ code: "UNKNOWN", error: "No data returned" });
		}

		if ("errors" in data) {
			const error = data.errors[0];
			if (!error) {
				throw new PulseError({ code: "UNKNOWN", error: "Error not provided" });
			}

			const errorClass = errors[error.code];
			if (errorClass) {
				throw new errorClass(error);
			}

			throw new PulseError(error);
		}

		return data.isBot;
	}
}
