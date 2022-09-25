import React from 'react'
import { Link } from "react-router-dom"
import { Col, Row } from 'antd'
import styled from 'styled-components'
import { Logo } from './Logo'

export const Navigation = () => {
  return (
    <HeaderWrapper>
      <Row style={{width: '100%'}}>
        <Col span={8}>
          <Link to="/">
            <Logo />
          </Link>
        </Col>
        <Col span={4} offset={12}>
          {/* TODO: make dropdown with booking item and subpage */}
        </Col>
      </Row>
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  height: 64px;
  padding: 0 24px;
  background: #fff;
`
