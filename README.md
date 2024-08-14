<h1 align="center"><a href="https://www.pulsesecurity.org/">Pulse Security</a></h1>
<p align="center">
<img src="https://avatars.githubusercontent.com/u/161549711?s=200&v=4"/>
</p>
<h1 align="center">JavaScript SDK</h1>

## Installation

```sh
$ npm i @pulsesec/client @pulsesec/api
```

## Client-Side

```ts
import pulse from "@pulsesec/client";

// Initialize for your whole app (not recommended)
pulse.Initialize(process.env.PULSE_SITE_KEY);

function pageWithProtectedEndpoint() {
	// OR initialize whenever needed (recommended)
	pulse.Initialize(process.env.PULSE_SITE_KEY);

	async function protectedRequest() {
		const token = await pulse.Execute();
		// include token in your request
	}
}
```

## Backend Verification

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
