import type { Icon } from "@phosphor-icons/react";

export type ButtonVariant =
	| "primary"
	| "light"
	| "dark"
	| "disabled"
	| "success"
	| "warning"
	| "danger";

export type IconPosition = "left" | "right" | "top" | "bottom";

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	className?: string;
	title?: string;
	icon?: React.ElementType; // Phosphor icon component
	iconPosition?: IconPosition;
	iconProps?: React.ComponentProps<Icon>;
}