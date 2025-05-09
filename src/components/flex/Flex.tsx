import { cn } from "@/utils/cn";
import React from "react";

export const Flex = ({
	children,
	direction = "row",
	justify = "flex-start",
	align = "flex-start",
	gap = 0,
	wrap = "nowrap",
	grow = "0",
	shrink = "1",
	className,
}: {
	children: React.ReactNode;
	direction?: "row" | "row-reverse" | "column" | "column-reverse";
	justify?:
		| "flex-start"
		| "flex-end"
		| "center"
		| "space-between"
		| "space-around"
		| "space-evenly";
	align?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
	gap?: number;
	wrap?: "nowrap" | "wrap" | "wrap-reverse";
	grow?: string;
	shrink?: string;
	className?: string;
}) => {
	const directionMap: Record<string, string> = {
		row: "flex-row",
		"row-reverse": "flex-row-reverse",
		column: "flex-col",
		"column-reverse": "flex-col-reverse",
	};

	const justifyMap: Record<string, string> = {
		"flex-start": "justify-start",
		"flex-end": "justify-end",
		center: "justify-center",
		"space-between": "justify-between",
		"space-around": "justify-around",
		"space-evenly": "justify-evenly",
	};

	const alignMap: Record<string, string> = {
		"flex-start": "items-start",
		"flex-end": "items-end",
		center: "items-center",
		baseline: "items-baseline",
		stretch: "items-stretch",
	};

	const wrapMap: Record<string, string> = {
		nowrap: "flex-nowrap",
		wrap: "flex-wrap",
		"wrap-reverse": "flex-wrap-reverse",
	};

	return (
		<div
			className={cn(
				"flex",
				directionMap[direction],
				justifyMap[justify],
				alignMap[align],
				wrapMap[wrap],
				gap && `gap-${gap}`,
				grow !== "0" && `grow-${grow}`,
				shrink !== "1" && `shrink-${shrink}`,
				className
			)}
		>
			{children}
		</div>
	);
};
