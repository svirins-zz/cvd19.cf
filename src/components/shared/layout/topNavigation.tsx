import React from 'react';
import { Link } from 'gatsby';
import {
  Menu, Row, Col,
} from 'antd';
import {
  GlobalOutlined,
  BarChartOutlined,
  RobotOutlined,
  EnvironmentOutlined,
  GithubOutlined,
  TwitterOutlined,
} from '@ant-design/icons';
import logo from '../../../images/coronavirus.png';

// TODO: svg logo and navbar align
// TODO: add responsive breakpoint
// TODO: add state to handle current user choice

const TopNavigation = () => (
  <>
    <Row>
      <Col>
        <img src={logo} height={48} width={48} alt="Covid-19 stats" />
      </Col>
      <Col>
        <span className="logo">
          &nbsp;&nbsp;Covid-19 stats
        </span>
      </Col>
      <Col>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={['1']}
          collapsedWidth="0"
        >
          <Menu.Item key="1" icon={<GlobalOutlined style={{ color: 'WHITE' }} />}>
            <Link to="/">
              Status
            </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<BarChartOutlined style={{ color: 'WHITE' }} />}>
            <Link to="/data">
              Data
            </Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<EnvironmentOutlined style={{ color: 'WHITE' }} />}>
            <Link to="/map">
              Map
            </Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<RobotOutlined style={{ color: 'WHITE' }} />}>
            <Link to="/about">
              About
            </Link>
          </Menu.Item>
        </Menu>
      </Col>
      <Col>
        <Menu mode="horizontal">
          <Menu.Item key="github"><a href="https://github.com/svirins/covid19"><GithubOutlined style={{ fontSize: '14px', color: 'Pink', verticalAlign: 'middle' }} /></a></Menu.Item>
          <Menu.Item key="twitter"><a href="https://twitter.com/svirins"><TwitterOutlined style={{ fontSize: '14px', color: 'Pink', verticalAlign: 'middle' }} /></a></Menu.Item>
        </Menu>
      </Col>
    </Row>
  </>
);

export default TopNavigation;
