import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Settings from "./index";

jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

describe("Settings test", () => {
  test("first Settings test", async () => {
    render(<Settings />);

    const placeholderInput = screen.getByPlaceholderText(
      "a query by placeholder"
    );
    screen.debug(placeholderInput);
  });
});
