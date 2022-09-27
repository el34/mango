import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Select, Typography, Tag } from "antd";
import { blue } from "@ant-design/colors";
import { debounce } from "lodash";
import { getAirportLocations } from "./helpers";

const { Text } = Typography;

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
  const [options, setOptions] = useState([]);

  const handleOnInputKeyDown = debounce(async (searchValue) => {
    setIsLoading(true);
    const places = await getAirportLocations(searchValue);
    places.length
      ? setOptions(
          places.map((airport) => ({
            value: airport.city.id,
            label: airport.city.name,
            key: Math.random(),
          }))
        )
      : setOptions([]);
    setIsLoading(false);
  }, 300);

  const handleOnInputSelectChange = (options) => {
    console.log(options);
    handlePlaceInputChange(options, name);
  };

  useEffect(() => {}, [options]);

  return (
    <PlaceInputWrapper>
      <Text strong>{inputLabel}</Text>
      <Select
        mode="multiple"
        placeholder="Search airport"
        defaultActiveFirstOption="false"
        tagRender={tagRender}
        maxTagCount={1}
        loading={isLoading}
        size="large"
        onSearch={handleOnInputKeyDown}
        onChange={(option) => handleOnInputSelectChange(option)}
        options={options}
        style={{
          width: "200px",
        }}
      ></Select>
    </PlaceInputWrapper>
  );
};

const PlaceInputWrapper = styled.div`
  width: 200px;
`;
