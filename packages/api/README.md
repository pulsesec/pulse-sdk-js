# Pulse Security - JS API SDK

## Installation

```sh
$ npm i @pulsesec/api
```

## Example

```ts
import { Pulse, TokenNotFoundError, TokenUsedError, TokenExpiredError } from "@pulsesec/api";

const pulse = new Pulse(process.env.PULSE_SITE_KEY, process.env.PULSE_SECRET_KEY);

async function classify(token: string): bool {
	try {
		const isBot = await pulse.classify(token);
		return isBot;
	} catch (err) {
		if (err instanceof TokenNotFoundError) {
			throw new Error("Token not found");
		}

		if (err instanceof TokenUsedError) {
			throw new Error("Token already used");
		}

		if (err instanceof TokenExpiredError) {
			throw new Error("Token expired");
		}

		throw err;
	}
}
```
