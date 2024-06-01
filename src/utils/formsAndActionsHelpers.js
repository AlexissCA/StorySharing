export const ERROR_PLACEHOLDER = "e";
export const MIN_LENGTH = 3;
export const MIN_PASSWORD_LENGTH = 6;
export const MAX_LENGTH = 20;
export const MAX_USERNAME_LENGTH = 15;
export const PASSWORD_INSTRUCTION = `${MIN_PASSWORD_LENGTH}-${MAX_LENGTH} characters, 1 special character, 1 number`;
export const USERNAME_INSTRUCTION = `${MIN_LENGTH}-${MAX_USERNAME_LENGTH} characters`;
export const PASSWORD_CHANGE_INFO = "*required to update password";

export const ERROR_MESSAGES = {
	"email empty": "Email address is required",
	"email invalid": "Enter a valid email address",
	"password empty": "Password is required",
	"password invalid": "Enter a valid password as specified above",
	"password2 empty": "Password confirmation is required",
	"passwords unmatched": "Passwords do not match",
	"username empty": "Username is required",
	"username invalid": "Enter at least 3 non-empty characters",
	"login backend": "Provided email or password is incorrect",
	"password backend": "Password is incorrect",
	"register email backend": "Email address doesn't match any invited account",
	"register username backend": "Username is already taken",
	"no title": "Enter story title",
	"no story": "Enter story description",
	"old password incorrect backend": "Password is incorrect",
	"general backend error": "Something went wrong. Please try again later",
	"not found": "Oops... Page Not Found",
	"render error": "Oops... Something went wrong. Please refresh the page or try again later",
	"already a member": "You are already a member",
	"member already registered": "The member is already registered",
	"member already invited": "The member is already invited",
};

export const SUCCESS_MESSAGES = {
	"invitation sent": "Invitation sent successfully",
	"settings updated": "Profile updated successfully",
	"registration success": "Welcome! To get started, please confirm your email address by clicking the link in the email we just sent you",
};

const CONFIRMATION_MESSAGE_BASE = "Are you sure you want to ";
export const CONFIRMATION_MESSAGES = {
	"delete all stories": CONFIRMATION_MESSAGE_BASE + "delete all stories?",
	"delete story": CONFIRMATION_MESSAGE_BASE + "delete this story?",
	"delete all members": CONFIRMATION_MESSAGE_BASE + "delete all members?",
	"delete member": CONFIRMATION_MESSAGE_BASE + "delete this member?",
};

export const MESSAGES = {
	"no stories": "No stories yet!",
	"no user stories": "You haven’t published any stories yet",
	"no members": "No members yet!",
};

export function isValidEmail(s) {
	return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/.test(s);
}

export function isValidUsernameLength(s) {
	s = s.trim();
	return s.length >= MIN_LENGTH && s.length <= MAX_LENGTH;
}

export function isValidPasswordLength(s) {
	s = s.trim();
	return s.length >= MIN_PASSWORD_LENGTH && s.length <= MAX_LENGTH;
}


export function isValidPassword(s) {
	return isValidPasswordLength(s) && /\d/.test(s) && /[!@#$%^&*()_+\-=[\]{};':"|,.<>/?]/.test(s);
}
