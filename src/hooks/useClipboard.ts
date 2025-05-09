export const useClipboard = () => {
	const copy = (text: string) => {
		navigator.clipboard.writeText(text);
	};
	const paste = async () => {
		const text = await navigator.clipboard.readText();
		return text;
	};
	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
	};
	return { copy, paste, copyToClipboard };
};
