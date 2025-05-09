import { cn } from "@/utils/cn";
import React, { type HTMLAttributes } from "react";

// Grid component props
type GridProps = {
	children: React.ReactNode;
	className?: string;
	justify?:
		| "start"
		| "end"
		| "center"
		| "space-between"
		| "space-around"
		| "space-evenly";
	align?: "top" | "middle" | "bottom" | "stretch";
	wrap?: boolean;
	gutter?: number; // horizontal gutter
} & HTMLAttributes<HTMLDivElement>;

export const Grid = ({
	children,
	className,
	justify = "start",
	align = "top",
	wrap = true,
	gutter = 4,
	...props
}: GridProps) => {
	const justifyClass = {
		start: "justify-start",
		end: "justify-end",
		center: "justify-center",
		"space-between": "justify-between",
		"space-around": "justify-around",
		"space-evenly": "justify-evenly",
	}[justify];

	const alignClass = {
		top: "items-start",
		middle: "items-center",
		bottom: "items-end",
		stretch: "items-stretch",
	}[align];

	return (
		<div
			className={cn(
				"grid grid-cols-12",
				gutter ? `gap-${gutter}` : "gap-4",
				justifyClass,
				alignClass,
				wrap ? "flex-wrap" : "flex-nowrap",
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
};

// Cols component props
type ColsProps = {
	children: React.ReactNode;
	span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; // Number of columns to span (1-12)
	offset?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11; // Offset columns
	sm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; // Small breakpoint span
	md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; // Medium breakpoint span
	lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; // Large breakpoint span
	className?: string;
} & HTMLAttributes<HTMLDivElement>;

export const Cols = ({
	children,
	span = 12,
	offset = 0,
	sm,
	md,
	lg,
	className,
	...props
}: ColsProps) => {
	const spanClass = `col-span-${span}`;
	const offsetClass = offset ? `col-start-${offset + 1}` : "";
	const smClass = sm ? `sm:col-span-${sm}` : "";
	const mdClass = md ? `md:col-span-${md}` : "";
	const lgClass = lg ? `lg:col-span-${lg}` : "";

	return (
		<div
			className={cn(
				spanClass,
				offsetClass,
				smClass,
				mdClass,
				lgClass,
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
};

// Row component props
type RowProps = {
	children: React.ReactNode;
	span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; // Number of rows to span (1-12)
	offset?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11; // Offset rows
	sm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; // Small breakpoint span
	md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; // Medium breakpoint span
	lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; // Large breakpoint span
	className?: string;
} & HTMLAttributes<HTMLDivElement>;

export const Rows = ({
	children,
	span = 12,
	offset = 0,
	sm,
	md,
	lg,
	className,
	...props
}: RowProps) => {
	const spanClass = `row-span-${span}`;
	const offsetClass = offset ? `row-start-${offset + 1}` : "";
	const smClass = sm ? `sm:row-span-${sm}` : "";
	const mdClass = md ? `md:row-span-${md}` : "";
	const lgClass = lg ? `lg:row-span-${lg}` : "";

	return (
		<div
			className={cn(
				spanClass,
				offsetClass,
				smClass,
				mdClass,
				lgClass,
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
};


// Grid Template component props
type GridTemplateProps = {
	children: React.ReactNode;
	className?: string;
	columns?: number; // Number of columns (default is 12)
	gap?: number; // Gap between grid items (default is 4)
	rowGap?: number; // Row gap (default is same as gap)
	colGap?: number; // Column gap (default is same as gap)
	customTemplateColumns?: string; // Custom template for grid columns
	customTemplateRows?: string; // Custom template for grid rows
} & HTMLAttributes<HTMLDivElement>;

export const GridTemplate = ({
	children,
	className,
	columns = 12,
	gap = 4,
	rowGap,
	colGap,
	customTemplateColumns,
	customTemplateRows,
	...props
}: GridTemplateProps) => {
	const gapClass = gap ? `gap-${gap}` : "gap-4";
	const rowGapClass = rowGap ? `row-gap-${rowGap}` : "";
	const colGapClass = colGap ? `col-gap-${colGap}` : "";

	// Define a dynamic grid template
	const gridTemplateClass = customTemplateColumns
		? `grid-cols-[${customTemplateColumns}]`
		: `grid-cols-${columns}`;
	const gridTemplateRowsClass = customTemplateRows
		? `grid-rows-[${customTemplateRows}]`
		: "";

	return (
		<div
			className={cn(
				"grid",
				gridTemplateClass,
				gridTemplateRowsClass,
				gapClass,
				rowGapClass,
				colGapClass,
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
};

// Export as Grid namespace
export const GridNamespace = {
	Grid,
	Cols,
	Row: Rows,
        GridTemplate,
};
