import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useClickOutside } from "@/hooks/useClickOutside";
import { Button } from "../button/Button";
import { CaretDown } from "@phosphor-icons/react";
import { cn } from "@/utils/cn";

type Option = {
	label: string;
	value: string;
	icon?: React.ReactNode;
	onSelect?: (value: string) => void;
};

type DropDownProps = {
	trigger?: (props: {
		onClick?: () => void;
		onMouseEnter?: () => void;
		onMouseLeave?: () => void;
		iconRef?: React.Ref<SVGSVGElement>;
	}) => React.ReactNode;
	worksOnClick?: boolean;
	worksOnHover?: boolean;
	directionAgnostic?: boolean;
	openFrom?: "top" | "bottom";
	containerClassName?: string;
	listItemClassName?: string;
	options: Option[];
	onSelect?: (value: string) => void;
	contentHeader?: (props: { className?: string }) => React.ReactNode;
	contentFooter?: (props: { className?: string }) => React.ReactNode;
};

export const DropDown = ({
	trigger,
	worksOnClick = true,
	worksOnHover = false,
	directionAgnostic = false,
	openFrom = "bottom",
	containerClassName,
	listItemClassName,
	options = [],
	onSelect,
	contentHeader,
	contentFooter,
}: DropDownProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [direction, setDirection] = useState<"top" | "bottom">(openFrom);

	const containerRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const iconRef = useRef<SVGSVGElement>(null);
	const listItemsRef = useRef<(HTMLLIElement | null)[]>([]);

	const handleToggle = () => setIsOpen((prev) => !prev);
	const handleOpen = () => setIsOpen(true);
	const handleClose = () => setIsOpen(false);

	useClickOutside(containerRef, () => {
		if (isOpen) setIsOpen(false);
	});

	const handleMouseEnter = () => {
		if (!directionAgnostic) {
			handleOpen();
			return;
		}

		const rect = containerRef.current?.getBoundingClientRect();
		if (rect) {
			const mouseY = window.event?.clientY ?? 0;
			setDirection(mouseY < rect.top + rect.height / 2 ? "bottom" : "top");
		}
		handleOpen();
	};

	useGSAP(
		() => {
			gsap.to(iconRef.current, {
				rotate: isOpen ? 180 : 0,
				duration: 0.3,
				ease: "power2.out",
			});

			gsap.to(contentRef.current, {
				autoAlpha: isOpen ? 1 : 0,
				y: isOpen ? 0 : direction === "top" ? -20 : 20,
				duration: 0.3,
				ease: "power2.out",
				onStart: () => {
					if (isOpen && contentRef.current)
						contentRef.current.style.pointerEvents = "auto";
				},
				onComplete: () => {
					if (!isOpen && contentRef.current)
						contentRef.current.style.pointerEvents = "none";
				},
			});

			if (isOpen) {
				gsap.fromTo(
					listItemsRef.current,
					{ opacity: 0, y: direction === "top" ? -10 : 10 },
					{ opacity: 1, y: 0, stagger: 0.1, duration: 0.2 }
				);
			}
		},
		{
			dependencies: [isOpen, direction],
			scope: containerRef,
			revertOnUpdate: true,
		}
	);

	const handleSelect = (
		value: string,
		customHandler?: (val: string) => void
	) => {
		customHandler?.(value);
		onSelect?.(value);
		setIsOpen(false);
	};

	return (
		<div
			ref={containerRef}
			className="relative  w-fit"
			onMouseEnter={worksOnHover ? handleMouseEnter : undefined}
		>
			{openFrom === "top" && (
				<DropDownContent
					contentRef={contentRef}
					direction={direction}
					containerClassName={containerClassName}
					options={options}
					listItemsRef={listItemsRef}
					listItemClassName={listItemClassName}
					handleSelect={handleSelect}
					worksOnHover={worksOnHover}
				/>
			)}

			{trigger ? (
				trigger({
					onClick: worksOnClick ? handleToggle : undefined,
					onMouseEnter: worksOnHover ? handleMouseEnter : undefined,
					onMouseLeave: worksOnHover ? handleClose : undefined,
					iconRef,
				})
			) : (
				<Button
					title="Dropdown"
					variant="primary"
					icon={<CaretDown ref={iconRef} className="w-4 h-4" />}
					iconPosition="right"
					onClick={handleToggle}
				/>
			)}

			{openFrom === "bottom" && (
				<DropDownContent
					contentRef={contentRef}
					direction={direction}
					containerClassName={containerClassName}
					options={options}
					listItemsRef={listItemsRef}
					listItemClassName={listItemClassName}
					handleSelect={handleSelect}
					worksOnHover={worksOnHover}
					contentHeader={contentHeader}
					contentFooter={contentFooter}
				/>
			)}
		</div>
	);
};

const DropDownContent = ({
	contentRef,
	direction,
	containerClassName,
	options,
	listItemsRef,
	listItemClassName,
	handleSelect,
	worksOnHover = false,
	contentHeader,
	contentFooter,
}: {
	contentRef: React.RefObject<HTMLDivElement>;
	direction: "top" | "bottom";
	containerClassName?: string;
	options: Option[];
	listItemsRef: React.MutableRefObject<(HTMLLIElement | null)[]>;
	listItemClassName?: string;
	handleSelect: (value: string, customHandler?: (val: string) => void) => void;
	worksOnHover?: boolean;
	contentHeader?: (props: { className?: string }) => React.ReactNode;
	contentFooter?: (props: { className?: string }) => React.ReactNode;
}) => (
	<div
		ref={contentRef}
		className={cn(
			` bg-white  py-2  shadow rounded w-48 opacity-0 pointer-events-none z-50
             ${direction === "bottom" ? "top-full mt-2" : "bottom-full mb-2"}`,
			"max-h-56 overflow-y-scroll",
			worksOnHover ? "absolute" : "",
			containerClassName
		)}
		style={{ pointerEvents: "none" }}
	>
		{contentHeader &&
			contentHeader({
				className: "p-2 sticky top-0 left-0 w-full",
			})}
		<ul>
			{options.map((option, index) => (
				<li
					key={option.value}
					ref={(el) => (listItemsRef.current[index] = el)}
					className={cn(
						"p-2 hover:bg-primary/10 cursor-pointer flex items-center gap-2",
						listItemClassName
					)}
					onClick={() => handleSelect(option.value, option.onSelect)}
					style={{ pointerEvents: "auto" }}
				>
					{option.icon}
					{option.label}
				</li>
			))}
		</ul>
		{contentFooter &&
			contentFooter({
				className: "p-2 sticky bottom-0 left-0 w-full",
			})}
	</div>
);


