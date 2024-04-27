import React from "react";

type Props = {
	siteKey: string;
	origin?: string;
};

export function PulseScript({ siteKey, origin = "https://cdn.pulsesecurity.org" }: Props) {
	return <script src={`${origin}/script/pulse.js`} data-sitekey={siteKey} async />;
}
