// Modal.tsx
import React, { useEffect, useRef } from "react";
import { cn } from "@/utils/cn";

type ModalProps = {
	open: boolean;
	onClose: () => void;
	onOk?: () => void;
	onCancel?: () => void;
	okText?: string;
	cancelText?: string;
	okButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
	cancelButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
	width?: number | string;
	height?: number | string;
	title?: React.ReactNode;
	footer?: React.ReactNode | null;
	mask?: boolean;
	maskClosable?: boolean;
	closable?: boolean;
	destroyOnClose?: boolean;
	keyboard?: boolean;
	zIndex?: number;
	style?: React.CSSProperties;
	className?: string;
	bodyStyle?: React.CSSProperties;
	wrapClassName?: string;
	wrapStyle?: React.CSSProperties;
	modalRender?: (modalContent: React.ReactNode) => React.ReactNode;
	children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({
	open,
	onClose,
	onOk,
	onCancel,
	okText = "OK",
	cancelText = "Cancel",
	okButtonProps,
	cancelButtonProps,
	width = "100vw",
	height = "100vh",
	title,
	footer,
	mask = true,
	maskClosable = true,
	closable = true,
	destroyOnClose = false,
	keyboard = true,
	zIndex = 1000,
	style,
	className,
	bodyStyle,
	wrapClassName,
	wrapStyle,
	modalRender,
	children,
}) => {
	const contentRef = useRef<HTMLDivElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);

	// Debug log for modal render
	console.log("Modal render:", { open, mask, maskClosable });

	// Handle click outside
	useEffect(() => {
		if (!maskClosable || !open) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (
				contentRef.current &&
				!contentRef.current.contains(event.target as Node) &&
				wrapperRef.current?.contains(event.target as Node)
			) {
				console.log("Clicked outside content, closing modal");
				onClose();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [maskClosable, open, onClose]);

	// Handle Escape key
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (keyboard && e.key === "Escape" && open) {
				e.preventDefault();
				console.log("Escape key pressed, closing modal");
				onClose();
			}
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [keyboard, open, onClose]);

	if (!open && destroyOnClose) return null;

	const content = (
		<div
			ref={contentRef}
			className={cn(
				"bg-white relative flex flex-col max-h-[100vh] max-w-[100vw] overflow-auto",
				className
			)}
			style={{ width, height, ...style }}
		>
			{closable && (
				<button
					className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
					onClick={() => {
						console.log("Close button clicked");
						onClose();
					}}
					aria-label="Close"
				>
					✕
				</button>
			)}
			{title && (
				<div className="px-6 py-4 border-b text-xl font-semibold sticky top-0 bg-white">
					{title}
				</div>
			)}
			<div className="p-6 flex-grow overflow-auto" style={bodyStyle}>
				{children}
			</div>
			{footer !== null && (
				<div className="px-6 py-4 border-t flex justify-end gap-3 sticky bottom-0 bg-white">
					{footer || (
						<>
							<button
								onClick={() => {
									console.log("Cancel button clicked");
									(onCancel || onClose)();
								}}
								{...cancelButtonProps}
								className={cn(
									"px-4 py-2 border rounded-md hover:bg-gray-100",
									cancelButtonProps?.className
								)}
							>
								{cancelText}
							</button>
							<button
								onClick={() => {
									console.log("OK button clicked");
									onOk?.();
								}}
								{...okButtonProps}
								className={cn(
									"px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700",
									okButtonProps?.className
								)}
							>
								{okText}
							</button>
						</>
					)}
				</div>
			)}
		</div>
	);

	return (
		<div
			ref={wrapperRef}
			className={cn(
				"fixed inset-0 flex items-center justify-center p-0 m-0 w-full h-full",
				mask && "bg-black/50 backdrop-blur-sm",
				!open && "hidden",
				wrapClassName
			)}
			style={{ zIndex, ...wrapStyle }}
		>
			{modalRender ? modalRender(content) : content}
		</div>
	);
};
