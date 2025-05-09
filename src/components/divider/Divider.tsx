import { cn } from "@/utils/cn";
import React, {
	type CSSProperties,
	type HTMLAttributes,
	type ReactNode,
	type JSX,
} from "react";

type DividerProps = {
	type?: "horizontal" | "vertical";
	children?: ReactNode;
	className?: string;
	dashed?: boolean;
	variant?: "solid" | "dashed" | "dotted";
	orientation?: "start" | "end" | "center";
	orientationMargin?: string | number;
	style?: CSSProperties;
} & HTMLAttributes<HTMLDivElement>;

const Divider = ({
	type = "horizontal",
	children,
	className,
	dashed = false,
	variant = "solid",
	orientation = "center",
	orientationMargin = "0",
	style = {},
	...props
}: DividerProps): JSX.Element => {
	const isVertical = type === "vertical";
	const borderStyle =
		variant === "dashed"
			? "border-dashed"
			: variant === "dotted"
			? "border-dotted"
			: "border-solid";

	if (isVertical) {
		return (
			<div
				className={cn("h-full border-l", borderStyle, className)}
				style={style}
				{...props}
			/>
		);
	}

	const startFlex = orientation === "start" ? "flex-[0.2]" : "flex-1";
	const endFlex = orientation === "end" ? "flex-[0.2]" : "flex-1";
	const centerFlex = orientation === "center" ? "flex-1" : "flex-[0.8]";

	return (
		<div
			className={cn("w-full flex items-center", className)}
			style={style}
			{...props}
		>
			<span className={cn("border-t", borderStyle, startFlex)} />
			{children && (
				<span
					className="mx-4 whitespace-nowrap text-sm text-gray-500"
					style={
						orientation !== "center"
							? {
									marginLeft: orientation === "end" ? orientationMargin : undefined,
									marginRight: orientation === "start" ? orientationMargin : undefined,
							  }
							: undefined
					}
				>
					{children}
				</span>
			)}
			<span className={cn("border-t", borderStyle, orientation === "center" ? centerFlex : endFlex)} />
		</div>
	);
};

export default Divider;
