import React, { useEffect, useRef, useState } from "react";
import { Button } from "../button/Button";
import { cn } from "@/utils/cn";
import { gsap } from "gsap";
import {
	House,
	User,
	Gear,
	Info,
	Question,
	FileText,
	ShieldCheck,
	BookOpen,
	CaretLeft,
	CaretRight,
	CaretDown,
	Code,
	Folder,
	File,
} from "@phosphor-icons/react";
import { Typography } from "../typography/Typography";
import { flatMenuItems } from "./menuItems";

// Define the types for menu items
export type MenuItemType = {
	key: string;
	title: string;
	href?: string;
	icon?: React.ReactNode;
	children?: MenuItemType[];
	onClick?: () => void;
};

// Group type for when using grouped format
export type MenuGroupType = {
	title?: string;
	items: MenuItemType[];
};

// Union type to handle both formats
export type MenuItemsType = MenuItemType[] | MenuGroupType[];

// Function to determine if the menu items are grouped
export const isGroupedMenu = (
	items: MenuItemsType
): items is MenuGroupType[] => {
	return items.length > 0 && "items" in items[0];
};



// Export the currently used menu items
export const menuItems: MenuItemsType = flatMenuItems;

type SideBarMenuProps = {
	triggerPosition?: "top" | "bottom" | "center";
	customTrigger?: (props: {
		className: string;
		onClick: () => void;
	}) => React.ReactNode;
	items?: MenuItemsType; // Allow custom menu items to be passed
};

export const SideBarMenu = ({
	triggerPosition = "center",
	customTrigger,
	items = menuItems, // Default to the exported menuItems
}: SideBarMenuProps) => {
	const [collapse, setCollapse] = useState(false);
	const sidebarRef = useRef<HTMLDivElement>(null);
	const iconRef = useRef<HTMLDivElement>(null);

	const toggleCollapse = () => {
		setCollapse((prev) => {
			const newState = !prev;

			if (sidebarRef.current) {
				gsap.to(sidebarRef.current, {
					width: newState ? "80px" : "256px",
					duration: 0.4,
					ease: "power2.inOut",
				});
			}
			if (iconRef.current) {
				gsap.to(iconRef.current, {
					rotate: newState ? "180deg" : "0deg",
					duration: 0.8,
					ease: "power2.inOut",
				});
			}

			return newState;
		});
	};

	const triggerClassName = cn(
		"rounded-full size-12 z-[999] absolute -right-6 flex items-center justify-center",
		triggerPosition === "top" && "top-4",
		triggerPosition === "center" && "top-[50%] -translate-y-1/2",
		triggerPosition === "bottom" && "bottom-4"
	);

	useEffect(() => {
		if (sidebarRef.current) {
			gsap.set(sidebarRef.current, {
				width: collapse ? "80px" : "256px",
			});
		}
	}, []);
        

	return (
		<div
			ref={sidebarRef}
			className={cn(
				"border-r border-disabled-bg relative h-screen grid grid-rows-12 w-[256px]"
			)}
		>
			{customTrigger ? (
				customTrigger({ className: triggerClassName, onClick: toggleCollapse })
			) : (
				<Button className={triggerClassName} onClick={toggleCollapse}>
					<div ref={iconRef}>
						<CaretLeft />
					</div>
				</Button>
			)}
			<div className="p-2">
				<div className="bg-black/10 h-full rounded-lg text-center content-center">
					Logo
				</div>
			</div>
			<div className="row-span-10 overflow-auto">
				<Menu collapse={collapse} items={items} />
			</div>
			<div className="p-2">
				<div className="bg-black/10 h-full rounded-lg text-center content-center">
					Footer
				</div>
			</div>
		</div>
	);
};

type MenuProps = {
	collapse: boolean;
	items: MenuItemsType;
};

