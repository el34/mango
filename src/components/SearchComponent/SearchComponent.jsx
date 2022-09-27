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
      from: from.map((city) => city.split("|")[0]),
      to: to.map((city) => city.split("|")[0]),
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
    <SearchComponentWrapper>
      <Card style={{ width: "100%" }}>
        <Row>
          <Col xs={24} lg={20}>
            <Row>
              <Col xs={24} lg={6}>
                <PlaceInput
                  inputLabel="From:"
                  isDisabled={isLoading}
                  name="from"
                  values={
                    from.length ? from.map((city) => city.split("|")[1]) : from
                  }
                  handlePlaceInputChange={handlePlaceInputChange}
                />
              </Col>
              <Col xs={24} lg={6}>
                <PlaceInput
                  inputLabel="To:"
                  isDisabled={isLoading}
                  name="to"
                  values={to.length ? to.map((city) => city.split("|")[1]) : to}
                  handlePlaceInputChange={handlePlaceInputChange}
                />
              </Col>
              <Col xs={24} lg={6}>
                <DateInput
                  inputLabel="Departure:"
                  isDisabled={isLoading}
                  name="departure"
                  value={departureDate.length ? departureDate[2] : undefined}
                  handleDateInputChange={handleDateInputChange}
                />
              </Col>
              <Col xs={24} lg={6}>
                <DateInput
                  inputLabel="Return:"
                  isDisabled={isLoading}
                  name="return"
                  value={returnDate.length ? returnDate[2] : undefined}
                  handleDateInputChange={handleDateInputChange}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={24} lg={4}>
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
    </SearchComponentWrapper>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  align-items: flex-end;
  @media (max-width: 991px) {
    width: 100%;
    justify-content: flex-start;
    margin-top: 8px;
  }
`;

const SearchComponentWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
