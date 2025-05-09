import { useTheme } from "@/context/ThemeContext";
import React, { useRef } from "react";
import { Button } from "../button/Button";
import { Sun, Moon } from "@phosphor-icons/react";
import gsap from "gsap";
import { cn } from "@/utils/cn";

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
}

export interface IconWrapperProps
	extends React.HTMLAttributes<HTMLSpanElement>,
		React.RefAttributes<HTMLSpanElement> {
	className?: string;
}
export interface IconProps extends React.SVGProps<SVGSVGElement> {
	className?: string;
}

export const IconWrapper: React.FC<IconWrapperProps> = ({
	className,
	...props
}) => {
	return (
		<span
			className={cn("flex items-center justify-center", className)}
			{...props}
		/>
	);
};

export const ToggleButton: React.FC<ButtonProps> = ({
	className,
	...props
}) => {
	return (
		<Button
			className={cn("flex items-center justify-center", className)}
			{...props}
		/>
	);
};

export const ThemeToggler: React.FC = () => {
	const { theme, toggleTheme } = useTheme();
	const iconRef = useRef<HTMLSpanElement>(null);

	const handleToggleThemeClick = () => {
		toggleTheme();

		setTimeout(() => {
			if (iconRef.current) {
				gsap.fromTo(
					iconRef.current,
					{ rotate: 0 },
					{ rotate: 360, duration: 0.5, ease: "power3.inOut" }
				);
			}
		}, 10); 
	};

	return (
		<ToggleButton
			onClick={handleToggleThemeClick}
			className="p-2 bg-transparent rounded-full"
		>
			<IconWrapper ref={iconRef} className="w-8 h-8">
				{theme === "dark" ? <Sun
                                className=""
                                size={32} /> : <Moon
                                className="text-dark-bg"
                                size={32} />}
			</IconWrapper>
		</ToggleButton>
	);
};
