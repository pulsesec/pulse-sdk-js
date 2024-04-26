export type APIErrorData = {
	error: string;
	code: string;
};

export type APIErrorResponse = {
	errors: APIErrorData[];
};

export type APIResponse<T> = T | APIErrorResponse;

export type APIClassifyPayload = {
	token: string;
	siteKey: string;
	secretKey: string;
};

export type APIClassifyResponse = APIResponse<{
	isBot: boolean;
}>;
