import React from 'react';
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
// eslint-disable-next-line import/extensions
import { myContext } from '../../../../provider.js';

const { Paragraph } = Typography;
const { Content, Sider, Footer } = Layout;
// TODO: apply styling to menu
const PageLayout = ({ children } : React.PropsWithChildren<{}>) => (
  <myContext.Consumer>
    {(context) => (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsed
          style={{ position: 'sticky' }}
        >
          <Menu
            onSelect={context.handleClick}
            selectable
            focusable
            selectedKeys={[context.choice]}
            mode="inline"
            style={{ position: 'fixed', border: '0' }}
          >
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
              <Paragraph className="bottomSiderIcon">
                <a href="https://github.com/svirins/covid19">
                  <GithubOutlined style={{ fontSize: '16px', color: '#7eb0d6', verticalAlign: 'middle' }} />
                </a>
              </Paragraph>
              <Paragraph className="credentials">
                <a href="https://twitter.com/svirins">
                  <TwitterOutlined style={{ fontSize: '16px', color: '#7eb0d6', verticalAlign: 'middle' }} />
                </a>
              </Paragraph>
            </div>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content>
            <div className="site-layout-background" style={{ padding: 24 }}>
              {children}
            </div>
          </Content>
          <Footer>
            <Paragraph className="credentials">
              Made with
              {' '}
              <span role="img" aria-labelledby="love">❤️</span>
              {' '}
              <a className="credentialsLink" href="https://twitter.com/svirins">@svirins</a>
            </Paragraph>
          </Footer>
        </Layout>

      </Layout>
    )}
  </myContext.Consumer>

);
export default PageLayout;
