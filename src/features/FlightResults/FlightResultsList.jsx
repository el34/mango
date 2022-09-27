import React from "react";
import { useSearchContext } from "../../context/SearchContext";
import { ContainerSmall } from "../../App";
import styled from "styled-components";
import { List, Typography, Row, Col, Timeline, Divider } from "antd";
import moment from "moment";

const { Title, Text } = Typography;

export const FlightResultsList = () => {
  const { searchResults } = useSearchContext();

  console.log("data su tu", searchResults);
  return (
    <ContainerSmall>
      <FlightResultListWrapper>
        {searchResults.length ? (
          <List
            dataSource={searchResults}
            pagination={{ pageSize: 6 }}
            bordered
            renderItem={(item) => (
              <List.Item
                key={item.id}
                style={{ display: "block", width: "100%" }}
              >
                <Row style={{ display: "flex", width: "100%" }}>
                  <Col span={24}>
                    <Row
                      style={{
                        flexDirection: "column",
                        marginBottom: "1.2rem",
                      }}
                    >
                      <Title level={5} style={{ marginBottom: "0" }}>
                        {new Date(
                          Date.now() + item.route[0].dTime
                        ).toLocaleDateString("en-US")}
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
                            {moment(item.dTime).format("LT")}
                            {", "}
                            {item.cityFrom}
                          </Text>
                          <Text secondary> {`(${item.cityCodeFrom})`}</Text>
                        </Timeline.Item>
                        <Timeline.Item>
                          <Text strong>
                            {moment(item.aTime).format("LT")}
                            {", "}
                            {item.cityTo}
                          </Text>
                          <Text secondary> {`(${item.cityCodeTo})`}</Text>
                        </Timeline.Item>
                      </Timeline>
                    </Row>
                    <Divider style={{ marginTop: "0" }} orientation="right">
                      <Title level={3}>{item.price} EUR</Title>
                    </Divider>
                    <Row
                      style={{
                        flexDirection: "column",
                        marginBottom: "1.2rem",
                      }}
                    >
                      <Title level={5} style={{ marginBottom: "0" }}>
                        {new Date(
                          Date.now() +
                            item.dTime +
                            item.route[item.route.length - 1].dTime
                        ).toLocaleDateString("en-US")}
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
                            {moment(item.dTime).format("LT")}
                            {", "}
                            {item.cityTo}
                          </Text>
                          <Text secondary> {`(${item.cityCodeTo})`}</Text>
                        </Timeline.Item>
                        <Timeline.Item>
                          <Text strong>
                            {moment(item.aTime).format("LT")}
                            {", "}
                            {item.cityFrom}
                          </Text>
                          <Text secondary> {`(${item.cityCodeFrom})`}</Text>
                        </Timeline.Item>
                      </Timeline>
                    </Row>
                  </Col>
                </Row>
              </List.Item>
            )}
          ></List>
        ) : (
          <div>There are no data, try search again</div>
        )}
      </FlightResultListWrapper>
    </ContainerSmall>
  );
};

const FlightResultListWrapper = styled.div`
  min-height: calc(100vh - 64px);
`;
