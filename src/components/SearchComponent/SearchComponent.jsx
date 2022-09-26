import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button } from "antd";
import { PlaceInput } from "./PlaceInput";
import { DateInput } from "./DateInput";
import styled from "styled-components";

export const SearchComponent = () => {
  const [from, setFrom] = useState([]);
  const [to, setTo] = useState([]);
  const [departureDate, setDepartureDate] = useState([]);
  const [returnDate, setReturnDate] = useState([]);

  const handlePlaceInputChange = (options, name) => {
    name === "from" ? setFrom(options) : setTo(options);
  };

  const handleDateInputChange = (options, name) => {
    name === "departure" ? setDepartureDate(options) : setReturnDate(options);
  };

  useEffect(() => {
    console.log(from, to, departureDate, returnDate);
  }, [from, to, departureDate, returnDate]);

  return (
    <div>
      <Card title="Default size card" style={{ width: 1200 }}>
        <Row>
          <Col flex="auto">
            <Row>
              <Col span={6}>
                <PlaceInput
                  inputLabel="From:"
                  name="from"
                  handlePlaceInputChange={handlePlaceInputChange}
                />
              </Col>
              <Col span={6}>
                <PlaceInput
                  inputLabel="To:"
                  name="to"
                  handlePlaceInputChange={handlePlaceInputChange}
                />
              </Col>
              <Col span={6}>
                <DateInput
                  inputLabel="Departure:"
                  name="departure"
                  handleDateInputChange={handleDateInputChange}
                />
              </Col>
              <Col span={6}>
                <DateInput
                  inputLabel="Return:"
                  name="return"
                  handleDateInputChange={handleDateInputChange}
                />
              </Col>
            </Row>
          </Col>
          <Col flex="100px" style={{ alignItems: "flex-start" }}>
            <ButtonWrapper>
              <Button type="primary" size="large">
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
