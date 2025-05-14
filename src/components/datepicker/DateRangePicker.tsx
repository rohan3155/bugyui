import { useState } from "react";
import { format, isBefore } from "date-fns";
import { useDatePicker } from "./useDatePicker";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function DateRangePicker() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selecting, setSelecting] = useState<"start" | "end">("start");
  const [isOpen, setIsOpen] = useState(false);

  const minDate = new Date(2000, 0, 1);
  const maxDate = new Date(2100, 11, 31);

  const { state, render, actions, refs } = useDatePicker({
    minDate,
    maxDate,
    value: selecting === "start" ? startDate ?? new Date() : endDate ?? new Date(),
    onChange: (date) => {
      if (selecting === "start") {
        setStartDate(date);
        setEndDate(null);
        setSelecting("end");
        // Keep calendar open for end date selection
      } else {
        if (!startDate || isBefore(date, startDate)) {
          setStartDate(date);
          setEndDate(null);
          setSelecting("end");
        } else {
          setEndDate(date);
          setSelecting("start");
          setIsOpen(false); // Close calendar after selecting end date
        }
      }
    },
  });

  useGSAP(() => {
    if (refs.containerRef.current) {
      if (isOpen) {
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
        gsap.to(refs.containerRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.2,
          ease: "power2.in",
        });
      }
    }
  }, [isOpen]);

  return (
    <div className="w-full max-w-2xl space-y-4">
      {/* Date Inputs */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Start Date
          </label>
          <div
            onClick={() => {
              setSelecting("start");
              setIsOpen(true);
            }}
            className={`flex items-center justify-between border p-3 rounded-xl cursor-pointer transition-all ${
              selecting === "start" && isOpen
                ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-900"
                : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
            } bg-white dark:bg-gray-800 shadow-sm`}
          >
            <input
              readOnly
              className="w-full outline-none cursor-pointer bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 text-sm font-medium"
              value={startDate ? format(startDate, "MMM dd, yyyy") : ""}
              placeholder="Select start date"
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
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            End Date
          </label>
          <div
            onClick={() => {
              setSelecting("end");
              setIsOpen(true);
            }}
            className={`flex items-center justify-between border p-3 rounded-xl cursor-pointer transition-all ${
              selecting === "end" && isOpen
                ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-900"
                : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
            } bg-white dark:bg-gray-800 shadow-sm`}
          >
            <input
              readOnly
              className="w-full outline-none cursor-pointer bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 text-sm font-medium"
              value={endDate ? format(endDate, "MMM dd, yyyy") : ""}
              placeholder="Select end date"
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
        </div>
      </div>

      {/* Calendar Popup */}
      {isOpen && (
        <div
          ref={refs.containerRef}
          className="absolute z-20 mt-2 bg-white dark:bg-gray-800 shadow-xl rounded-xl p-4 border border-gray-100 dark:border-gray-700 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90"
        >
          {/* Calendar Header */}
          <div className="mb-3">
            {render.header()}
            <div className="flex justify-center gap-2 mt-2">
              <span
                className={`text-xs px-2 py-1 rounded ${
                  selecting === "start"
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                }`}
              >
                {startDate ? format(startDate, "MMM dd") : "Select start"}
              </span>
              <span className="text-gray-400">→</span>
              <span
                className={`text-xs px-2 py-1 rounded ${
                  selecting === "end"
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                }`}
              >
                {endDate ? format(endDate, "MMM dd") : "Select end"}
              </span>
            </div>
          </div>

          {/* Calendar Views */}
          <div className="overflow-hidden relative">
            {state.viewMode === "DAY" && (
              <div className="space-y-1">
                {render.weekDays()}
                <div className="mt-1">{render.dayCells()}</div>
              </div>
            )}
            {state.viewMode === "MONTH" && render.monthCells()}
            {state.viewMode === "YEAR" && render.yearCells()}
          </div>

          {/* Action Buttons */}
          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <button
              onClick={() => {
                const today = new Date();
                if (!isBefore(today, minDate) && !isBefore(maxDate, today)) {
                  if (selecting === "start") {
                    setStartDate(today);
                    setSelecting("end");
                  } else {
                    if (!startDate || isBefore(today, startDate)) {
                      setStartDate(today);
                      setEndDate(null);
                      setSelecting("end");
                    } else {
                      setEndDate(today);
                    }
                  }
                }
              }}
              className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium px-2 py-1 rounded transition-colors"
            >
              Today
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setStartDate(null);
                  setEndDate(null);
                  setSelecting("start");
                }}
                className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium px-3 py-1.5 rounded-lg transition-colors"
              >
                Clear
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg transition-colors shadow-sm"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}