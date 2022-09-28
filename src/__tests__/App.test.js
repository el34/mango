import { render, screen } from "@testing-library/react";
import { App } from "../App";
import { SearchProvider } from "../context/SearchContext";

test("renders Kiwi text in footer", () => {
  render(
    <SearchProvider>
      <App />
    </SearchProvider>
  );
  const element = screen.getByText(/For Kiwi/i);
  expect(element).toBeInTheDocument();
});
