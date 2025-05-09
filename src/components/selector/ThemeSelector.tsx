import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Button } from "../button/Button";

export const ThemeSelector: React.FC = () => {
	const { setTheme } = useTheme();

	return (
		<div>
			<Button onClick={() => setTheme("frost")}>Frost</Button>
			<Button onClick={() => setTheme("night-vision")}>Night Vision</Button>
			<Button onClick={() => setTheme("beige-soft")}>Beige Soft</Button>
		</div>
	);
};
