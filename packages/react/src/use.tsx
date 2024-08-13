import { useEffect, useRef, useState } from "react";

type PulseCallback = (token: string) => void;
type PulseWindow = Window & { onpulseload: () => void; onpulse: (cb: PulseCallback) => void };

const PULSE_CDN_ORIGIN = "https://cdn.pulsesecurity.org";

export const usePulse = (siteKey: string, origin: string = PULSE_CDN_ORIGIN): string | null => {
	const [token, setToken] = useState<string | null>(null);
	const scriptRef = useRef<HTMLScriptElement | null>(null);

	useEffect(() => {
		const win = window as any as PulseWindow;
		win.onpulseload = () => {
			win.onpulse((token: string) => {
				setToken(() => token);
			});
		};

		if (scriptRef.current) {
			return;
		}
		const script = document.createElement("script");
		scriptRef.current = script;
		script.src = `${origin}/script/pulse.js`;
		script.setAttribute("data-sitekey", siteKey);
		script.async = true;

		document.head.appendChild(script);
	}, [setToken]);

	return token;
};
