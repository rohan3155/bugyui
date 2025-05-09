import { useEffect, useRef } from "react";

export const useTimeout = (callback: () => void, delay: number) => {
	const savedCallback = useRef<() => void>(callback);
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);
	useEffect(() => {
		const tick = () => savedCallback.current?.();
		if (delay !== null) {
			const id = setTimeout(tick, delay);
			return () => clearTimeout(id);
		}
	}, [delay]);
};
