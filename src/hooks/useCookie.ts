export function useCookie(
	name: string
): [string | null, (val: string, days?: number) => void] {
	const get = () => {
		const match = document.cookie.match(
			new RegExp("(^| )" + name + "=([^;]+)")
		);
		return match ? decodeURIComponent(match[2]) : null;
	};
	const set = (value: string, days = 365) => {
		const expires = new Date(Date.now() + days * 864e5).toUTCString();
		document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
	};
	return [get(), set];
}
