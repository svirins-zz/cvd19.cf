import React from 'react';
import { Link } from 'gatsby';
import {
  Menu, Image, Row, Col,
} from 'antd';
import {
  GlobalOutlined,
  BarChartOutlined,
  MedicineBoxOutlined,
  RobotOutlined,
  EnvironmentOutlined,
  GithubOutlined,
  TwitterOutlined,
} from '@ant-design/icons';

// TODO: svg logo
const TopNavigation = () => (
  <>
    <Row>
      <div className="logo">
        <Image
          height={48}
          src="./coronavirus.svg"
        />
        {' '}
        Covid-19 stats
      </div>
      <Col justify="start">
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
      </Col>
      <Col justify="end">
        <Menu mode="horizontal" theme="dark">
          <Menu.Item key="github"><a href="https://github.com/svirins/covid19"><GithubOutlined /></a></Menu.Item>
          <Menu.Item key="twitter"><a href="https://twitter.com/svirins"><TwitterOutlined /></a></Menu.Item>
        </Menu>
      </Col>
    </Row>
  </>
);

export default TopNavigation;
