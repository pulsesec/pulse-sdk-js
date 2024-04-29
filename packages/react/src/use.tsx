import { useContext } from "react";
import { PulseContext } from "./provider";

export const usePulse = () => {
	const context = useContext(PulseContext);
	if (!context) {
		throw new Error("usePulse must be used within a PulseProvider");
	}

	return context.token;
};
