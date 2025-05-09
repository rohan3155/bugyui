import { useEffect, useState } from "react";

export function useOnlineStatus(): boolean {
	const [online, setOnline] = useState(navigator.onLine);
	useEffect(() => {
		const updateOnline = () => setOnline(navigator.onLine);
		window.addEventListener("online", updateOnline);
		window.addEventListener("offline", updateOnline);
		return () => {
			window.removeEventListener("online", updateOnline);
			window.removeEventListener("offline", updateOnline);
		};
	}, []);
	return online;
}
