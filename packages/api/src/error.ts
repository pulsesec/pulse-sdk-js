import { APIErrorData } from "./types";

export class PulseError extends Error {
	public code: string;
	constructor(data: APIErrorData) {
		super(data.error);
		this.code = data.code;
	}
}

export class TokenNotFoundError extends PulseError {}

export class TokenUsedError extends PulseError {}

export class TokenExpiredError extends PulseError {}

export const errors: Record<string, new (data: APIErrorData) => PulseError> = {
	TOKEN_NOT_FOUND: TokenNotFoundError,
	TOKEN_USED: TokenUsedError,
	TOKEN_EXPIRED: TokenExpiredError,
};
