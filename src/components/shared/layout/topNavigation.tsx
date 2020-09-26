import React from 'react';
import { Link } from 'gatsby';
import { Menu } from 'antd';
import {
  GlobalOutlined, BarChartOutlined, MedicineBoxOutlined, RobotOutlined,
} from '@ant-design/icons';
// import Logo from '../../../images/coronavirus.svg';
// TODO: Add logo!
const TopNavigation = () => (
  <>
    <div className="logo" />
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
      <Menu.Item key="1" icon={<GlobalOutlined />}>
        <Link to="/">
          Status
        </Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<BarChartOutlined />}>
        <Link to="/data">
          Data
        </Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<MedicineBoxOutlined />}>
        <Link to="/details">
          Details
        </Link>
      </Menu.Item>
      <Menu.Item key="4" icon={<RobotOutlined />}>
        <Link to="/about">
          About
        </Link>
      </Menu.Item>
    </Menu>
  </>
);

export default TopNavigation;
