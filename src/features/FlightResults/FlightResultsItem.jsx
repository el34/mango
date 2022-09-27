import React from "react";
import { Row, Col, List, Typography, Timeline, Divider, Tag } from "antd";

const { Title, Text } = Typography;

const formatDayOptions = { weekday: "short", month: "long", day: "numeric" };
const formatTimeOptions = { minutes: "numeric", hours: "numeric" };

export const formatDateFromTimestamp = (ts, type) => {
  return type === "day"
    ? new Date(ts * 1000).toLocaleDateString("en-US", formatDayOptions)
    : new Date(ts * 1000).toLocaleTimeString("en-US", formatTimeOptions);
};

export const FlightResultsItem = ({ item }) => {
  return (
    <List.Item key={item.id} style={{ display: "flex", width: "100%" }}>
      <Row style={{ display: "flex", width: "100%" }}>
        <Col span={24}>
          <Row
            style={{
              flexDirection: "column",
              marginBottom: "1.2rem",
            }}
          >
            <Title level={5} style={{ marginBottom: "0" }}>
              {formatDateFromTimestamp(
                item.routesToDestionation[0].dTimeUTC,
                "day"
              )}
            </Title>
            <Text secondary>
              {" "}
              {item.cityFrom} to {item.cityTo}
            </Text>
          </Row>
          <Row>
            <Timeline style={{ marginTop: "12px" }}>
              <Timeline.Item>
                <Text strong>
                  {formatDateFromTimestamp(
                    item.routesToDestionation[0].dTimeUTC,
                    false
                  )}
                  {", "}
                  {item.cityFrom}
                </Text>
                <Text>{`, ${item.countryFrom.name}`}</Text>
                <Text secondary> {`(${item.cityCodeFrom})`}</Text>
              </Timeline.Item>
              <Timeline.Item>
                <Text strong>
                  {formatDateFromTimestamp(
                    item.routesToDestionation[
                      item.routesToDestionation.length - 1
                    ].aTimeUTC,
                    false
                  )}
                  {", "}
                  {item.cityTo}
                </Text>
                <Text>{`, ${item.countryTo.name}`}</Text>
                <Text secondary> {`(${item.cityCodeTo})`}</Text>
              </Timeline.Item>
            </Timeline>
          </Row>
          <Row>
            <Tag color="volcano">{item.fly_duration}</Tag>
            <Tag color="blue">{`nights in destination: ${item.nightsInDest}`}</Tag>
          </Row>
          <Divider
            style={{ marginTop: "0", marginBottom: "0" }}
            orientation="right"
          >
            <>
              <Title level={3} style={{ margin: "0", display: "block" }}>
                {item.price} EUR
              </Title>
              <Text strong>{`Seats: ${item.availability.seats}`}</Text>
            </>
          </Divider>
          <Row
            style={{
              flexDirection: "column",
              marginBottom: "1.2rem",
            }}
          >
            <Title level={5} style={{ marginBottom: "0" }}>
              {formatDateFromTimestamp(
                item.routesFromDestionation[0].dTimeUTC,
                "day"
              )}
            </Title>
            <Text secondary>
              {" "}
              {item.cityTo} to {item.cityFrom}
            </Text>
          </Row>
          <Row>
            <Timeline style={{ marginBottom: "12px" }}>
              <Timeline.Item>
                <Text strong>
                  {formatDateFromTimestamp(
                    item.routesFromDestionation[0].dTimeUTC,
                    false
                  )}
                  {", "}
                  {item.cityTo}
                </Text>
                <Text>{`, ${item.countryTo.name}`}</Text>
                <Text secondary>{` (${item.cityCodeTo})`}</Text>
              </Timeline.Item>
              <Timeline.Item>
                <Text strong>
                  {formatDateFromTimestamp(
                    item.routesFromDestionation[
                      item.routesFromDestionation.length - 1
                    ].aTimeUTC,
                    false
                  )}
                  {", "}
                  {item.cityFrom}
                </Text>
                <Text>{`, ${item.countryFrom.name}`}</Text>
                <Text secondary>{` (${item.cityCodeFrom})`}</Text>
              </Timeline.Item>
            </Timeline>
          </Row>
          <Row>
            <Tag color="volcano">{item.return_duration}</Tag>
          </Row>
        </Col>
      </Row>
    </List.Item>
  );
};
