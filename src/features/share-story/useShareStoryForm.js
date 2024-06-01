import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAddStories from "./useAddStories";
import { useUser } from "../../features/authentication/useUser";
import useUnfocus from "../../hooks/useUnfocus";
import useHandleTextArea from "../../hooks/useHandleTextarea";
import { NOTIFICATION_MESSAGE_DURATION } from "../../utils/constants";

export default function useShareStoryForm() {
	const { user } = useUser();
	const [title, setTitle] = useState("");
	const [titleErrorCode, setTitleErrorCode] = useState("");
	const [text, setText] = useState("");
	const [textErrorCode, setTextErrorCode] = useState("");
	const [imageFile, setImageFile] = useState("");
	const [notify, setNotify] = useState(true);
	const [isConnectionError, setIsConnectionError] = useState(false);
	const [ref, looseFocus] = useUnfocus();
	const { isPending, mutate } = useAddStories(onSuccess, onError);
	const [textareaRef, handleTextareaHeight] = useHandleTextArea([isPending, isConnectionError]);
	const navigate = useNavigate();
	const timeoutNetworkErrorIdRef = useRef(null);

	useEffect(() => {
		return () => {
			if (timeoutNetworkErrorIdRef?.current) clearTimeout(timeoutNetworkErrorIdRef.current);
		};
	}, []);

	async function handleSubmit(e) {
		e.preventDefault();
		looseFocus();

		const isFieldError = validateFields();

		if (!isFieldError) {
			const story = { title, text, author_id: user.id };

			mutate([{story, imageFile, notify}]);
		}
	}

	function onSuccess() {
		navigate("/");
	}

	function onError() {
		setIsConnectionError(true);
		timeoutNetworkErrorIdRef.current = setTimeout(() => setIsConnectionError(false), NOTIFICATION_MESSAGE_DURATION);
	}

	function validateFields() {
		let isError = false;
		if (!title) {
			setTitleErrorCode("no title");
			isError = true;
		}
		if (!text) {
			setTextErrorCode("no story");
			isError = true;
		}
		return isError;
	}

	function handleText(e) {
		setText(e.target.value);
		handleTextareaHeight();
	}

	function handleAddImageFile(e) {
		const file = e.target.files[0];
		if (file) {
			const url = URL.createObjectURL(file);
			file.url = url;
			setImageFile(file);
		}
	}

	function clearError(e) {
		const type = e.target.name;
		if (type === "title") setTitleErrorCode("");
		else if (type === "text") setTextErrorCode("");
	}

	return {
		title,
		setTitle,
		titleErrorCode,
		text,
		textErrorCode,
		imageFile,
		setImageFile,
		notify,
		setNotify,
		isPending,
		isConnectionError,
		ref,
		textareaRef,
		handleSubmit,
		handleText,
		handleAddImageFile,
		clearError,
	};
}
