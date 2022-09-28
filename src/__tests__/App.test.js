import { render, screen } from "@testing-library/react";
import { App } from "../App";
import { SearchProvider } from "../context/SearchContext";

test("renders Search react button", () => {
  render(
    <SearchProvider>
      <App />
    </SearchProvider>
  );
  const linkElement = screen.getByText(/For Kiwi/i);
  expect(linkElement).toBeInTheDocument();
});
