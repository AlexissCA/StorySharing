import { useRef, useEffect } from "react";
import { TEXTAREA_MIN_HEIGHT } from "../utils/constants";

export default function useHandleTextarea(dependencies = []) {
	const textareaRef = useRef(null);

	useEffect(handleTextareaHeight, dependencies);

	function handleTextareaHeight() {
		if (textareaRef?.current) {
			textareaRef.current.style.height = "auto";
			textareaRef.current.style.height = Math.max(TEXTAREA_MIN_HEIGHT, textareaRef.current.scrollHeight) + "px";
		}
	}

	return [textareaRef, handleTextareaHeight];
}
