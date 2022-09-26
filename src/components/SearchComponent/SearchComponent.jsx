import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "antd";
import { PlaceInput } from "./PlaceInput";

export const SearchComponent = () => {
  const [from, setFrom] = useState([]);
  const [to, setTo] = useState([]);

  const handlePlaceInputChange = (options, name) => {
    name === "from" ? setFrom(options) : setTo(options);
  };

  useEffect(() => {
    console.log(from, to);
  }, [from, to]);
  return (
    <div>
      <Card title="Default size card" style={{ width: 900 }}>
        <Row>
          <Col>
            <PlaceInput
              inputLabel="From:"
              name="from"
              handlePlaceInputChange={handlePlaceInputChange}
            />
          </Col>
          <Col>
            <PlaceInput
              inputLabel="To:"
              name="to"
              handlePlaceInputChange={handlePlaceInputChange}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};
