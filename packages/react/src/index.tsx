import React from "react";

type PulseCallback = (token: string) => void;

declare global {
	interface Window {
		onpulse(cb: PulseCallback): void;
	}
}

type Props = {
	siteKey: string;
	origin?: string;
};

export function PulseScript({ siteKey, origin = "https://cdn.pulsesecurity.org" }: Props) {
	return <script src={`${origin}/script/pulse.js`} data-sitekey={siteKey} async />;
}

export function usePulse(): string | null {
	const [token, setToken] = React.useState<string | null>(null);

	React.useEffect(() => {
		window.onpulse((token) => {
			setToken(token);
		});
	}, [setToken]);

	return token;
}
