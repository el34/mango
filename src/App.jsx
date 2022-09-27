import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import { Navigation } from "./components/navigation/Navigation";
import { MainPageList } from "./features/MainPage/MainPageList";
import { FlightResultsList } from "./features/FlightResults/FlightResultsList";
import styled from "styled-components";

const { Footer } = Layout;

export const App = (props) => (
  <>
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/results/" element={<FlightResultsList />} />
        <Route path="/" element={<MainPageList />} />
      </Routes>
    </BrowserRouter>
    <Footer
      style={{
        background: "#222",
        height: "32px",
        textAlign: "center",
      }}
    >
      Ant Design ©2018 Created by Ant UED
    </Footer>
  </>
);

export const Container = styled.div`
  max-width: 1600px;
  padding: 0 24px;
  margin: 0 auto;
`;

export const ContainerSmall = styled.div`
  max-width: 1200px;
  height: 100%;
  padding: 0 24px;
  margin: 0 auto;
`;
