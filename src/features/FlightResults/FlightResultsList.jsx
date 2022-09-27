import React, { useState, useEffect, useCallback } from "react";
import { useSearchContext } from "../../context/SearchContext";
import { ContainerSmall } from "../../App";
import styled from "styled-components";
import { List } from "antd";
import { FlightResultsItem } from "./FlightResultsItem";

export const FlightResultsList = () => {
  const { searchResults } = useSearchContext();
  const [itemsToRender, setItemsToRender] = useState([]);

  const setRoutesToItemsToRender = useCallback(() => {
    setItemsToRender(
      searchResults.map((result) => ({
        ...result,
        routesToDestionation: result.route.filter(
          (route) => route.return === 0
        ),
        routesFromDestionation: result.route.filter(
          (route) => route.return === 1
        ),
      }))
    );
  }, [searchResults]);

  useEffect(() => {
    setRoutesToItemsToRender(searchResults);
  }, [searchResults, setRoutesToItemsToRender]);

  return (
    <ContainerSmall>
      <FlightResultListWrapper>
        {itemsToRender.length ? (
          <List
            dataSource={itemsToRender}
            pagination={{ pageSize: 6, marginBottom: "48px" }}
            bordered
            renderItem={(item) => <FlightResultsItem item={item} />}
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
  padding-bottom: 48px;
`;
