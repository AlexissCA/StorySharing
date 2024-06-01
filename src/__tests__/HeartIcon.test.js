import { render, screen } from "@testing-library/react";
import HeartIcon from "../ui/HeartIcon";
import styles from "../ui/HeartIcon.module.css";

const ID = 4;

describe("HeartIcon", () => {
	test("renders correctly with fillValue 1", () => {
		render(<HeartIcon id={ID} fillValue={1} />);

		const icon = screen.getByTestId("heart-icon");
		expect(icon).toHaveClass(styles["heart-icon-" + ID]);

		const iconMask = screen.queryByTestId("heart-icon-mask");
		expect(iconMask).not.toBeInTheDocument();
	});

	test("renders correctly with fillValue 0.5", () => {
		render(<HeartIcon id={ID} fillValue={0.5} />);

		const iconMask = screen.getByTestId("heart-icon-mask");
		expect(iconMask).toBeInTheDocument();
		expect(iconMask.style.width).toBe("50%");
	});

	test("renders correctly with fillValue 0", () => {
		render(<HeartIcon id={ID} />);

		const icon = screen.getByTestId("heart-icon");
		expect(icon).not.toHaveClass(styles["heart-icon-" + ID]);

		const iconMask = screen.queryByTestId("heart-icon-mask");
		expect(iconMask).not.toBeInTheDocument();
	});

	test("has passed class added", () => {
		render(<HeartIcon id={ID} fillValue={1} className="heart-icon-big" />);

		const icon = screen.getByTestId("heart-icon");
		expect(icon).toHaveClass(styles["heart-icon-big"]);
	});
});
