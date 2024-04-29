# Pulse Security - React SDK

## Installation

```sh
$ npm i @pulsesec/react
```

## Example

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
	/* .. */

	const token = usePulse();
	useEffect(() => {
		if (!token) {
			return;
		}

		action(token).then(setResult);
	}, [token]);

	/* .. */
}
```
