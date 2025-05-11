import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { gsap } from "gsap";
import { Typography } from "../typography/Typography";
import { CaretDown, CaretRight } from "@phosphor-icons/react";
import { flatMenuItems } from "./menuItems";

// Define the types for menu items (reused from SideBarMenu)
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

type NavBarMenuProps = {
	items?: MenuItemsType; // Allow custom menu items to be passed
};

export const NavBarMenu = ({ items = menuItems }: NavBarMenuProps) => {
	return (
		<div className="w-full min-h-20 bg-white shadow-md flex items-center justify-center border-b border-gray-200">
			<div className="flex items-center justify-between  size-full gap-4 px-4">
				<div className="bg-black/10 py-2 px-4 rounded-lg text-center">Logo</div>
				<Menu items={items} />
				<div className="bg-black/10 py-2 px-4 rounded-lg text-center">Logo</div>
			</div>
		</div>
	);
};

type MenuProps = {
	items: MenuItemsType;
};

export const Menu = ({ items }: MenuProps) => {
	const grouped = isGroupedMenu(items);

	return (
		<div className="flex items-center gap-2">
			{grouped
				? items.map((group, index) => (
						<div key={`group-${index}`} className="flex items-center gap-2">
							{group.items.map((item) => (
								<MenuItem key={item.key} item={item} level={0} />
							))}
						</div>
					))
				: items.map((item) => (
						<MenuItem key={item.key} item={item} level={0} />
					))}
		</div>
	);
};

const MenuItem = ({ item, level }: { item: MenuItemType; level: number }) => {
	const hasChildren = item.children && item.children.length > 0;
	const [open, setOpen] = useState(false);
	const childrenRef = useRef<HTMLDivElement>(null);
	const itemRef = useRef<HTMLDivElement>(null);

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

		const handleClickOutside = (event: MouseEvent) => {
			if (
				itemRef.current &&
				!itemRef.current.contains(event.target as Node) &&
				childrenRef.current &&
				!childrenRef.current.contains(event.target as Node)
			) {
				setOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [open]);

	const handleClick = () => {
		if (item.onClick) item.onClick();
		else if (!hasChildren && item.href) {
			window.location.href = item.href;
		}
	};

	return (
		<div ref={itemRef} className="relative">
			<div
				onClick={hasChildren ? toggleOpen : handleClick}
				className={cn(
					"p-2 flex items-center gap-2 cursor-pointer hover:bg-primary hover:text-white transition-all rounded",
					level > 0 && "pl-4"
				)}
			>
				{item.icon}
				<Typography.P>{item.title}</Typography.P>
				{hasChildren && (
					<CaretDown
						className={cn(
							"transition-transform",
							open ? "rotate-180" : "rotate-0"
						)}
						size={14}
						weight="bold"
					/>
				)}
			</div>
			{hasChildren && (
				<div
					ref={childrenRef}
					className={cn(
						"absolute top-full left-0 w-48 bg-white shadow-md shadow-black/20 z-10 transition-all",
						!open && "opacity-0 pointer-events-none"
					)}
				>
					<div className="p-2">
						{item.children?.map((child) => (
							<MenuItem key={child.key} item={child} level={level + 1} />
						))}
					</div>
				</div>
			)}
		</div>
	);
};
