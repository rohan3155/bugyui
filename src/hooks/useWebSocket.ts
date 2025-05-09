import { useEffect, useState } from "react";

export function useWebSocket(url: string) {
	const [messages, setMessages] = useState<string[]>([]);

	useEffect(() => {
		const socket = new WebSocket(url);
		socket.onmessage = (e) => setMessages((prev) => [...prev, e.data]);
		return () => socket.close();
	}, [url]);

	return messages;
}
