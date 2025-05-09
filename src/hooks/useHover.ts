import { useCallback, useState } from "react";

export const useHover = (): [(node: HTMLElement | null) => void, boolean] => {
	const [isHovering, setIsHovering] = useState(false);

	const handleMouseOver = () => setIsHovering(true);
	const handleMouseOut = () => setIsHovering(false);

	const ref = useCallback((node: HTMLElement | null) => {
		if (node) {
			node.addEventListener("mouseover", handleMouseOver);
			node.addEventListener("mouseout", handleMouseOut);

			return () => {
				node.removeEventListener("mouseover", handleMouseOver);
				node.removeEventListener("mouseout", handleMouseOut);
			};
		}
	}, []);

	return [ref, isHovering];
};
