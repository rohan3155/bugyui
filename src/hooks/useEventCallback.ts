import { useCallback, useRef } from "react";
export function useEventCallback<T extends (...args: any[]) => any>(fn: T): T {
	const ref = useRef<T>(fn);
	ref.current = fn;
	return useCallback((...args: Parameters<T>) => ref.current(...args), []) as T;
}
