import { useState, useCallback } from "react";

type Direction = "top" | "bottom" | "left" | "right" | null;

export const useEnterDirection = (ref: React.RefObject<HTMLElement>) => {
	const [enterDirection, setEnterDirection] = useState<Direction>(null);

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent) => {
			if (!ref.current) return;

			const { clientX, clientY } = e;
			const { top, left, right, bottom } = ref.current.getBoundingClientRect();
			let direction: Direction = null;

			// Check horizontal direction
			if (clientX < left) {
				direction = "left";
			} else if (clientX > right) {
				direction = "right";
			}

			// Check vertical direction
			if (clientY < top) {
				direction = "top";
			} else if (clientY > bottom) {
				direction = "bottom";
			}

			setEnterDirection(direction);
		},
		[ref]
	);

	return { enterDirection, handleMouseEnter };
};

export const useLeaveDirection = (ref: React.RefObject<HTMLElement>) => {
	const [leaveDirection, setLeaveDirection] = useState<Direction>(null);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent) => {
			if (!ref.current) return;

			const { clientX, clientY } = e;
			const { top, left, right, bottom } = ref.current.getBoundingClientRect();
			let direction: Direction = null;

			// Check horizontal direction
			if (clientX < left) {
				direction = "left";
			} else if (clientX > right) {
				direction = "right";
			}

			// Check vertical direction
			if (clientY < top) {
				direction = "top";
			} else if (clientY > bottom) {
				direction = "bottom";
			}

			setLeaveDirection(direction);
		},
		[ref]
	);

	return { leaveDirection, handleMouseLeave };
};
