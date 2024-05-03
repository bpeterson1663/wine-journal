import { render, screen } from "@testing-library/react";
import ColorPalette from "./color-palette.component";

describe("color palette", () => {
	test("should render", () => {
		render(<ColorPalette color="red" hue="purple" intensity="deep" />);
		expect(screen.getByTestId("red-deep-purple")).toBeVisible();
	});
});
