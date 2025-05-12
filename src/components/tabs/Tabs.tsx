import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { cn } from "@/utils/cn";
import { Plus, X, DotsThreeOutline, CaretDown } from "@phosphor-icons/react";
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	type DragEndEvent,
} from "@dnd-kit/core";
import {
	SortableContext,
	sortableKeyboardCoordinates,
	horizontalListSortingStrategy,
	verticalListSortingStrategy,
	useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export type TabItemType = {
	key: string;
	label: React.ReactNode;
	icon?: React.ReactNode;
	children: React.ReactNode;
	closable?: boolean;
	closeIcon?: React.ReactNode;
	disabled?: boolean;
	forceRender?: boolean;
	destroyOnHidden?: boolean;
};

type TabsProps = {
	activeKey?: string;
	defaultActiveKey?: string;
	items?: TabItemType[];
	type?:
		| "line"
		| "outlined"
		| "pill"
		| "editable-card"
		| "card"
		| "underline"
		| "border-partial"
		| "shadow-card"
		| "rounded-card";
	animated?: boolean | { inkBar: boolean; tabPane: boolean };
	centered?: boolean;
	addIcon?: React.ReactNode;
	removeIcon?: React.ReactNode;
	hideAdd?: boolean;
	more?: { icon?: React.ReactNode; trigger?: "hover" | "click" };
	popupClassName?: string;
	renderTabBar?: (props: any, DefaultTabBar: any) => React.ReactElement;
	tabBarExtraContent?:
		| React.ReactNode
		| { left?: React.ReactNode; right?: React.ReactNode };
	tabBarGutter?: number;
	tabBarStyle?: React.CSSProperties;
	tabPosition?: "top" | "right" | "bottom" | "left";
	size?: "large" | "middle" | "small";
	destroyOnHidden?: boolean;
	indicator?: {
		size?: number | ((origin: number) => number);
		align?: "start" | "center" | "end";
	};
	sliderEnabled?: boolean;
	dropdownEnabled?: boolean;
	rearrangable?: boolean;
	rearrangableWithSorting?: boolean;
	tabClassName?: string;
	activeTabClassName?: string;
	inactiveTabClassName?: string;
	animationDuration?: number;
	animationEase?: string;
	maxVisibleTabs?: number;
	onChange?: (activeKey: string) => void;
	onEdit?: (
		targetKey: string | React.MouseEvent,
		action: "add" | "remove"
	) => void;
	onTabClick?: (key: string, event: React.MouseEvent) => void;
	onTabScroll?: (info: {
		direction: "left" | "right" | "top" | "bottom";
	}) => void;
	onDragEnd?: (items: TabItemType[]) => void;
};

const SortableTab: React.FC<{
	tab: TabItemType;
	getTabClassName: (tab: TabItemType) => string;
	handleTabClick: (key: string, e: React.MouseEvent) => void;
	handleRemove: (key: string) => void;
	type: TabsProps["type"];
	closeIcon: React.ReactNode;
	tabBarGutter: number;
	isVertical: boolean;
}> = ({
	tab,
	getTabClassName,
	handleTabClick,
	handleRemove,
	type,
	closeIcon,
	tabBarGutter,
	isVertical,
}) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: tab.key });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		[isVertical ? "marginBottom" : "marginRight"]: tabBarGutter,
	};

	useEffect(() => {
		if (isDragging) {
			gsap.to(setNodeRef.current, {
				opacity: 0.7,
				scale: 0.95,
				duration: 0.2,
				ease: "power2.out",
			});
		} else {
			gsap.to(setNodeRef.current, {
				opacity: 1,
				scale: 1,
				duration: 0.2,
				ease: "power2.out",
			});
		}
	}, [isDragging, setNodeRef]);

	return (
		<button
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			data-key={tab.key}
			disabled={tab.disabled}
			onClick={(e) => handleTabClick(tab.key, e)}
			className={getTabClassName(tab)}
		>
			{tab.icon && <span className="mr-1">{tab.icon}</span>}
			{tab.label}
			{type === "editable-card" && tab.closable !== false && (
				<span
					onClick={(e) => {
						e.stopPropagation();
						handleRemove(tab.key);
					}}
					className="ml-2 inline-block text-xs text-gray-500 hover:text-red-500"
				>
					{tab.closeIcon ?? closeIcon}
				</span>
			)}
		</button>
	);
};

