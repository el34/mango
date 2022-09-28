import { render, screen } from "@testing-library/react";
import { PlaceInput } from "../components/SearchComponent/PlaceInput";
import { SearchProvider } from "../context/SearchContext";

test("renders PlaceInput component", async () => {
  render(
    <SearchProvider>
      <PlaceInput />
    </SearchProvider>
  );
  const component = await screen.findByTestId("place-input");
  expect(component).toBeInTheDocument();
});
