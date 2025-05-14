"use client";

import { useState, useRef, type JSX } from "react";
import {
	format,
	addMonths,
	subMonths,
	startOfMonth,
	endOfMonth,
	startOfWeek,
	endOfWeek,
	addDays,
	isSameMonth,
	isSameDay,
	isBefore,
	isAfter,
	startOfYear,
	addYears,
	subYears,
} from "date-fns";

const VIEW = {
	DAY: "DAY",
	MONTH: "MONTH",
	YEAR: "YEAR",
} as const;

type ViewMode = keyof typeof VIEW;

interface UseDatePickerProps {
	minDate: Date;
	maxDate: Date;
	value: Date;
	onChange?: (date: Date) => void;
}

export function useDatePicker({
	minDate,
	maxDate,
	value,
	onChange,
}: UseDatePickerProps) {
	const [selectedDate, setSelectedDate] = useState(value);
	const [currentDate, setCurrentDate] = useState(value);
	const [show, setShow] = useState(false);
	const [viewMode, setViewMode] = useState<ViewMode>("DAY");

	const containerRef = useRef<HTMLDivElement>(null);
	const hoverRef = useRef<HTMLDivElement>(null);

	const isDisabled = (date: Date) =>
		isBefore(date, minDate) || isAfter(date, maxDate);

	const toggleShow = () => setShow((prev) => !prev);

	const selectDate = (date: Date) => {
		if (!isDisabled(date)) {
			setSelectedDate(date);
			onChange?.(date);
			setShow(false);
		}
	};

	const renderHeader = () => {
		const title =
			viewMode === "DAY"
				? format(currentDate, "MMMM yyyy")
				: viewMode === "MONTH"
					? format(currentDate, "yyyy")
					: `${format(subYears(startOfYear(currentDate), 6), "yyyy")} - ${format(
							addYears(startOfYear(currentDate), 5),
							"yyyy"
						)}`;

		const onPrev = () => {
			setCurrentDate(
				viewMode === "DAY"
					? subMonths(currentDate, 1)
					: viewMode === "MONTH"
						? subYears(currentDate, 1)
						: subYears(currentDate, 12)
			);
		};

		const onNext = () => {
			setCurrentDate(
				viewMode === "DAY"
					? addMonths(currentDate, 1)
					: viewMode === "MONTH"
						? addYears(currentDate, 1)
						: addYears(currentDate, 12)
			);
		};

		return (
			<div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
				<button
					onClick={onPrev}
					className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5 text-gray-600"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
				<span
					onClick={() =>
						setViewMode(
							viewMode === "DAY"
								? "MONTH"
								: viewMode === "MONTH"
									? "YEAR"
									: "YEAR"
						)
					}
					className="font-medium text-gray-100 cursor-pointer hover:bg-gray-900 px-3 py-1 rounded transition-colors"
				>
					{title}
				</span>
				<button
					onClick={onNext}
					className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5 text-gray-600"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
			</div>
		);
	};

	const renderWeekDays = () => {
		const startDate = startOfWeek(currentDate);
		return (
			<div className="grid grid-cols-7 gap-1 text-xs font-medium text-gray-100 mt-2 px-2">
				{[...Array(7)].map((_, i) => (
					<div key={i} className="h-8 flex items-center justify-center">
						{format(addDays(startDate, i), "EEE")}
					</div>
				))}
			</div>
		);
	};

	const renderDayCells = () => {
		const startDate = startOfWeek(startOfMonth(currentDate));
		const endDate = endOfWeek(endOfMonth(currentDate));
		let day = startDate;
		const rows: JSX.Element[] = [];

		while (day <= endDate) {
			const week: JSX.Element[] = [];
			for (let i = 0; i < 7; i++) {
				const isCurrent = isSameMonth(day, currentDate);
				const isSelected = isSameDay(day, selectedDate);
				const disabled = isDisabled(day);
				week.push(
					<div
						key={day.toISOString()}
						className={`h-8 flex items-center justify-center rounded-full transition-colors ${
							isSelected
								? "bg-blue-600 text-white font-medium"
								: isCurrent
									? "text-gray-100 hover:bg-gray-900"
									: "text-gray-400 hover:bg-gray-50"
						} ${disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
						onClick={() => !disabled && selectDate(day)}
					>
						{format(day, "d")}
					</div>
				);
				day = addDays(day, 1);
			}
			rows.push(
				<div key={day.toISOString()} className="grid grid-cols-7 gap-1 px-2">
					{week}
				</div>
			);
		}

		return <div className="my-1">{rows}</div>;
	};

	const renderMonthCells = () => (
		<div className="grid grid-cols-3 gap-2 p-3">
			{[...Array(12)].map((_, i) => {
				const month = new Date(currentDate.getFullYear(), i, 1);
				const isCurrent = i === currentDate.getMonth();
				return (
					<button
						key={i}
						className={`py-2 rounded-lg transition-colors ${
							isCurrent
								? "bg-blue-100 text-blue-700 font-medium"
								: "text-gray-100 hover:bg-gray-900"
						}`}
						onClick={() => {
							setCurrentDate(month);
							setViewMode("DAY");
						}}
					>
						{format(month, "MMM")}
					</button>
				);
			})}
		</div>
	);

	const renderYearCells = () => {
		const start = subYears(startOfYear(currentDate), 6);
		return (
			<div className="grid grid-cols-3 gap-2 p-3">
				{[...Array(12)].map((_, i) => {
					const year = addYears(start, i);
					const isCurrent = year.getFullYear() === currentDate.getFullYear();
					return (
						<button
							key={i}
							className={`py-2 rounded-lg transition-colors ${
								isCurrent
									? "bg-blue-100 text-blue-700 font-medium"
									: "text-gray-100 hover:bg-gray-900"
							}`}
							onClick={() => {
								setCurrentDate(new Date(year.getFullYear(), 0, 1));
								setViewMode("MONTH");
							}}
						>
							{format(year, "yyyy")}
						</button>
					);
				})}
			</div>
		);
	};

	return {
		state: { selectedDate, currentDate, show, viewMode },
		refs: { containerRef, hoverRef },
		utils: { isDisabled },
		actions: { setCurrentDate, setSelectedDate, toggleShow },
		render: {
			header: renderHeader,
			weekDays: renderWeekDays,
			dayCells: renderDayCells,
			monthCells: renderMonthCells,
			yearCells: renderYearCells,
		},
	};
}
