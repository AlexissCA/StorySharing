import { createContext, useContext, useState, useRef, cloneElement, useEffect } from "react";
import { createPortal } from "react-dom";

const PopupContext = createContext();

export default function Popup({ children, isOpenOutside = false, closeOutside }) {
	const [isOpen, setIsOpen] = useState(isOpenOutside);
	const popupRef = useRef(null);
	const openRef = useRef(null);
	const closeRef = useRef(null);
	const open = () => setIsOpen(true);
	const close = () => {
		setIsOpen(false);
		if (closeOutside) closeOutside();
	};

	useEffect(() => setIsOpen(isOpenOutside), [isOpenOutside]);

	useEffect(() => {
		function handleClick(e) {
			if (!isOpen && openRef.current?.contains(e.target)) open();
			else if (closeRef.current?.contains(e.target) || (popupRef.current && !popupRef.current.contains(e.target))) {
				close();
			}
		}
		document.addEventListener("click", handleClick);

		return () => document.removeEventListener("click", handleClick);
	}, [isOpen, close, open]);

	return <PopupContext.Provider value={{ isOpen, popupRef, openRef, closeRef, close }}>{children}</PopupContext.Provider>;
}

function Open({ children}) {
	const { openRef } = useContext(PopupContext);

	return children(openRef);
}

function Window({ children, asPortal = true }) {
	const { isOpen, popupRef, closeRef, close } = useContext(PopupContext);

	if (!isOpen) return;
	const element = cloneElement(children, { popupRef, closeRef, closePopup: close });

	return asPortal ? createPortal(element, document.body) : element;
}

Popup.Open = Open;
Popup.Window = Window;
