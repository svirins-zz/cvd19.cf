import React, { useState, useEffect } from 'react';
import { Layout, Menu, Typography } from 'antd';
import { Link } from 'gatsby';
import './app.css';
import {
  GlobalOutlined,
  BarChartOutlined,
  RobotOutlined,
  EnvironmentOutlined,
  GithubOutlined,
  TwitterOutlined,
} from '@ant-design/icons';
import logo from '../../../images/coronavirus.png';

const { Content, Sider } = Layout;
const { Text } = Typography;

const PageLayout = ({ children } : React.PropsWithChildren<{}>) => {
  const [choice, setChoice] = useState('');
  useEffect(() => setChoice('main'), []);
  const handleClick = (e) => {
    setChoice(e.key);
  };

  // set up change state -manage state in main component
  // style highlightedmenu + icon-size
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsed
        style={{ position: 'sticky' }}
      >
        <Menu
          onSelect={handleClick}
          selectable
          focusable
          selectedKeys={choice}
          mode="inline"
          style={{ position: 'fixed', border: '0' }}
        >
          {' '}
          <div className="logoImg">
            <a href="/">
              <img
                src={logo}
                alt="Covid-19 stats & facts"
                height={48}
                width={48}
              />
              <span className="logoText">
                cvd19.cf
              </span>
            </a>
          </div>
          <Menu.Item key="main" icon={<GlobalOutlined style={{ color: 'WHITE' }} />}>
            <Link to="/">
              Status
            </Link>
          </Menu.Item>
          <Menu.Item key="data" icon={<BarChartOutlined style={{ color: 'WHITE' }} />}>
            <Link to="/data">
              Data
            </Link>
          </Menu.Item>
          <Menu.Item key="map" icon={<EnvironmentOutlined style={{ color: 'WHITE' }} />}>
            <Link to="/map">
              Map
            </Link>
          </Menu.Item>
          <Menu.Item key="about" icon={<RobotOutlined style={{ color: 'WHITE' }} />}>
            <Link to="/about">
              About
            </Link>
          </Menu.Item>
          <div className="alignBottom">
            <div className="bottomSiderIcon">
              <a href="https://github.com/svirins/covid19">
                <GithubOutlined style={{ fontSize: '18px', color: 'orange', verticalAlign: 'middle' }} />
              </a>
            </div>
            <div className="bottomSiderIcon">
              <a href="https://twitter.com/svirins">
                <TwitterOutlined style={{ fontSize: '18px', color: 'orange', verticalAlign: 'middle' }} />
              </a>
            </div>
            <Text className="credentials">
              Made with
              <br />
              <span role="img" aria-labelledby="love">❤️</span>
              <br />
              by
              {' '}
              <a className="credentialsLink" href="https://twitter.com/svirins">@svirins</a>
            </Text>
          </div>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content>
          <div className="site-layout-background" style={{ padding: 24 }}>
            {children}
          </div>
        </Content>
      </Layout>

    </Layout>
  );
};
export default PageLayout;
