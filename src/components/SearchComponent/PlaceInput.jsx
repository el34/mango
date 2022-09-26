import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Select, Typography, Tag } from "antd";
import { blue } from "@ant-design/colors";
import { debounce } from "lodash";
import { getAirportPlaces } from "./helpers";

const { Text } = Typography;
const { Option } = Select;

const tagRender = (props) => {
  const { label, closable, onClose } = props;

  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Tag
      color={blue.primary}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginRight: 3,
      }}
    >
      {label}
    </Tag>
  );
};

export const PlaceInput = ({ inputLabel, name, handlePlaceInputChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [airportsData, setAirportsData] = useState([]);

  const handleOnInputKeyDown = debounce(async (searchValue) => {
    setIsLoading(true);
    const places = await getAirportPlaces(searchValue);
    setAirportsData(places);
    setIsLoading(false);
  }, 300);

  const handleOnInputSelectChange = (options) => {
    console.log(options);
    handlePlaceInputChange(options, name);
  };

  useEffect(() => {
    console.log(airportsData);
  }, [airportsData]);

  return (
    <PlaceInputWrapper>
      <Text strong>{inputLabel}</Text>
      <Select
        mode="multiple"
        placeholder="Search airport"
        defaultActiveFirstOption="false"
        tagRender={tagRender}
        maxTagCount="1"
        loading={isLoading}
        size="large"
        dropdownRender={(node) => node}
        onSearch={handleOnInputKeyDown}
        onChange={(option) => handleOnInputSelectChange(option)}
        style={{
          width: "200px",
        }}
      >
        {airportsData.length &&
          airportsData.map((airport) => (
            <Option key={airport.airport_int_id} value={airport.city.id}>
              {airport.city.name}
            </Option>
          ))}
      </Select>
    </PlaceInputWrapper>
  );
};

const PlaceInputWrapper = styled.div`
  width: 200px;
`;
