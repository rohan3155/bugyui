// index.tsx
import { Button } from "@/components/button/Button";
import DatePicker from "@/components/datepicker/DatePicker";
import { DateRangePicker } from "@/components/datepicker/DateRangePicker";
import { DateTimePicker } from "@/components/datepicker/DateTimePicker";
import { Modal } from "@/components/modal/Modal";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	// const [showModal, setShowModal] = useState(false);

	// console.log("RouteComponent render:", { showModal });

	return (
		<div className="p-4">
                        {/* <DatePicker/>
                        <div>
				<h2 className="text-xl font-medium mb-2">Date Range Picker</h2>
				<DateRangePicker />
			</div>

			<div>
				<h2 className="text-xl font-medium mb-2">Date & Time Picker</h2>
				<DateTimePicker />
			</div> */}
			{/* <Modal
				open={showModal}
				onClose={() => {
					console.log("Modal onClose triggered");
					setShowModal(false);
				}}
				title="Confirm Action"
				onOk={() => {
					console.log("Confirmed");
					setShowModal(false);
				}}
				onCancel={() => {
					console.log("Cancelled");
					setShowModal(false);
				}}
				okText="Yes"
				cancelText="No"
				maskClosable={true}
				keyboard={true}
				closable={true}
				destroyOnClose={true}
				width="50vw"
				height="50vh"
				// style={{ maxWidth: "100vw", maxHeight: "100vh" }}
				bodyStyle={{ padding: "24px" }}
			>
				<p className="text-lg">Are you sure you want to perform this action?</p>
			</Modal>
			<Button
				onClick={() => {
					console.log("Button clicked, setting showModal to true");
					setShowModal(true);
				}}
			>
				Open Modal
			</Button> */}
		</div>
	);
}
