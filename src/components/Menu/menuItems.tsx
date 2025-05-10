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
	Code,
	Folder,
	File,
} from "@phosphor-icons/react";

export const menuItems = [
	{
		key: "1",
		title: "Home",
		href: "/",
		icon: <House size={20} weight="duotone" />,
	},
	{
		key: "2",
		title: "Profile",
		href: "/profile",
		icon: <User size={20} weight="duotone" />,
	},
	{
		key: "3",
		title: "Settings",
		href: "/settings",
		icon: <Gear size={20} weight="duotone" />,
	},
	{
		key: "4",
		title: "About",
		href: "/about",
		icon: <Info size={20} weight="duotone" />,
	},
	{
		key: "5",
		title: "Help",
		href: "/help",
		icon: <Question size={20} weight="duotone" />,
	},
	{
		key: "6",
		title: "Others",
		icon: <FileText size={20} weight="duotone" />,
		children: [
			{
				key: "6-1",
				title: "Privacy Policy",
				href: "/privacy-policy",
				icon: <ShieldCheck size={18} weight="regular" />,
			},
			{
				key: "6-2",
				title: "Terms of Service",
				href: "/terms",
				icon: <FileText size={18} weight="regular" />,
			},
			{
				key: "6-3",
				title: "Documentation",
				icon: <BookOpen size={18} weight="regular" />,
				children: [
					{
						key: "6-3-1",
						title: "API Reference",
						href: "/docs/api",
						icon: <Code size={16} weight="duotone" />,
					},
					{
						key: "6-3-2",
						title: "Guides",
						icon: <Folder size={16} weight="duotone" />,
						children: [
							{
								key: "6-3-2-1",
								title: "Getting Started",
								href: "/docs/guides/getting-started",
								icon: <File size={14} weight="duotone" />,
							},
							{
								key: "6-3-2-2",
								title: "Advanced Usage",
								href: "/docs/guides/advanced",
								icon: <File size={14} weight="duotone" />,
							},
						],
					},
				],
			},
		],
	},
];

export const menuItems = [
	{
		title: "Main",
		items: [
			{
				key: "1",
				title: "Home",
				href: "/",
				icon: <House size={20} weight="duotone" />,
			},
			{
				key: "2",
				title: "Profile",
				href: "/profile",
				icon: <User size={20} weight="duotone" />,
			},
			{
				key: "3",
				title: "Settings",
				href: "/settings",
				icon: <Gear size={20} weight="duotone" />,
			},
		],
	},
	{
		title: "Support",
		items: [
			{
				key: "4",
				title: "About",
				href: "/about",
				icon: <Info size={20} weight="duotone" />,
			},
			{
				key: "5",
				title: "Help",
				href: "/help",
				icon: <Question size={20} weight="duotone" />,
			},
		],
	},
	{
		title: "Legal & Docs",
		items: [
			{
				key: "6",
				title: "Others",
				icon: <FileText size={20} weight="duotone" />,
				children: [
					{
						key: "6-1",
						title: "Privacy Policy",
						href: "/privacy-policy",
						icon: <ShieldCheck size={18} weight="regular" />,
					},
					{
						key: "6-2",
						title: "Terms of Service",
						href: "/terms",
						icon: <FileText size={18} weight="regular" />,
					},
					{
						key: "6-3",
						title: "Documentation",
						icon: <BookOpen size={18} weight="regular" />,
						children: [
							{
								key: "6-3-1",
								title: "API Reference",
								href: "/docs/api",
								icon: <Code size={16} weight="duotone" />,
							},
							{
								key: "6-3-2",
								title: "Guides",
								icon: <Folder size={16} weight="duotone" />,
								children: [
									{
										key: "6-3-2-1",
										title: "Getting Started",
										href: "/docs/guides/getting-started",
										icon: <File size={14} weight="duotone" />,
									},
									{
										key: "6-3-2-2",
										title: "Advanced Usage",
										href: "/docs/guides/advanced",
										icon: <File size={14} weight="duotone" />,
									},
								],
							},
						],
					},
				],
			},
		],
	},
];
