import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button } from "antd";
import { PlaceInput } from "./PlaceInput";
import { DateInput } from "./DateInput";
import styled from "styled-components";
import { getFlights } from "./helpers";
import { useNavigate } from "react-router-dom";
import { useSearchContext } from "../../context/SearchContext";

export const SearchComponent = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const { from, setFrom } = useSearchContext();
  const { to, setTo } = useSearchContext();
  const { departureDate, setDepartureDate } = useSearchContext();
  const { returnDate, setReturnDate } = useSearchContext();
  const { setSearchResults } = useSearchContext();

  const handlePlaceInputChange = (options, name) => {
    name === "from" ? setFrom(options) : setTo(options);
  };

  const handleDateInputChange = (options, name) => {
    name === "departure" ? setDepartureDate(options) : setReturnDate(options);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (isLoading === true) return;
    setIsLoading(true);

    const results = await getFlights({
      from,
      to,
      departureDate,
      returnDate,
    });

    if (results.data.length) {
      setSearchResults(results.data);
      navigate("/results");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    from.length && to.length && departureDate.length && returnDate.length
      ? setIsDisabled(false)
      : setIsDisabled(true);
  }, [from, to, departureDate, returnDate]);

  return (
    <div>
      <Card style={{ width: 1200 }}>
        <Row>
          <Col flex="auto">
            <Row>
              <Col span={6}>
                <PlaceInput
                  inputLabel="From:"
                  name="from"
                  values={from}
                  handlePlaceInputChange={handlePlaceInputChange}
                />
              </Col>
              <Col span={6}>
                <PlaceInput
                  inputLabel="To:"
                  name="to"
                  values={to}
                  handlePlaceInputChange={handlePlaceInputChange}
                />
              </Col>
              <Col span={6}>
                <DateInput
                  inputLabel="Departure:"
                  name="departure"
                  value={departureDate.length ? departureDate[2] : undefined}
                  handleDateInputChange={handleDateInputChange}
                />
              </Col>
              <Col span={6}>
                <DateInput
                  inputLabel="Return:"
                  name="return"
                  value={returnDate.length ? returnDate[2] : undefined}
                  handleDateInputChange={handleDateInputChange}
                />
              </Col>
            </Row>
          </Col>
          <Col flex="100px" style={{ alignItems: "flex-start" }}>
            <ButtonWrapper>
              <Button
                type="primary"
                size="large"
                loading={isLoading}
                onClick={(e) => handleSubmitForm(e)}
                disabled={isDisabled}
              >
                Search
              </Button>
            </ButtonWrapper>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  align-items: flex-end;
`;
