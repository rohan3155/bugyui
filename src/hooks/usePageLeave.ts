import { useEffect } from "react";

export const usePageLeave = (callback: () => void) => {
	useEffect(() => {
		const handleBeforeUnload = (e: BeforeUnloadEvent) => {
			e.preventDefault();
			e.returnValue = ""; 
		};

		const handleVisibilityChange = () => {
			if (document.visibilityState === "hidden") {
				callback();
			}
		};

		window.addEventListener("beforeunload", handleBeforeUnload);
		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, [callback]);
};
