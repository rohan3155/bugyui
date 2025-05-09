import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
export const Loader = () => {
	useGSAP(() => {
		const tl = gsap.timeline();
		tl.to(".loader", {
			duration: 1,
			rotation: 360,
			repeat: -1,
			ease: "linear",
			transformOrigin: "center center",
		});
	}, []);
	return (
		<div className="bg-transparent size-[1rem] loader border-amber-50 border-2 border-t-0 border-l-0 rounded-full" />
	);
};
