import useShareStoryForm from "./useShareStoryForm";
import { shortenFileName } from "../../utils/stringHelpers";
import MainContainer from "../../ui/MainContainer";
import ErrorMessage from "../../ui/ErrorMessage";
import Spinner from "../../ui/Spinner";
import InputErrorMessage from "../../ui/InputErrorMessage";
import CloseIcon from "../../ui/CloseIcon";
import CheckboxGroup from "../../ui/CheckboxGroup";
import styles from "./ShareStoryForm.module.css";

export default function ShareStoryForm() {
	const {
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
	} = useShareStoryForm();

	return (
		<MainContainer>
			<form className={`${styles["share-story-form"]} solid-bg`} onSubmit={handleSubmit} noValidate>
				<h2 className={styles["share-story-form-title"]}>Share Story</h2>
				{isConnectionError ? (
					<ErrorMessage margin="12.05rem" />
				) : isPending ? (
					<Spinner margin="8rem" />
				) : (
					<>
						<>
							<label htmlFor="title">Title</label>
							<input
								id="title"
								name="title"
								type="text"
								className={titleErrorCode ? "error-input" : ""}
								value={title}
								onChange={e => setTitle(e.target.value)}
								onFocus={clearError}
							/>
							<InputErrorMessage errorCode={titleErrorCode} />
						</>
						<>
							<label htmlFor="text">Story</label>
							<textarea
								id="text"
								name="text"
								className={textErrorCode ? "textarea error-input" : "textarea"}
								value={text}
								onChange={handleText}
								onFocus={clearError}
								ref={textareaRef}></textarea>
							<InputErrorMessage errorCode={textErrorCode} />
						</>
						<div className={styles["share-story-img-group"]}>
							<div className={styles["share-story-img-input-container"]}>
								<label htmlFor="story-img" className="btn btn-1 file-input-overlay-btn">
									Add image
								</label>
								<input id="story-img" name="story-img" type="file" accept="image/*" onChange={handleAddImageFile} />
							</div>
							{imageFile && (
								<>
									<img src={imageFile.url} className={styles["share-story-img-icon"]} alt="story illustration icon" />
									<span className={styles["share-story-img-file-name"]}>{shortenFileName(imageFile.name)}</span>
									<CloseIcon className={styles["share-story-img-delete"]} onClick={() => setImageFile("")} />
								</>
							)}
						</div>
						<CheckboxGroup
							id="notify"
							label="//TODO Notify Everybody"
							checked={notify}
							toggleNotify={() => setNotify(st => !st)}
							className={styles["share-story-form_checkbox-group"]}
						/>
						<input type="submit" value="Share Story" className="btn btn-2" ref={ref} />
					</>
				)}
			</form>
		</MainContainer>
	);
}
