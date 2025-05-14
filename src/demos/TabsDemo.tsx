import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Tabs } from "@/components/tabs/Tabs";
import {
        House,
        ChatCircle,
        Gear,
        Plus,
        X,
        DotsThreeOutline,
} from "@phosphor-icons/react";

export const Route = createFileRoute("/")({
        component: RouteComponent,
});

function generateTabs(withClosable = false, count = 3) {
        const icons = [House, ChatCircle, Gear, DotsThreeOutline];
        const tabs = Array.from({ length: count }, (_, i) => {
                const key = i < 3 ? ["home", "chat", "settings"][i] : `tab_${i + 1}`;
                const label = i < 3 ? ["Home", "Chat", "Settings"][i] : `Tab ${i + 1}`;
                const Icon = icons[i % icons.length];
                return {
                        key,
                        label,
                        icon: <Icon size={16} />,
                        children: <div>{label} content</div>,
                        closable: withClosable,
                        closeIcon: <X size={12} />,
                };
        });
        return tabs;
}

function RouteComponent() {
        // State for each variant to manage tab order
        const [tabStates, setTabStates] = useState<{
                [key: string]: {
                        items: ReturnType<typeof generateTabs>;
                        activeKey: string;
                };
        }>({
                line: { items: generateTabs(), activeKey: "home" },
                outlined: { items: generateTabs(), activeKey: "home" },
                pill: { items: generateTabs(), activeKey: "home" },
                "editable-card": { items: generateTabs(true), activeKey: "home" },
                card: { items: generateTabs(), activeKey: "home" },
                underline: { items: generateTabs(), activeKey: "home" },
                "border-partial": { items: generateTabs(), activeKey: "home" },
                "shadow-card": { items: generateTabs(), activeKey: "home" },
                "rounded-card": { items: generateTabs(), activeKey: "home" },
                "many-tabs-horizontal": {
                        items: generateTabs(true, 12),
                        activeKey: "home",
                },
                "many-tabs-vertical": { items: generateTabs(true, 12), activeKey: "home" },
        });

        const handleEdit = (
                targetKey: string | React.MouseEvent,
                action: "add" | "remove",
                variant: string
        ) => {
                setTabStates((prev) => {
                        const current = { ...prev[variant] };
                        if (action === "add") {
                                const newKey = `new_${Date.now()}`;
                                current.items = [
                                        ...current.items,
                                        {
                                                key: newKey,
                                                label: `New`,
                                                icon: <DotsThreeOutline size={16} />,
                                                children: <div>New Tab Content</div>,
                                                closable: true,
                                                closeIcon: <X size={12} />,
                                        },
                                ];
                                current.activeKey = newKey;
                        } else if (action === "remove" && typeof targetKey === "string") {
                                current.items = current.items.filter((tab) => tab.key !== targetKey);
                                if (current.activeKey === targetKey) {
                                        current.activeKey = current.items[0]?.key || "";
                                }
                        }
                        return { ...prev, [variant]: current };
                });
        };

        const handleDragEnd = (
                newItems: (typeof tabStates)[string]["items"],
                variant: string
        ) => {
                setTabStates((prev) => ({
                        ...prev,
                        [variant]: { ...prev[variant], items: newItems },
                }));
        };

        const handleChange = (activeKey: string, variant: string) => {
                setTabStates((prev) => ({
                        ...prev,
                        [variant]: { ...prev[variant], activeKey },
                }));
        };

        const variants = [
                { type: "line", title: "Line Variant" },
                { type: "outlined", title: "Outlined Variant" },
                { type: "pill", title: "Pill Variant" },
                { type: "editable-card", title: "Editable Card Variant" },
                { type: "card", title: "Card Variant" },
                { type: "underline", title: "Underline Variant" },
                { type: "border-partial", title: "Border Partial Variant" },
                { type: "shadow-card", title: "Shadow Card Variant" },
                { type: "rounded-card", title: "Rounded Card Variant" },
        ] as const;

        return (
                <div className="flex flex-col gap-12 p-8 w-full">
                        {/* Horizontal Tabs */}
                        <div>
                                <h1 className="text-2xl font-bold mb-6">
                                        Horizontal Tabs (tabPosition="top")
                                </h1>
                                <div className="flex flex-col gap-12 items-center">
                                        {variants.map((variant) => (
                                                <div key={variant.type} className="w-full max-w-2xl">
                                                        <h2 className="text-lg font-semibold mb-4">{variant.title}</h2>
                                                        <Tabs
                                                                type={variant.type}
                                                                items={tabStates[variant.type].items}
                                                                activeKey={tabStates[variant.type].activeKey}
                                                                defaultActiveKey="home"
                                                                onChange={(key) => handleChange(key, variant.type)}
                                                                onEdit={(key, action) => handleEdit(key, action, variant.type)}
                                                                onDragEnd={(items) => handleDragEnd(items, variant.type)}
                                                                addIcon={<Plus size={16} />}
                                                                removeIcon={<X size={14} />}
                                                                tabBarGutter={8}
                                                                animated={{ inkBar: true, tabPane: true }}
                                                                size="middle"
                                                                tabPosition="top"
                                                                centered={false}
                                                                sliderEnabled={false}
                                                                dropdownEnabled={false}
                                                                rearrangable={true}
                                                                rearrangableWithSorting={true}
                                                        />
                                                </div>
                                        ))}
                                </div>
                        </div>

                        {/* Vertical Tabs */}
                        <div>
                                <h1 className="text-2xl font-bold mb-6">
                                        Vertical Tabs (tabPosition="left")
                                </h1>
                                <div className="flex flex-col gap-12">
                                        {variants.map((variant) => (
                                                <div key={variant.type} className="w-full">
                                                        <h2 className="text-lg font-semibold mb-4">{variant.title}</h2>
                                                        <Tabs
                                                                type={variant.type}
                                                                items={tabStates[variant.type].items}
                                                                activeKey={tabStates[variant.type].activeKey}
                                                                defaultActiveKey="home"
                                                                onChange={(key) => handleChange(key, variant.type)}
                                                                onEdit={(key, action) => handleEdit(key, action, variant.type)}
                                                                onDragEnd={(items) => handleDragEnd(items, variant.type)}
                                                                addIcon={<Plus size={16} />}
                                                                removeIcon={<X size={14} />}
                                                                tabBarGutter={8}
                                                                animated={{ inkBar: true, tabPane: true }}
                                                                size="middle"
                                                                tabPosition="left"
                                                                centered={false}
                                                                sliderEnabled={false}
                                                                dropdownEnabled={false}
                                                                rearrangable={true}
                                                                rearrangableWithSorting={true}
                                                        />
                                                </div>
                                        ))}
                                </div>
                        </div>

                        {/* 10+ Tabs Demo */}
                        <div>
                                <h1 className="text-2xl font-bold mb-6">
                                        10+ Tabs Demo (with Slider, Dropdown, and Drag-and-Drop)
                                </h1>
                                <div className="flex flex-col gap-12 items-center">
                                        <div className="w-full max-w-2xl">
                                                <h2 className="text-lg font-semibold mb-4">
                                                        Horizontal (Editable Card)
                                                </h2>
                                                <Tabs
                                                        type="editable-card"
                                                        items={tabStates["many-tabs-horizontal"].items}
                                                        activeKey={tabStates["many-tabs-horizontal"].activeKey}
                                                        defaultActiveKey="home"
                                                        onChange={(key) => handleChange(key, "many-tabs-horizontal")}
                                                        onEdit={(key, action) =>
                                                                handleEdit(key, action, "many-tabs-horizontal")
                                                        }
                                                        onDragEnd={(items) =>
                                                                handleDragEnd(items, "many-tabs-horizontal")
                                                        }
                                                        addIcon={<Plus size={16} />}
                                                        removeIcon={<X size={14} />}
                                                        tabBarGutter={8}
                                                        animated={{ inkBar: true, tabPane: true }}
                                                        size="middle"
                                                        tabPosition="top"
                                                        centered={false}
                                                        sliderEnabled={true}
                                                        dropdownEnabled={true}
                                                        rearrangable={true}
                                                        rearrangableWithSorting={true}
                                                        maxVisibleTabs={10}
                                                />
                                        </div>
                                        <div className="w-full">
                                                <h2 className="text-lg font-semibold mb-4">
                                                        Vertical (Editable Card)
                                                </h2>
                                                <Tabs
                                                        type="editable-card"
                                                        items={tabStates["many-tabs-vertical"].items}
                                                        activeKey={tabStates["many-tabs-vertical"].activeKey}
                                                        defaultActiveKey="home"
                                                        onChange={(key) => handleChange(key, "many-tabs-vertical")}
                                                        onEdit={(key, action) =>
                                                                handleEdit(key, action, "many-tabs-vertical")
                                                        }
                                                        onDragEnd={(items) => handleDragEnd(items, "many-tabs-vertical")}
                                                        addIcon={<Plus size={16} />}
                                                        removeIcon={<X size={14} />}
                                                        tabBarGutter={8}
                                                        animated={{ inkBar: true, tabPane: true }}
                                                        size="middle"
                                                        tabPosition="left"
                                                        centered={false}
                                                        sliderEnabled={true}
                                                        dropdownEnabled={true}
                                                        rearrangable={true}
                                                        rearrangableWithSorting={true}
                                                        maxVisibleTabs={10}
                                                />
                                        </div>
                                </div>
                        </div>
                </div>
        );
}
