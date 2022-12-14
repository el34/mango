import React, { useEffect } from "react";
import { DatePicker, Typography } from "antd";
import styled from "styled-components";
import moment from "moment";

const { Text } = Typography;
const dateFormat = "YYYY-MM-DD";

const disabledDate = (current) => {
  return current && current < moment().subtract(1, "day").endOf("day");
};

export const DateInput = ({
  inputLabel,
  name,
  value,
  handleDateInputChange,
  isDisabled,
}) => {
  const handleDatePickerOnChange = (value) => {
    handleDateInputChange(
      [
        `${moment(value).subtract(1, "day").format(dateFormat)}T22:00`,
        `${moment(value).subtract(-1, "day").format(dateFormat)}T22:00`,
        value,
      ],
      name
    );
  };

  useEffect(() => {}, [isDisabled]);

  return (
    <DateInputWrapper>
      <Text strong>{inputLabel}</Text>
      <DatePicker
        size="large"
        disabled={isDisabled}
        disabledDate={disabledDate}
        defaultValue={value ? moment(value, dateFormat) : undefined}
        format={dateFormat}
        onChange={handleDatePickerOnChange}
        allowClear={false}
      />
    </DateInputWrapper>
  );
};

const DateInputWrapper = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  @media (max-width: 991px) {
    width: 100%;
    margin-bottom: 8px;
  }
`;
