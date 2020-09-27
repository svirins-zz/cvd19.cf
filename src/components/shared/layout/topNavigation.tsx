import React from 'react';
import { Link } from 'gatsby';
import { Menu } from 'antd';
import {
  GlobalOutlined, BarChartOutlined, MedicineBoxOutlined, RobotOutlined, EnvironmentOutlined 
} from '@ant-design/icons';

const TopNavigation = () => (
  <>
    <div className="logo">
      Covid-19 stats
    </div>
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
      <Menu.Item key="1" icon={<GlobalOutlined style={{ fontSize: '24px', color: 'WHITE', verticalAlign: 'middle' }} />}>
        <Link to="/">
          STATUS
        </Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<BarChartOutlined style={{ fontSize: '24px', color: 'WHITE', verticalAlign: 'middle' }} />}>
        <Link to="/data">
          DATA
        </Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<EnvironmentOutlined style={{ fontSize: '24px', color: 'WHITE', verticalAlign: 'middle' }} />}>
        <Link to="/map">
          MAP
        </Link>
      </Menu.Item>
      <Menu.Item key="4" icon={<MedicineBoxOutlined style={{ fontSize: '24px', color: 'WHITE', verticalAlign: 'middle' }} />}>
        <Link to="/details">
          DETAILS
        </Link>
      </Menu.Item>
      <Menu.Item key="5" icon={<RobotOutlined style={{ fontSize: '24px', color: 'WHITE', verticalAlign: 'middle' }} />}>
        <Link to="/about">
          ABOUT
        </Link>
      </Menu.Item>

    </Menu>
  </>
);

export default TopNavigation;
