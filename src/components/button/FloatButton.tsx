import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useHover } from "@/hooks/useHover";
import { useToggle } from "@/hooks/useToggle";
import { cn } from "@/utils/cn";

export interface FloatButtonOption {
	label: string;
	value: string;
	icon?: React.ReactNode;
	onSelect: (value: string) => void;
}

export interface FloatButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children?: React.ReactNode;
	className?: string;
	title?: string;
	icon: React.ReactNode;
	buttonPosition?:
		| "top-left"
		| "top"
		| "top-right"
		| "right"
		| "bottom-right"
		| "bottom"
		| "bottom-left"
		| "left"
		| "center";
	worksOnClick?: boolean;
	worksOnHover?: boolean;
	onClick?: () => void;
	onHover?: () => void;
	options?: FloatButtonOption[];
}

const positionMap: Record<string, string> = {
	"top-left": "top-4 left-4",
	top: "top-4 left-1/2 -translate-x-1/2",
	"top-right": "top-4 right-4",
	right: "top-1/2 right-4 -translate-y-1/2",
	"bottom-right": "bottom-4 right-4",
	bottom: "bottom-4 left-1/2 -translate-x-1/2",
	"bottom-left": "bottom-4 left-4",
	left: "top-1/2 left-4 -translate-y-1/2",
	center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
};

export const FloatButton: React.FC<FloatButtonProps> = ({
	children,
	title,
	className,
	worksOnClick = true,
	worksOnHover = false,
	icon,
	buttonPosition = "bottom-right",
	onClick = () => {},
	onHover = () => {},
	options = [],
	...props
}) => {
	const [ref, isHovering] = useHover();
	const [showMenu, toggleMenu] = useToggle(false);

	const menuRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	const effectiveShowMenu = worksOnHover ? isHovering : showMenu;

	const handleClick = () => {
		if (worksOnClick) {
			onClick();
			toggleMenu();
		}
	};

	useEffect(() => {
		if (isHovering && worksOnHover) {
			onHover();
		}
	}, [isHovering, worksOnHover, onHover]);

	useEffect(() => {
		if (effectiveShowMenu && menuRef.current) {
			gsap.fromTo(
				menuRef.current.children,
				{ opacity: 0, y: 10, scale: 0.95 },
				{
					opacity: 1,
					y: 0,
					scale: 1,
					duration: 0.6,
					stagger: 0.08,
					ease: "power2.out",
				}
			);
		}
	}, [effectiveShowMenu]);

	useEffect(() => {
		if (buttonRef.current) {
			gsap.fromTo(
				buttonRef.current,
				{ scale: 0.8, opacity: 0 },
				{ scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }
			);
		}
	}, []);

	const hasText = Boolean(title || children);
	const isHorizontal = buttonPosition === "left" || buttonPosition === "right";

	return (
		<div
			className={cn(
				"fixed z-50 flex flex-col items-center gap-3",
				isHorizontal ? "flex-row" : "flex-col",
				positionMap[buttonPosition]
			)}
		>
			{(buttonPosition.includes("bottom") || buttonPosition === "right") && (
				<div
					ref={menuRef}
					className={
						isHorizontal ? "flex flex-row gap-3" : "flex flex-col gap-3"
					}
				>
					{effectiveShowMenu &&
						options.map((option) => (
							<button
								key={option.value}
								title={option.label}
								onClick={() => {
									option.onSelect(option.value);
									if (worksOnClick) toggleMenu();
								}}
								className="bg-white text-black w-12 h-12 my-4 flex items-center justify-center rounded-full shadow-md hover:bg-gray-100 transition"
							>
								{option.icon || option.label}
							</button>
						))}
				</div>
			)}

			<button
				ref={(node) => {
					ref(node);
					buttonRef.current = node!;
				}}
				className={cn(
					"bg-blue-600 text-white w-14 h-14 flex items-center justify-center rounded-full shadow-lg hover:bg-blue-700 transition",
					className
				)}
				onClick={handleClick}
				{...props}
			>
				{hasText ? (
					<span className="flex items-center gap-2">
						{icon}
						{title || children}
					</span>
				) : (
					icon
				)}
			</button>

			{(buttonPosition.includes("top") || buttonPosition === "left") && (
				<div
					ref={menuRef}
					className={
						isHorizontal ? "flex flex-row gap-3" : "flex flex-col gap-3"
					}
				>
					{effectiveShowMenu &&
						options.map((option) => (
							<button
								key={option.value}
								title={option.label}
								onClick={() => {
									option.onSelect(option.value);
									if (worksOnClick) toggleMenu();
								}}
								className="bg-white text-black w-12 h-12 my-4 flex items-center justify-center rounded-full shadow-md hover:bg-gray-100 transition"
							>
								{option.icon || option.label}
							</button>
						))}
				</div>
			)}
		</div>
	);
};
