import { useEffect, useState } from "react";

export const useFetch = <T>(url: string) => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(url);
				const data = await response.json();
				setData(data);
			} catch (error) {
				setError(error as Error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [url]);
	return { data, loading, error };
};
