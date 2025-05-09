import { useRef, useState } from "react";

export const useHistoryState = <T>(initialState: T) => {
	const [state, setState] = useState<T>(initialState);
	const history = useRef<T[]>([initialState]);
	const historyIndex = useRef<number>(0);

	const setHistoryState = (newState: T) => {
		history.current = history.current.slice(0, historyIndex.current + 1);
		history.current.push(newState);
		historyIndex.current++;
		setState(newState);
	};

	const undo = () => {
		if (historyIndex.current > 0) {
			historyIndex.current--;
			setState(history.current[historyIndex.current]);
		}
	};

	const redo = () => {
		if (historyIndex.current < history.current.length - 1) {
			historyIndex.current++;
			setState(history.current[historyIndex.current]);
		}
	};

	return [state, setHistoryState, undo, redo] as const;
};
