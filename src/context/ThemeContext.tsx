import React, {
	createContext,
	useState,
	useContext,
	useEffect,
	type ReactNode,
} from "react";
export type Theme = "light" | "dark" | "frost" | "night-vision" | "beige-soft";

const ThemeContext = createContext<
	| {
			theme: Theme;
			setTheme: (theme: Theme) => void;
			toggleTheme: () => void;
	  }
	| undefined
>(undefined);

const encrypt = (text: string) => btoa(text);
const decrypt = (text: string) => atob(text);

const useLocalStorage = () => {
	const setItem = (key: string, value: string) =>
		localStorage.setItem(key, value);
	const getItem = (key: string) => localStorage.getItem(key);
	const removeItem = (key: string) => localStorage.removeItem(key);
	return { setItem, getItem, removeItem };
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const { setItem, getItem } = useLocalStorage();
	const [theme, setThemeState] = useState<Theme>("light");

	useEffect(() => {
		const stored = getItem("app_theme");
		if (stored) {
			try {
				const decrypted = decrypt(stored);
				if (
					decrypted === "light" ||
					decrypted === "dark" ||
					decrypted === "frost" ||
					decrypted === "night-vision" ||
					decrypted === "beige-soft"
				) {
					setThemeState(decrypted);
				}
			} catch {
				console.warn("Invalid theme in localStorage");
			}
		}
	}, []);

	const setTheme = (newTheme: Theme) => {
		setThemeState(newTheme);
		setItem("app_theme", encrypt(newTheme));
	};

	const toggleTheme = () => {
		const next = theme === "dark" ? "light" : "dark";
		setTheme(next);
	};

	return (
		<ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};
