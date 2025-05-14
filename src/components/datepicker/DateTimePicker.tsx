import { useState, useRef } from "react";
import { format } from "date-fns";
import { useDatePicker } from "./useDatePicker";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function DateTimePicker() {
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<string>(format(new Date(), "HH:mm"));
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);

  const minDate = new Date(2000, 0, 1);
  const maxDate = new Date(2100, 11, 31);

  const { state, render, actions, refs } = useDatePicker({
    minDate,
    maxDate,
    value: date,
    onChange: (selected) => {
      const [hours, minutes] = time.split(":").map(Number);
      const dateWithTime = new Date(selected);
      dateWithTime.setHours(hours);
      dateWithTime.setMinutes(minutes);
      setDate(dateWithTime);
    },
  });

  useGSAP(() => {
    if (containerRef.current) {
      if (isOpen) {
        gsap.fromTo(
          containerRef.current,
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
        gsap.to(containerRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.2,
          ease: "power2.in",
        });
      }
    }
  }, [isOpen]);

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    setTime(newTime);
    const [hours, minutes] = newTime.split(":").map(Number);
    const newDate = new Date(date);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    setDate(newDate);
  };

  const handleNowClick = () => {
    const now = new Date();
    setDate(now);
    setTime(format(now, "HH:mm"));
  };

  return (
    <div className="relative w-full max-w-md">
      {/* Input Trigger */}
      <div
        onClick={() => setIsOpen(true)}
        className="bg-white dark:bg-gray-800 cursor-pointer flex items-center justify-between border border-gray-200 dark:border-gray-700 p-3 rounded-xl gap-2 transition-all hover:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent shadow-sm"
      >
        <input
          readOnly
          className="w-full outline-none cursor-pointer bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 text-sm font-medium"
          value={format(date, "MMM dd, yyyy HH:mm")}
          placeholder="Select date and time"
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

      {/* DateTime Picker Popup */}
      {isOpen && (
        <div
          ref={containerRef}
          className="absolute z-20 mt-2 bg-white dark:bg-gray-800 shadow-xl rounded-xl p-4 border border-gray-100 dark:border-gray-700 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90"
        >
          {/* Calendar Header */}
          <div className="mb-3">{render.header()}</div>

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

          {/* Time Picker */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Time:
              </label>
              <input
                ref={timeInputRef}
                type="time"
                value={time}
                onChange={handleTimeChange}
                className="border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleNowClick}
              className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium px-2 py-1 rounded transition-colors"
            >
              Now
            </button>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-2">
            <button
              onClick={() => setIsOpen(false)}
              className="text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-1.5 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg transition-colors shadow-sm"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}