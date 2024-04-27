import { APIErrorData } from "./types";

export class APIError extends Error {
	public code: string;
	constructor(data: APIErrorData) {
		super(data.error);
		this.code = data.code;
	}
}

export class TokenNotFoundError extends APIError {}

export class TokenUsedError extends APIError {}

export class TokenExpiredError extends APIError {}

export const errors: Record<string, new (data: APIErrorData) => APIError> = {
	TOKEN_NOT_FOUND: TokenNotFoundError,
	TOKEN_USED: TokenUsedError,
	TOKEN_EXPIRED: TokenExpiredError,
};
