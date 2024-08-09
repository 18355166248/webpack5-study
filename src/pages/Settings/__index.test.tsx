import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Settings from "./index";
import { message } from "antd";
import userEvent from "@testing-library/user-event";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

jest.mock("antd", () => ({
  ...jest.requireActual("antd"),
  message: {
    success: jest.fn(),
  },
}));

describe("Settings test", () => {
  test("Settings render snap", () => {
    const { baseElement } = render(<Settings />);
    expect(baseElement).toMatchSnapshot();
  });
  test("first Settings test", () => {
    render(<Settings />);

    const placeholderInput = screen.getByPlaceholderText(
      "a query by placeholder t"
    );
    expect(placeholderInput).toBeInTheDocument();
  });

  test("Settings click back", () => {
    const mockNavigate = jest.fn();
    jest
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockReturnValue(mockNavigate);

    render(<Settings />);

    const backButton = screen.getByRole("button", { name: /返 回/i });
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  test("Settings click 设置", async () => {
    const user = userEvent.setup();
    render(<Settings />);

    const backButton = screen.getByRole("button", { name: /设 置/i });
    // 这里需要await 不然后面的断言无法触发
    await user.click(backButton);

    expect(message.success).toHaveBeenCalled();
    expect(message.success).toHaveBeenCalledTimes(1);
    expect(message.success).toHaveBeenCalledWith("设置成功");
  });
});
