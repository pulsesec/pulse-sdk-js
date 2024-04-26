import { PulseAPI, TokenNotFoundError, TokenUsedError } from "@pulsesec/api";
import type { APIClassifyResponse } from "@pulsesec/api/types";
import mockAxios, { HttpResponse } from "jest-mock-axios";

const testSiteKey = "siteKey";
const testSiteSecret = "siteSecret";
const testToken = "token";

describe("API", () => {
	it("should classify human", async () => {
		const api = new PulseAPI(testSiteKey, testSiteSecret);
		const result = api.classify(testToken);

		const response: HttpResponse = {
			data: <APIClassifyResponse>{
				isBot: false,
			},
		};
		mockAxios.mockResponseFor({ url: "/api/classify" }, response);

		expect(await result).toBe(false);
	});

	it("should classify bot", async () => {
		const api = new PulseAPI(testSiteKey, testSiteSecret);
		const result = api.classify(testToken);

		const response: HttpResponse = {
			data: <APIClassifyResponse>{
				isBot: true,
			},
		};
		mockAxios.mockResponseFor({ url: "/api/classify" }, response);

		expect(await result).toBe(true);
	});

	it("should handle unknown token", async () => {
		const api = new PulseAPI(testSiteKey, testSiteSecret);
		const result = api.classify(testToken);

		const response: HttpResponse = {
			data: <APIClassifyResponse>{
				errors: [
					{
						code: "TOKEN_NOT_FOUND",
						error: "Token not found",
					},
				],
			},
		};
		mockAxios.mockResponseFor({ url: "/api/classify" }, response);

		try {
			await result;
			expect("Error must be thrown").toBe(false);
		} catch (error) {
			expect(error instanceof TokenNotFoundError).toBe(true);
		}
	});

	it("should handle used token", async () => {
		const api = new PulseAPI(testSiteKey, testSiteSecret);
		const result = api.classify(testToken);

		const response: HttpResponse = {
			data: <APIClassifyResponse>{
				errors: [
					{
						code: "TOKEN_USED",
						error: "Token used",
					},
				],
			},
		};
		mockAxios.mockResponseFor({ url: "/api/classify" }, response);

		try {
			await result;
			expect("Error must be thrown").toBe(false);
		} catch (error) {
			expect(error instanceof TokenUsedError).toBe(true);
		}
	});
});
