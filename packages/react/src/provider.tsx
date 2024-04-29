import React, { ReactNode, useRef, createContext, useEffect, useState } from "react";

type PulseCallback = (token: string) => void;

type PulseWindow = Window & { onpulseload: () => void; onpulse: (cb: PulseCallback) => void };

export type Context = {
	onpulse?: (cb: PulseCallback) => void;
};

export const PulseContext = createContext<Context>({
	onpulse: () => {
		throw Error("onPulse was called before the PulseProvider was initialized");
	},
});

type Props = {
	children: ReactNode;
	siteKey: string;
	origin?: string;
};

export function PulseProvider({ children, siteKey, origin = "https://cdn.pulsesecurity.org" }: Props) {
	const [pulseFn, setPulseFn] = useState<((cb: PulseCallback) => void) | undefined>(undefined);
	const scriptRef = useRef<HTMLScriptElement | null>(null);

	useEffect(() => {
		const win = window as any as PulseWindow;
		win.onpulseload = () => {
			setPulseFn(() => win.onpulse);
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
	}, [setPulseFn]);

	const context: Context = {
		onpulse: pulseFn,
	};

	return <PulseContext.Provider value={context}>{children}</PulseContext.Provider>;
}
