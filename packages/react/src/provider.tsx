import React, { ReactNode, useRef, createContext, useEffect, useState } from "react";

type PulseCallback = (token: string) => void;
type PulseWindow = Window & { onpulseload: () => void; onpulse: (cb: PulseCallback) => void };

export type Context = {
	token: string | null;
};

export const PulseContext = createContext<Context | undefined>(undefined);

type Props = {
	children: ReactNode;
	siteKey: string;
	origin?: string;
};

export function PulseProvider({ children, siteKey, origin = "https://cdn.pulsesecurity.org" }: Props) {
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

	const context: Context = {
		token: token,
	};

	return <PulseContext.Provider value={context}>{children}</PulseContext.Provider>;
}
