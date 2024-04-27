import { Pulse, TokenNotFoundError, TokenUsedError, TokenExpiredError } from "@pulsesec/api";
import mockAxios, { HttpResponse } from "jest-mock-axios";

const testSiteKey = "siteKey";
const testSiteSecret = "siteSecret";
const testToken = "token";

describe("API", () => {
	it("should classify bot", async () => {
		const api = new Pulse(testSiteKey, testSiteSecret);
		const result = api.classify(testToken);

		const response: HttpResponse = {
			data: {
				isBot: true,
			},
		};
		mockAxios.mockResponseFor({ url: "/api/classify" }, response);

		expect(await result).toBe(true);
	});

	it("should handle errors", async () => {
		const tests = [
			["TOKEN_NOT_FOUND", TokenNotFoundError],
			["TOKEN_USED", TokenUsedError],
			["TOKEN_EXPIRED", TokenExpiredError],
		] as const;

		for (const test of tests) {
			const [errorCode, errorClass] = test;

			const api = new Pulse(testSiteKey, testSiteSecret);
			const result = api.classify(testToken);

			const response: HttpResponse = {
				data: {
					errors: [
						{
							code: errorCode,
							error: "Test error message",
						},
					],
				},
			};
			mockAxios.mockResponseFor({ url: "/api/classify" }, response);

			try {
				await result;
				expect("Error must be thrown").toBe(false);
			} catch (error) {
				if (error instanceof errorClass) {
					expect(error.code).toBe(errorCode);
					continue;
				}

				expect("Unexpected error").toBe(false);
			}
		}
	});
});
