import { useState } from "react";

export const useDragAndDrop = () => {
	const [dragging, setDragging] = useState(false);
	const [dragOver, setDragOver] = useState(false);
	const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
		e.dataTransfer.setData("text/plain", e.currentTarget.id);
		setDragging(true);
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDragOver(true);
	};

	const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDragOver(true);
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDragOver(false);
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDragOver(false);
		const id = e.dataTransfer.getData("text/plain");
		const element = document.getElementById(id);
		if (element) {
			element.style.display = "block";
		}
	};
        

	return {
		dragging,
		dragOver,
		handleDragStart,
		handleDragOver,
		handleDragEnter,
		handleDragLeave,
		handleDrop,
	};
};
