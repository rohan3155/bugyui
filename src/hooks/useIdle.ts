import { useEffect, useState } from "react";
export function useIdle(timeout = 3000): boolean {
	const [idle, setIdle] = useState(false);
	useEffect(() => {
		let timer = setTimeout(() => setIdle(true), timeout);
		const reset = () => {
			setIdle(false);
			clearTimeout(timer);
			timer = setTimeout(() => setIdle(true), timeout);
		};
		window.addEventListener("mousemove", reset);
		window.addEventListener("keydown", reset);
		return () => {
			window.removeEventListener("mousemove", reset);
			window.removeEventListener("keydown", reset);
			clearTimeout(timer);
		};
	}, [timeout]);
	return idle;
}
