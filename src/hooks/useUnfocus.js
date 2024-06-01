import { useRef } from "react";

export default function useUnfocus() {
	const ref = useRef(null);

	function looseFocus() {
		ref.current.blur();
	}

	return [ref, looseFocus];
}
