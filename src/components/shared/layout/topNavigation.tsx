import React from 'react';
import { Link } from 'gatsby';
import { Menu, Row } from 'antd';
import {
  GlobalOutlined, BarChartOutlined, MedicineBoxOutlined, RobotOutlined,
} from '@ant-design/icons';

// TODO: Add logo!
const topNavigation = () => (
  <Row>
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
      <Menu.Item key="1">
        <Link to="/">
          Status
          <GlobalOutlined />
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/data">
          Data
          <BarChartOutlined />
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/details">
          Details
          <MedicineBoxOutlined />
        </Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="/about">
          About
          <RobotOutlined />
        </Link>
      </Menu.Item>
    </Menu>
  </Row>
);

export default topNavigation;
