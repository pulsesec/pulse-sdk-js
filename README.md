<h1 align="center"><a href="https://www.pulsesecurity.org/">Pulse Security</a></h1>
<p align="center">
<img src="https://avatars.githubusercontent.com/u/161549711?s=200&v=4"/>
</p>
<h1 align="center">JavaScript SDK</h1>

## Installation

```sh
$ npm i @pulsesec/react @pulsesec/api
```

## Provider Setup

```tsx
import { PulseProvider } from "@pulsesec/react";

export function App() {
	return (
		<PulseProvider siteKey={process.env.PULSE_SITE_KEY}>
			<YourApp />
		</PulseProvider>
	);
}
```

## Token Hook

```ts
import { usePulse } from "@pulsesec/react";

function YourComponent() {
	const token = usePulse();
	useEffect(() => {
		if (!token) {
			return;
		}

		protectedAction(token).then(setResult);
	}, [token]);
}
```

## Verification

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
