type PulseCallback = (token: string) => void;
type PulseExecuteFn = (cb: PulseCallback) => void;
type PulseOnLoadFn = (execute: PulseExecuteFn) => void;

type PulseWindow = Window & { onpulseload?: PulseOnLoadFn };

function createLoader(): Promise<PulseExecuteFn> {
	const win = window as PulseWindow;
	return new Promise((res) => {
		win.onpulseload = res;
	});
}

let onLoad: Promise<PulseExecuteFn> | undefined;

export function Initialize(siteKey: string, origin: string = "https://cdn.pulsesecurity.org") {
	if (onLoad || !global.window) {
		return;
	}
	onLoad = createLoader();

	const script = document.createElement("script");
	script.src = `${origin}/script/pulse.js`;
	script.setAttribute("data-sitekey", siteKey);
	script.async = true;
	document.head.appendChild(script);
}

export async function Execute(): Promise<string> {
	if (!onLoad) {
		throw new Error("Pulse was not initialized with Initialize before calling Execute");
	}

	const execute = await onLoad;
	return new Promise((res) => {
		execute(res);
	});
}
