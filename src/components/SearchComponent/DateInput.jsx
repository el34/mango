import React from "react";
import { DatePicker, Typography } from "antd";
import styled from "styled-components";
import moment from "moment";

const { Text } = Typography;
const dateFormat = "YYYY-MM-DD";

export const DateInput = ({ inputLabel, name, handleDateInputChange }) => {
  const handleDatePickerOnChange = (value) => {
    handleDateInputChange(
      [
        `${moment(value).subtract(1, "day").format(dateFormat)}T22:00`,
        `${moment(value).subtract(-1, "day").format(dateFormat)}T22:00`,
      ],
      name
    );
  };

  return (
    <DateInputWrapper>
      <Text strong>{inputLabel}</Text>
      <DatePicker
        size="large"
        format={dateFormat}
        onChange={handleDatePickerOnChange}
      />
    </DateInputWrapper>
  );
};

const DateInputWrapper = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
`;
