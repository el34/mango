import { FlightResultsItem } from "../features/FlightResults/FlightResultsItem";
import { create } from "react-test-renderer";
import { flightResultItemMock as item } from "./flightResultItemMock";

test("FlightResultsItem renders correctly with flight", () => {
  const tree = create(<FlightResultsItem item={item} />).toJSON();
  expect(tree).toMatchSnapshot();
});
