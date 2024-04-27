# Pulse Security - JS API SDK

## Installation

```sh
$ npm i @pulsesec/api
```

## Example

```ts
import { PulseAPI, TokenNotFoundError, TokenUsedError, TokenExpiredError } from "@pulsesec/api";

const client = new PulseAPI(process.env.PULSE_SITE_KEY, process.env.PULSE_SECRET_KEY);

async function classify(token: string): bool {
	try {
		const isBot = await client.classify(token);
		console.log("Is token a bot?", isBot);
	} catch (err) {
		if (err instanceof TokenNotFoundError) {
			console.log("Token not found");
			return;
		}

		if (err instanceof TokenUsedError) {
			console.log("Token already used");
			return;
		}

		if (err instanceof TokenExpiredError) {
			console.log("Token expired");
			return;
		}

		throw err;
	}
}
```
