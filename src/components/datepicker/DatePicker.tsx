import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { format } from "date-fns";
import { useDatePicker } from "./useDatePicker";
import { useRef } from "react";

interface DatePickerProps {
	minDate?: Date;
	maxDate?: Date;
	value?: Date;
	onChange?: (date: Date) => void;
}

export default function DatePicker({
	minDate = new Date(1900, 0, 1),
	maxDate = new Date(2100, 11, 31),
	value = new Date(),
	onChange,
}: DatePickerProps) {
	const { state, refs, utils, actions, render } = useDatePicker({
		minDate,
		maxDate,
		value,
		onChange,
	});

	const inputRef = useRef<HTMLInputElement>(null);

	useGSAP(() => {
		if (!refs.containerRef.current) return;

		if (state.show) {
			// Input focus animation
			gsap.fromTo(
				inputRef.current,
				{ boxShadow: "0 0 0 0 rgba(59, 130, 246, 0)" },
				{ boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)", duration: 0.3 }
			);

			// Calendar reveal animation
			gsap.fromTo(
				refs.containerRef.current,
				{ opacity: 0, y: -15, scale: 0.95 },
				{
					opacity: 1,
					y: 0,
					scale: 1,
					duration: 0.3,
					ease: "back.out(1.2)",
				}
			);
		} else {
			// Calendar hide animation
			gsap.to(refs.containerRef.current, {
				opacity: 0,
				y: -10,
				duration: 0.2,
				ease: "power2.in",
			});
		}
	}, [state.show]);

	return (
		<div className="relative w-full max-w-[280px]">
			{/* Input Trigger */}
			<div
				onClick={actions.toggleShow}
				className="bg-white dark:bg-gray-800 cursor-pointer flex items-center justify-between border border-gray-200 dark:border-gray-700 p-3 rounded-xl gap-2 transition-all hover:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent shadow-sm"
			>
				<input
					ref={inputRef}
					readOnly
					className="w-full outline-none cursor-pointer bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 text-sm font-medium"
					value={format(state.selectedDate, "MMM dd, yyyy")}
					placeholder="Select date"
				/>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5 text-gray-400"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fillRule="evenodd"
						d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
						clipRule="evenodd"
					/>
				</svg>
			</div>

			{/* Calendar Popup */}
			{state.show && (
				<div
					ref={refs.containerRef}
					className="absolute z-20 mt-2 bg-white dark:bg-gray-800 shadow-xl rounded-xl p-3 border border-gray-100 dark:border-gray-700 w-full backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90"
				>
					{/* Floating hover indicator (for day view) */}
					<div
						ref={refs.hoverRef}
						className="absolute w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full pointer-events-none transition-all duration-200 ease-out"
						style={{ opacity: 0 }}
					/>

					{/* Calendar Header */}
					<div className="mb-2">{render.header()}</div>

					{/* Calendar Views */}
					<div className="overflow-hidden relative">
						{state.viewMode === "DAY" && (
							<div className="space-y-1">
								{render.weekDays()}
								<div className="mt-1">{render.dayCells()}</div>
							</div>
						)}

						{state.viewMode === "MONTH" && (
							<div className="animate-fadeIn">{render.monthCells()}</div>
						)}

						{state.viewMode === "YEAR" && (
							<div className="animate-fadeIn">{render.yearCells()}</div>
						)}
					</div>

					{/* Today/Floating Action Button */}
					<div className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
						<button
							onClick={() => {
								const today = new Date();
								if (!utils.isDisabled(today)) {
									actions.setSelectedDate(today);
									onChange?.(today);
									actions.toggleShow();
								}
							}}
							className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium px-2 py-1 rounded transition-colors"
						>
							Today
						</button>
						<button
							onClick={actions.toggleShow}
							className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg transition-colors shadow-sm"
						>
							Confirm
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
