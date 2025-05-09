import { useState } from "react";

export function useSessionStorage<T>(
	key: string,
	initialValue: T
): [T, (val: T) => void] {
	const [storedValue, setStoredValue] = useState<T>(() => {
		try {
			const item = sessionStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch {
			return initialValue;
		}
	});
	const setValue = (value: T) => {
		setStoredValue(value);
		sessionStorage.setItem(key, JSON.stringify(value));
	};
	return [storedValue, setValue];
}
