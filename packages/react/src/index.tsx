type PulseCallback = (token: string) => void;

declare global {
	interface Window {
		onpulse(cb: PulseCallback): void;
	}
}

function preamble() {
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
}

if (typeof window !== "undefined") {
	preamble();
}

export { PulseScript } from "./PulseScript";