export const Tabs: React.FC<TabsProps> = ({
	activeKey,
	defaultActiveKey,
	items = [],
	type = "line",
	animated = { inkBar: true, tabPane: true },
	centered = false,
	addIcon = <Plus size={16} />,
	removeIcon = <X size={14} />,
	hideAdd = false,
	more = { icon: <DotsThreeOutline size={16} />, trigger: "click" },
	popupClassName,
	tabBarStyle,
	tabBarGutter = 8,
	tabPosition = "top",
	size = "middle",
	destroyOnHidden = false,
	indicator = { size: 2, align: "center" },
	sliderEnabled = true,
	dropdownEnabled = true,
        tabBarExtraContent,
	rearrangable = true,
	rearrangableWithSorting = true,
	tabClassName,
	activeTabClassName,
	inactiveTabClassName,
	animationDuration = 0.4,
	animationEase = "power2.out",
	maxVisibleTabs = 10,
	onChange,
	onEdit,
	onTabClick,
	onTabScroll,
	onDragEnd,
}) => {
	const [currentKey, setCurrentKey] = useState<string>(
		activeKey || defaultActiveKey || items[0]?.key
	);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [scrollOffset, setScrollOffset] = useState(0);
	const contentRef = useRef<HTMLDivElement>(null);
	const tabBarRef = useRef<HTMLDivElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const isVertical = tabPosition === "left" || tabPosition === "right";

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	useEffect(() => {
		if (contentRef.current && animated?.tabPane) {
			gsap.fromTo(
				contentRef.current,
				{ opacity: 0, x: isVertical ? 10 : 0, y: isVertical ? 0 : 10 },
				{
					opacity: 1,
					x: 0,
					y: 0,
					duration: animationDuration,
					ease: animationEase,
				}
			);
		}
	}, [
		currentKey,
		animated?.tabPane,
		animationDuration,
		animationEase,
		isVertical,
	]);

	useEffect(() => {
		if (tabBarRef.current && animated?.inkBar && type === "line") {
			const activeTab = tabBarRef.current.querySelector(
				`[data-key="${currentKey}"]`
			);
			if (activeTab) {
				if (isVertical) {
					const { offsetTop, offsetHeight } = activeTab as HTMLElement;
					gsap.to(tabBarRef.current.querySelector(".ink-bar"), {
						y:
							offsetTop + (indicator.align === "center" ? offsetHeight / 2 : 0),
						height:
							typeof indicator.size === "function"
								? indicator.size(offsetHeight)
								: indicator.size || offsetHeight,
						width: 2,
						duration: animationDuration,
						ease: animationEase,
					});
				} else {
					const { offsetLeft, offsetWidth } = activeTab as HTMLElement;
					gsap.to(tabBarRef.current.querySelector(".ink-bar"), {
						x:
							offsetLeft + (indicator.align === "center" ? offsetWidth / 2 : 0),
						width:
							typeof indicator.size === "function"
								? indicator.size(offsetWidth)
								: indicator.size || offsetWidth,
						height: 2,
						duration: animationDuration,
						ease: animationEase,
					});
				}
			}
		}
	}, [
		currentKey,
		animated?.inkBar,
		indicator,
		animationDuration,
		animationEase,
		isVertical,
		type,
	]);

	const handleTabClick = (key: string, e: React.MouseEvent) => {
		onTabClick?.(key, e);
		if (key !== currentKey) {
			setCurrentKey(key);
			onChange?.(key);
		}
	};

	const handleAdd = () => {
		onEdit?.({} as React.MouseEvent, "add");
	};

	const handleRemove = (key: string) => {
		onEdit?.(key, "remove");
		if (key === currentKey && items.length > 1) {
			const newActive = items.find((t) => t.key !== key)?.key;
			setCurrentKey(newActive || "");
		}
	};

	const handleScroll = (direction: "left" | "right" | "top" | "bottom") => {
		const container = tabBarRef.current;
		if (!container) return;
		const scrollAmount = 100;
		let newOffset = scrollOffset;
		if (isVertical) {
			newOffset =
				direction === "top"
					? Math.max(scrollOffset - scrollAmount, 0)
					: Math.min(
							scrollOffset + scrollAmount,
							container.scrollHeight - container.clientHeight
						);
			gsap.to(container, {
				scrollTop: newOffset,
				duration: animationDuration,
				ease: animationEase,
			});
		} else {
			newOffset =
				direction === "left"
					? Math.max(scrollOffset - scrollAmount, 0)
					: Math.min(
							scrollOffset + scrollAmount,
							container.scrollWidth - container.clientWidth
						);
			gsap.to(container, {
				scrollLeft: newOffset,
				duration: animationDuration,
				ease: animationEase,
			});
		}
		setScrollOffset(newOffset);
		onTabScroll?.({ direction });
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (active && over && active.id !== over.id) {
			const oldIndex = items.findIndex((item) => item.key === active.id);
			const newIndex = items.findIndex((item) => item.key === over.id);
			const newItems = [...items];
			const [movedItem] = newItems.splice(oldIndex, 1);
			newItems.splice(newIndex, 0, movedItem);
			onDragEnd?.(newItems);
		}
	};

	const toggleDropdown = () => {
		if (more.trigger === "click") {
			setDropdownOpen(!dropdownOpen);
		}
	};

	const getTabClassName = (tab: TabItemType) => {
		const baseClasses = cn(
			"relative px-4 py-2 text-sm transition-all duration-300 flex items-center",
			size === "large" && "text-base px-6 py-3",
			size === "small" && "text-xs px-3 py-1.5",
			tab.disabled && "opacity-50 cursor-not-allowed",
			isVertical && "w-full justify-start",
			tabClassName
		);

		const activeClasses = cn(
			{
				line: isVertical
					? "text-blue-600 border-l-2 border-blue-600"
					: "text-blue-600 border-b-2 border-blue-600",
				outlined: "border border-blue-600 text-blue-600 bg-transparent",
				pill: "bg-blue-600 text-white rounded-full",
				"editable-card": "bg-blue-600 text-white rounded-md",
				card: "bg-blue-600 text-white rounded-md shadow-sm",
				underline: isVertical
					? "border-l-2 border-blue-600 text-blue-600"
					: "border-b-2 border-blue-600 text-blue-600",
				"border-partial": isVertical
					? "border-t border-b border-r border-blue-600 text-blue-600"
					: "border-l border-r border-t border-blue-600 text-blue-600",
				"shadow-card": "bg-white text-blue-600 shadow-md rounded-md",
				"rounded-card": "bg-blue-600 text-white rounded-xl",
			}[type],
			activeTabClassName
		);

		const inactiveClasses = cn(
			"text-gray-700",
			{
				line: isVertical
					? "hover:text-blue-500 hover:border-l-2 hover:border-blue-500"
					: "hover:text-blue-500",
				outlined: "border border-gray-300 hover:border-blue-500",
				pill: "bg-gray-200 rounded-full hover:bg-gray-300",
				"editable-card": "bg-gray-200 hover:bg-gray-300 rounded-md",
				card: "bg-gray-200 hover:bg-gray-300 rounded-md",
				underline: isVertical
					? "hover:border-l-2 hover:border-gray-400"
					: "hover:border-b-2 hover:border-gray-400",
				"border-partial": isVertical
					? "border-t border-b border-r border-gray-300"
					: "border-l border-r border-t border-gray-300",
				"shadow-card": "bg-white hover:shadow-lg rounded-md",
				"rounded-card": "bg-gray-200 hover:bg-gray-300 rounded-xl",
			}[type],
			inactiveTabClassName
		);

		return cn(
			baseClasses,
			tab.key === currentKey ? activeClasses : inactiveClasses
		);
	};

	const visibleTabs = sliderEnabled ? items.slice(0, maxVisibleTabs) : items;
	const hiddenTabs = sliderEnabled ? items.slice(maxVisibleTabs) : [];

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={
				rearrangable && rearrangableWithSorting ? handleDragEnd : undefined
			}
		>
			<div
				className={cn(
					"flex w-full",
					tabPosition === "top" && "flex-col",
					tabPosition === "bottom" && "flex-col-reverse",
					tabPosition === "left" && "flex-row",
					tabPosition === "right" && "flex-row-reverse"
				)}
			>
				<div
					className={cn(
						"flex items-center gap-2 relative",
						centered && "justify-center",
						tabPosition === "left" && "flex-col min-w-[200px]",
						tabPosition === "right" && "flex-col min-w-[200px]",
						tabPosition === "bottom" && "order-2",
						isVertical && "h-full"
					)}
					style={{ ...tabBarStyle }}
					ref={tabBarRef}
				>
					{typeof tabBarExtraContent === "object"
						? tabBarExtraContent.left
						: null}

					{items.length > maxVisibleTabs && sliderEnabled && (
						<div
							className={cn("flex gap-1", isVertical ? "flex-row" : "flex-row")}
						>
							<button
								onClick={() => handleScroll(isVertical ? "top" : "left")}
								className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
							>
								{isVertical ? "↑" : "<"}
							</button>
							<button
								onClick={() => handleScroll(isVertical ? "bottom" : "right")}
								className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
							>
								{isVertical ? "↓" : ">"}
							</button>
						</div>
					)}

					<SortableContext
						items={visibleTabs.map((tab) => tab.key)}
						strategy={
							isVertical
								? verticalListSortingStrategy
								: horizontalListSortingStrategy
						}
						disabled={!rearrangable || !rearrangableWithSorting}
					>
						<div
							className={cn(
								"flex items-center gap-2",
								tabPosition === "left" && "flex-col items-start",
								tabPosition === "right" && "flex-col items-start",
								isVertical && "w-full"
							)}
						>
							{visibleTabs.map((tab) => (
								<SortableTab
									key={tab.key}
									tab={tab}
									getTabClassName={getTabClassName}
									handleTabClick={handleTabClick}
									handleRemove={handleRemove}
									type={type}
									closeIcon={removeIcon}
									tabBarGutter={tabBarGutter}
									isVertical={isVertical}
								/>
							))}
							{type === "editable-card" && !hideAdd && (
								<button
									onClick={handleAdd}
									className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
								>
									{addIcon}
								</button>
							)}
							{hiddenTabs.length > 0 && dropdownEnabled && (
								<div className="relative" ref={dropdownRef}>
									<button
										onClick={toggleDropdown}
										onMouseEnter={() =>
											more.trigger === "hover" && setDropdownOpen(true)
										}
										onMouseLeave={() =>
											more.trigger === "hover" && setDropdownOpen(false)
										}
										className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 flex items-center"
									>
										{more.icon}
										<CaretDown size={12} className="ml-1" />
									</button>
									{dropdownOpen && (
										<div
											className={cn(
												"absolute bg-white shadow-lg rounded-md z-10",
												isVertical ? "left-full ml-2 top-0" : "top-full mt-2",
												popupClassName
											)}
											onMouseEnter={() =>
												more.trigger === "hover" && setDropdownOpen(true)
											}
											onMouseLeave={() =>
												more.trigger === "hover" && setDropdownOpen(false)
											}
										>
											{hiddenTabs.map((tab) => (
												<button
													key={tab.key}
													onClick={(e) => {
														handleTabClick(tab.key, e);
														setDropdownOpen(false);
													}}
													className={cn(
														"block w-full text-left px-4 py-2 text-sm hover:bg-gray-100",
														tab.disabled && "opacity-50 cursor-not-allowed"
													)}
												>
													{tab.icon && <span className="mr-1">{tab.icon}</span>}
													{tab.label}
												</button>
											))}
										</div>
									)}
								</div>
							)}
						</div>
					</SortableContext>
					{type === "line" && animated?.inkBar && (
						<div
							className={cn(
								"ink-bar absolute bg-blue-600",
								isVertical ? "left-0 w-0.5 h-8" : "bottom-0 h-0.5 w-full"
							)}
						/>
					)}
					{typeof tabBarExtraContent === "object"
						? tabBarExtraContent.right
						: tabBarExtraContent}
				</div>

				<div
					className={cn(
						tabPosition === "top" && "mt-4",
						tabPosition === "bottom" && "mb-4",
						tabPosition === "left" && "ml-4 flex-1",
						tabPosition === "right" && "mr-4 flex-1"
					)}
					ref={contentRef}
				>
					{items.map((tab) =>
						tab.key === currentKey || tab.forceRender ? (
							<div
								key={tab.key}
								style={{
									display: tab.key === currentKey ? "block" : "none",
								}}
							>
								{tab.children}
							</div>
						) : destroyOnHidden ? null : (
							<div key={tab.key} style={{ display: "none" }}>
								{tab.children}
							</div>
						)
					)}
				</div>
			</div>
		</DndContext>
	);
};
