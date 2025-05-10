import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { DropDown } from "@/components/dropdown/DropDown";
import { CaretDown } from "@phosphor-icons/react";
import { Button } from "@/components/button/Button";

// Defining the route for the component
export const Route = createFileRoute("/")({
	component: RouteComponent,
});

// Route component where DropDown is used
function RouteComponent() {
	// Options for the dropdown
	const options = [
		{
			label: "Option 1",
			value: "option1",
			// icon: <FaBeer />,
			onSelect: (value: string) => console.log("Selected:", value),
		},
		{
			label: "Option 2",
			value: "option2",
			onSelect: (value: string) => console.log("Selected:", value),
		},
		{
			label: "Option 3",
			value: "option3",
			onSelect: (value: string) => console.log("Selected:", value),
		},
	];

	// Using DropDown component
	return (
		<div className="h-screen flex justify-center items-center">
			<DropDown
				worksOnClick
				// worksOnHover
				// directionAgnostic
                                openFrom="bottom"
				onSelect={(val) => console.log("Selected:", val)}
				options={Array.from(Array(10).keys()).map((i) => ({
					label: `Option ${i + 1}`,
					value: `option${i + 1}`,
					onSelect: (value: string) => console.log("Selected:", value),
				}))}
                                ContentFooter={({ className }) => (
					<div className={className}>
						<p>Content Footer</p>
					</div>
				)}
				trigger={({ onClick, iconRef }) => (
					<Button
						onClick={onClick}
						className="p-2 bg-blue-600 text-white rounded flex items-center"
					>
						Custom Trigger
						<CaretDown ref={iconRef} className="w-4 h-4 ml-2" />
					</Button>
				)}
			/>
		</div>
	);
}
