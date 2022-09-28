import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Select, Typography, Tag } from "antd";
import { blue } from "@ant-design/colors";
import { debounce } from "lodash";
import { getAirportLocations } from "./helpers";

const { Text } = Typography;
const { Option } = Select;

const tagRender = ({ value, closable, onClose }) => {
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
      style={{ marginRight: 3 }}
    >
      {value.split("|")[1]}
    </Tag>
  );
};

export const PlaceInput = ({
  inputLabel,
  name,
  values,
  handlePlaceInputChange,
  isDisabled,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleOnInputKeyDown = debounce(async (searchValue) => {
    setIsLoading(true);
    const places = await getAirportLocations(searchValue);
    places && places.length
      ? setOptions(
          places.map((airport) => ({
            value: `${airport.city.id}|${airport.city.name}|${airport.code}|${airport.airport_int_id}`,
            cityName: airport.city.name,
            airportName: airport.name,
            airportCode: airport.code,
            key: airport.airport_int_id,
          }))
        )
      : setOptions([]);
    setIsLoading(false);
  }, 300);

  const handleOnInputSelectChange = (options) => {
    handlePlaceInputChange(options, name);
  };

  useEffect(() => {}, [options, isDisabled]);

  return (
    <PlaceInputWrapper>
      <Text strong>{inputLabel}</Text>
      <Select
        mode="multiple"
        dropdownMatchSelectWidth={false}
        showSearch="true"
        showArrow="true"
        disabled={isDisabled}
        placeholder="Search airport"
        tagRender={tagRender}
        maxTagCount={1}
        loading={isLoading}
        size="large"
        filterOption={false}
        defaultActiveFirstOption={false}
        onSearch={handleOnInputKeyDown}
        onChange={(options) => handleOnInputSelectChange(options)}
        defaultValue={values}
        style={{ width: "100%" }}
      >
        {options &&
          options.length &&
          options.map((option) => (
            <Option key={option.key} value={option.value}>
              <Text strong style={{ display: "block" }}>
                {option.cityName}
              </Text>
              <Text secondary="true">{`${option.airportName} (${option.airportCode})`}</Text>
            </Option>
          ))}
      </Select>
    </PlaceInputWrapper>
  );
};

const PlaceInputWrapper = styled.div`
  width: 200px;
  @media (max-width: 991px) {
    width: 100%;
    margin-bottom: 8px;
  }
`;
