import { Grid, Cols, Rows } from "@/grid/Grid";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<div className="p-6 space-y-8">
				{/* Grid with 12 columns (default), centered, middle-aligned, with gutter of 6 */}
				<Grid justify="center" align="middle" gutter={6}>
					<Cols span={6} sm={3} className="p-4 bg-blue-200 rounded">
						Left
					</Cols>
					<Cols span={6} sm={2} className="p-4 bg-green-200 rounded">
						Right
					</Cols>
				</Grid>
                                

				{/* Default Grid (12 columns) with gutter of 4 */}
				<Grid gutter={4}>
					<Cols span={12} sm={6} md={4} className="p-4 bg-red-200 rounded">
						Box 1
					</Cols>
					<Cols span={12} sm={6} md={4} className="p-4 bg-orange-200 rounded">
						Box 2
					</Cols>
					<Cols span={12} sm={6} md={4} className="p-4 bg-teal-200 rounded">
						Box 3
					</Cols>
				</Grid>
			</div>
		</div>
	);
}
