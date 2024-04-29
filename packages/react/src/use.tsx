import { useContext, useEffect, useState } from "react";
import { PulseContext } from "./provider";

export const usePulse = () => {
	const context = useContext(PulseContext);
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		context.onpulse?.((token) => {
			setToken(token);
		});
	}, [setToken, context.onpulse]);

	return token;
};
