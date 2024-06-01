import { useEffect, useRef, useState } from "react";
import useUnfocus from "../../../hooks/useUnfocus";
import { NOTIFICATION_MESSAGE_DURATION } from "../../../utils/constants";
import { isValidEmail } from "../../../utils/formsAndActionsHelpers";
import { isAlreadyAMember } from "../../../services/apiMembers";
import { useAddInvtation } from "./useInviteMembersApi";
import { isInvitedMember } from "../../../services/apiInviteMember";

export default function useInviteMember() {
	const [email, setEmail] = useState("");
	const [emailErrorCode, setEmailErrorCode] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isConnectionError, setIsConnectionError] = useState(false);
	const [isAlreadyAMemberError, setIsAlreadyAMemberError] = useState(false);
	const [isAlreadyInvitedError, setIsAlreadyInvitedError] = useState(false);
	const [isSent, setIsSent] = useState(false);
	const [ref, looseFocus] = useUnfocus();
	const timeoutSuccessIdRef = useRef(null);
	const timeoutAlreadyAMemberIdRef = useRef(null);
	const timeoutAlreadyInvitedIdRef = useRef(null);
	const { mutateAsync: inviteMemberApi } = useAddInvtation();

	useEffect(() => {
		return () => {
			if (timeoutSuccessIdRef?.current) clearTimeout(timeoutSuccessIdRef.current);
			if (timeoutAlreadyAMemberIdRef?.current) clearTimeout(timeoutAlreadyAMemberIdRef.current);
			if (timeoutAlreadyInvitedIdRef?.current) clearTimeout(timeoutAlreadyInvitedIdRef.current);
		};
	}, []);

	async function handleSubmit(e, closePopup) {
		e.preventDefault();
		const isEmailFieldError = validateEmail();

		if (!isEmailFieldError) {
			setIsLoading(true);

			const isAlreadyMember = await checkIfIsAlreadyAMember();
			if (isAlreadyMember) {
				setIsLoading(false);
				return;
			}

			const isAlreadyInvited = await checkIfIsAlreadyInvited();
			if (isAlreadyInvited) {
				setIsLoading(false);
				return;
			}

			await inviteMember(closePopup);

			setIsLoading(false);
		}
	}

	async function inviteMember(closePopup) {
		try {
			await inviteMemberApi(email);
			onInviteSuccess(closePopup);
		} catch (e) {
			onInviteError();
		}
	}

	function onInviteSuccess(closePopup) {
		setIsSent(true);
		timeoutSuccessIdRef.current = setTimeout(closePopup, NOTIFICATION_MESSAGE_DURATION);
	}

	function onInviteError() {
		setIsConnectionError(true);
	}

	async function checkIfIsAlreadyAMember() {
		try {
			const isAlreadyMember = await isAlreadyAMember(email);
			if (isAlreadyMember) {
				onIsAlreadyAMember();
				return true;
			} else return false;
		} catch (e) {
			onConnectionError();
			return true;
		}
	}

	function onIsAlreadyAMember() {
		setIsAlreadyAMemberError(true);
		timeoutAlreadyAMemberIdRef.current = setTimeout(() => {
			setIsAlreadyAMemberError(false);
		}, NOTIFICATION_MESSAGE_DURATION);
	}

	async function checkIfIsAlreadyInvited() {
		try {
			const isAlreadyInvited = await isInvitedMember(email);
			if (isAlreadyInvited) {
				onIsAlreadyAInvited();
				return true;
			} else return false;
		} catch (e) {
			onConnectionError();
			return true;
		}
	}

	function onIsAlreadyAInvited() {
		setIsAlreadyInvitedError(true);
		timeoutAlreadyInvitedIdRef.current = setTimeout(() => {
			setIsAlreadyInvitedError(false);
		}, NOTIFICATION_MESSAGE_DURATION);
	}

	function onConnectionError() {
		setIsConnectionError(true);
	}

	function validateEmail() {
		let isError = false;
		if (!email) {
			setEmailErrorCode("email empty");
			isError = true;
		} else if (!isValidEmail(email)) {
			setEmailErrorCode("email invalid");
			isError = true;
		}
		return isError;
	}

	return {
		email,
		setEmail,
		emailErrorCode,
		setEmailErrorCode,
		isLoading,
		isConnectionError,
		isAlreadyAMemberError,
		isAlreadyInvitedError,
		isSent,
		ref,
		handleSubmit,
		looseFocus,
	};
}
