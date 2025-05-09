import { useEffect, useState } from "react";

export function usePrefersColorScheme(): "light" | "dark" {
	const getScheme = () =>
		window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light";
	const [scheme, setScheme] = useState<"light" | "dark">(getScheme);
	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const handler = () => setScheme(getScheme());
		mediaQuery.addEventListener("change", handler);
		return () => mediaQuery.removeEventListener("change", handler);
	}, []);
	return scheme;
}
