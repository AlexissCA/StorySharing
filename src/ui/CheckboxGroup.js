import styles from "./CheckboxGroup.module.css";

export default function CheckboxGroup({ id, label, checked, toggleNotify, className = "" }) {
	return (
		<div className={`${styles["checkbox-group"]} ${className}`}>
			<label htmlFor={id}>{label}</label>
			<input type="checkbox" id={id} name={id} checked={checked} onChange={toggleNotify} tabIndex="-1" />
		</div>
	);
}
