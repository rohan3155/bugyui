import { useMemo, useRef } from "react";
export function useMemoCompare<T>(
	next: T,
	compare: (prev: T | undefined, next: T) => boolean
): T {
	const previous = useRef<T>(next);
	const current = useRef<T>(next);
	if (!compare(previous.current, next)) {
		current.current = next;
	}
	previous.current = next;
	return useMemo(() => current.current, [current.current]);
}
