import { cn } from "@/utils/cn";
import React from "react";
import { type Icon } from "@phosphor-icons/react";
import { Loader } from "@/components/loader/Loader";

export type ButtonVariant =
	| "primary"
	| "light"
	| "dark"
	| "disabled"
	| "success"
        | "success-outline"
        | "success-dashed"
	| "warning"
        | "warning-outline"
        | "warning-dashed"
        | "bordered"
        | "dashed"
        | "link"
        | "text"
        | "ghost"
	| "danger"
        | "danger-outline"
        | "danger-dashed"
        ;

export type IconPosition = "left" | "right" | "top" | "bottom";

export  type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	className?: string;
	title?: string;
        size?: "sm" | "md" | "lg";
	icon?: React.ElementType;
	iconPosition?: IconPosition;
	iconProps?: React.ComponentProps<Icon>;
	loading?: boolean;
	loader?: React.ReactNode;
}

const buttonVariants: Record<ButtonVariant, string> = {
	primary: "bg-[var(--color-primary)] text-white hover:opacity-90",
	light:
		"bg-[var(--color-light-bg)] text-[var(--color-light-text)] hover:opacity-90",
	dark: "bg-[var(--color-dark-bg)] text-[var(--color-dark-text)] hover:opacity-90",
	disabled:
		"bg-[var(--color-disabled-bg)] text-[var(--color-disabled-text)] opacity-60 cursor-not-allowed",
	success: "bg-[var(--color-success)] text-white hover:opacity-90",

        "success-outline": "bg-transparent border border-[var(--color-success)] text-[var(--color-success)] hover:opacity-90",
        "success-dashed": "bg-transparent border-dashed border border-[var(--color-success)] text-[var(--color-success)] hover:opacity-90",
	warning: "bg-[var(--color-warning)] text-black hover:opacity-90",
        "warning-outline": "bg-transparent border border-[var(--color-warning)] text-[var(--color-warning)] hover:opacity-90",
        "warning-dashed": "bg-transparent border-dashed border border-[var(--color-warning)] text-[var(--color-warning)] hover:opacity-90",
	danger: "bg-[var(--color-error)] text-white hover:opacity-90",
        "danger-outline": "bg-transparent border border-[var(--color-error)] text-[var(--color-error)] hover:opacity-90",
        "danger-dashed": "bg-transparent border-dashed border border-[var(--color-error)] text-[var(--color-error)] hover:opacity-90",
        bordered: "bg-transparent border border-[var(--color-primary)] text-[var(--color-primary)] hover:opacity-90",
        dashed: "bg-transparent border border-dashed border-[var(--color-primary)] text-[var(--color-primary)] hover:opacity-90",
        link: "bg-transparent text-[var(--color-primary)] hover:opacity-90",
        text: "bg-transparent text-[var(--color-primary)] hover:opacity-90",
        ghost: "bg-transparent text-[var(--color-primary)] hover:opacity-90",
};

const iconWrapperStyles: Record<IconPosition, string> = {
	left: "flex-row gap-2 items-center",
	right: "flex-row-reverse gap-2 items-center",
	top: "flex-col gap-1 items-center",
	bottom: "flex-col-reverse gap-1 items-center",
};
const buttonSize: Record<ButtonSize, string> = {
	sm: "text-sm px-2 py-1",
	md: "text-base px-4 py-2",
	lg: "text-lg px-6 py-3",
};

export const Button: React.FC<ButtonProps> = ({
	className,
	title = "",
	variant = "primary",
	icon: IconComponent,
	iconPosition = "left",
	iconProps = {},
	disabled,
	children,
        size = "md",
	loading = false,
	loader = <Loader />,
	...props
}) => {
	const appliedVariant: ButtonVariant = disabled ? "disabled" : variant;

	return (
		<button
			className={cn(
				"px-4 py-2 rounded transition-colors duration-200 font-semibold inline-flex justify-center cursor-pointer",
				iconWrapperStyles[iconPosition],
				buttonVariants[appliedVariant],
                                buttonSize[size],
				className
			)}
			disabled={disabled}
			{...props}
		>
			{loading && loader}
			{IconComponent && !loading && <IconComponent {...iconProps} />}
			{title === "" ? children : title}
		</button>
	);
};
