import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders game", () => {
  render(<App />);
  const titleElement = screen.getByText(/Wordle/i);
  expect(titleElement).toBeInTheDocument();

  const howToPlayButton = screen.getByText(/How to play/i);
  expect(howToPlayButton).toBeInTheDocument();
});
