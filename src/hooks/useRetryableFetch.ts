import { useEffect, useState } from "react";

export function useRetryableFetch(
	url: string,
	options?: RequestInit,
	retries = 3
) {
	const [data, setData] = useState<any>(null);
	const [error, setError] = useState<any>(null);

	useEffect(() => {
		let attempt = 0;
		const fetchData = async () => {
			while (attempt < retries) {
				try {
					const res = await fetch(url, options);
					const json = await res.json();
					setData(json);
					return;
				} catch (err) {
					attempt++;
					if (attempt >= retries) setError(err);
				}
			}
		};
		fetchData();
	}, [url, options, retries]);

	return { data, error };
}