export const Menu = ({ collapse, items }: MenuProps) => {
	const grouped = isGroupedMenu(items);

	return (
		<div className="w-full h-full overflow-y-auto">
			{grouped
				? // Handle grouped menu items
					items.map((group, index) => (
						<div key={`group-${index}`} className="mb-2">
							{group.title && !collapse && (
								<div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
									{group.title}
								</div>
							)}
							{group.items.map((item) => (
								<MenuItem
									key={item.key}
									item={item}
									collapse={collapse}
									level={0}
								/>
							))}
							{!collapse && index < items.length - 1 && (
								<hr className="my-2 border-gray-200" />
							)}
						</div>
					))
				: // Handle flat menu items
					items.map((item) => (
						<MenuItem
							key={item.key}
							item={item}
							collapse={collapse}
							level={0}
						/>
					))}
		</div>
	);
};

const MenuItem = ({
	item,
	collapse,
	level,
}: {
	item: MenuItemType;
	collapse: boolean;
	level: number;
}) => {
	const hasChildren = item.children && item.children.length > 0;
	const [open, setOpen] = useState(false);
	const childrenRef = useRef<HTMLDivElement>(null);

	const toggleOpen = () => {
		setOpen((prev) => {
			const newState = !prev;

			if (childrenRef.current) {
				const targets = childrenRef.current.children;
				if (newState) {
					gsap.fromTo(
						targets,
						{ opacity: 0, y: -10 },
						{
							opacity: 1,
							y: 0,
							stagger: 0.05,
							duration: 0.3,
							ease: "power2.out",
							display: "block",
						}
					);
				} else {
					gsap.to(targets, {
						opacity: 0,
						y: -10,
						stagger: 0.05,
						duration: 0.3,
						ease: "power2.in",
						onComplete: () => {
							if (childrenRef.current) {
								gsap.set(childrenRef.current.children, {
									display: "none",
								});
							}
						},
					});
				}
			}

			return newState;
		});
	};

	useEffect(() => {
		if (childrenRef.current && !open) {
			gsap.set(childrenRef.current.children, { display: "none" });
		}
	}, []);

	const handleClick = () => {
		if (item.onClick) item.onClick();
		else if (!hasChildren && item.href) {
			window.location.href = item.href;
		}
	};

	const paddingStyle = { paddingLeft: `${(level + 1) * 12}px` };

	return (
		<div className="w-full">
			<div
				onClick={hasChildren ? toggleOpen : handleClick}
				className={cn(
					"p-2 flex items-center relative gap-2 cursor-pointer hover:bg-primary hover:text-white transition-all",
					collapse && "justify-center"
				)}
				style={!collapse ? paddingStyle : undefined}
			>
				{item.icon}
				{!collapse && <Typography.P>{item.title}</Typography.P>}
				{hasChildren &&
					(collapse ? (
						<CaretRight
							className={cn(
								"absolute right-4 bottom-3 transition-transform",
								open ? "rotate-180" : "rotate-0"
							)}
							size={14}
							weight="bold"
						/>
					) : (
						<CaretDown
							className={cn(
								"absolute right-4 bottom-3 transition-transform",
								open ? "rotate-180" : "rotate-0"
							)}
							size={14}
							weight="bold"
						/>
					))}
			</div>
			{hasChildren && collapse && (
				<div
					ref={childrenRef}
					className={cn(
						"absolute left-[104%] w-48 bg-white shadow-md shadow-black/20 z-10 transition-all",
						!open && "opacity-0 pointer-events-none"
					)}
				>
					<div className="p-2">
                                                {/* @ts-ignore */}
						{item.children.map((child) => (
							<MenuItem
								key={child.key}
								item={child}
								collapse={collapse}
								level={level + 1}
							/>
						))}
					</div>
				</div>
			)}
			<div ref={childrenRef}>
				{hasChildren &&
					!collapse &&
					item.children?.map((child) => (
						<MenuItem
							key={child.key}
							item={child}
							collapse={collapse}
							level={level + 1}
						/>
					))}
			</div>
		</div>
	);
};
