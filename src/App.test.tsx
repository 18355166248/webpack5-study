import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

jest.mock("./pages/Root", () => () => <div>Root666</div>);

describe("App test", () => {
  test("first App test", async () => {
    render(<App />);

    const element = await screen.findByText((content) =>
      content.includes("Root666")
    );
    expect(element).toBeInTheDocument();

    expect(3).toBeLessThanOrEqual(3);
  });
});
