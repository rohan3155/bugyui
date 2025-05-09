import { useState, useEffect } from "react";

export default function useWindowSize() {
	const [windowSize, setWindowSize] = useState<{
		width: number | undefined;
		height: number | undefined;
	}>({
		width: undefined,
		height: undefined,
	});

	function changeWindowSize() {
		setWindowSize({ width: window.innerWidth, height: window.innerHeight });
	}

	useEffect(() => {
		window.addEventListener("resize", changeWindowSize);
		changeWindowSize();
		return () => {
			window.removeEventListener("resize", changeWindowSize);
		};
	}, []);

	return windowSize;
}
