import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from 'antd'
import { Navigation } from './components/navigation/Navigation'
import { MainPageList } from './features/MainPage/MainPageList'
import { FlightResultsList } from './features/FlightResults/FlightResultsList';
const { Footer } = Layout

export const App = () => (
  <Layout className="layout">
    <Navigation />
    <BrowserRouter>
      <Routes>
        <Route path="/results/" element={<FlightResultsList />} />
        <Route path="/" element={<MainPageList />} />
      </Routes>
    </BrowserRouter>
    <Footer
      style={{
        background: '#222',
        height: '32px',
        textAlign: 'center',
      }}
    >
      Ant Design ©2018 Created by Ant UED
    </Footer>
  </Layout>
)
