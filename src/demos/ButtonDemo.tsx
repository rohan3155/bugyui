import { Button } from "@/components/button/Button";
import { ThemeToggler } from "@/components/toggle/ThemeToggler";
import { useTheme } from "@/context/ThemeContext";
import { Binary } from "@phosphor-icons/react";
import { useEffect } from "react";


export function ButtonDemo() {
	const { theme } = useTheme();

	useEffect(() => {
		document.body.setAttribute("data-theme", theme);
	}, [theme]);

	const variants = [
		"primary",
		"light",
		"dark",
		"disabled",
		"success",
		"success-outline",
		"success-dashed",
		"warning",
		"warning-outline",
		"warning-dashed",
		"danger",
		"danger-outline",
		"danger-dashed",
		"bordered",
		"dashed",
		"link",
		"text",
		"ghost",
	] as const;

	return (
		<div className="flex flex-col gap-6 justify-start items-center p-6 min-h-screen bg-background text-foreground">
			<h1 className="text-2xl font-bold">Button Variants Demo</h1>

			<div className="flex flex-wrap justify-center gap-4 w-full max-w-5xl">
				{variants.map((variant) => (
					<Button
						key={variant}
						variant={variant}
						title={variant}
						icon={Binary}
						iconPosition="left"
						iconProps={{ size: 20 }}
                                                size="md"
					/>
				))}

				{/* Loading state demo */}
				<Button
					variant="primary"
					loading
					title="Loading"
					icon={Binary}
					iconProps={{ size: 20 }}
					iconPosition="left"
				/>

				{/* Disabled demo */}
				<Button
					variant="success"
					title="Disabled"
					disabled
					icon={Binary}
					iconProps={{ size: 20 }}
				/>
			</div>

			{/* Theme toggler */}
			<ThemeToggler />
		</div>
	);
}

