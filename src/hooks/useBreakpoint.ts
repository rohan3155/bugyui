import { useEffect, useState } from "react";

const breakpoints = {
	xs: 0,
	sm: 576,
	md: 768,
	lg: 992,
	xl: 1200,
	xxl: 1600,
};

export const useBreakpoint = () => {
	const [breakpoint, setBreakpoint] = useState<keyof typeof breakpoints>("xs");

	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;
			const bp =
				(Object.entries(breakpoints) as [keyof typeof breakpoints, number][])
					.reverse()
					.find(([_, size]) => width >= size)?.[0] || "xs";
			setBreakpoint(bp);
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return breakpoint;
};
