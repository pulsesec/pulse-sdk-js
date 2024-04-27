"use client";
import React, { useEffect } from "react";

type Props = {
	siteKey: string;
	origin?: string;
};

export function PulseScript({ siteKey, origin = "https://cdn.pulsesecurity.org" }: Props) {
	useEffect(() => {
		let token: string | undefined;
		let callback: PulseCallback | undefined;
		window.onpulse =
			window.onpulse ||
			function (arg) {
				if (typeof arg === "string") {
					token = arg;
					callback && callback(token);
					return;
				}
				if (token) {
					arg(token);
					return;
				}
				callback = arg;
			};
	}, []);

	return <script src={`${origin}/script/pulse.js`} data-sitekey={siteKey} async />;
}

type PulseCallback = (token: string) => void;

declare global {
	interface Window {
		onpulse(cb: PulseCallback): void;
	}
}
