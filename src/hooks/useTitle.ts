import { useEffect } from "react";

export function useTitle(title: string): void {
	useEffect(() => {
		const original = document.title;
		document.title = title;
		return () => {
			document.title = original;
		};
	}, [title]);
}
