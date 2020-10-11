import React from 'react';
import {
  Layout, Menu, Drawer, Button, BackTop,
} from 'antd';
import { Link } from 'gatsby';
import { useLocation } from '@reach/router';
import '../../styles/app.css';
import {
  GlobalOutlined,
  BarChartOutlined,
  RobotOutlined,
  EnvironmentOutlined,
  GithubOutlined,
} from '@ant-design/icons';
import menuInit from '../../utilities/menuInitUtils';
import logo from '../../assets/coronavirus.png';
import { myContext } from '../../context';
import { LegendTable } from '../data/legend';

const { Content, Sider, Footer } = Layout;

const PageLayout = ({ children } : React.PropsWithChildren<{}>) => {
  const { pathname } = useLocation();
  const defaultItem = menuInit(pathname);
  return (
    <myContext.Consumer>
      {(context) => (
        <Layout style={{ minHeight: '100vh' }}>
          <Drawer
            title="Legend"
            placement="left"
            closable
            onClose={context.onClose}
            visible={context.visible}
            width={480}
          >
            <LegendTable />
          </Drawer>
          <Sider
            collapsed
            style={{ position: 'sticky' }}
          >
            <Menu
              onSelect={context.handleSelect}
              selectable
              focusable
              selectedKeys={[defaultItem]}
              mode="inline"
              style={{ position: 'fixed', border: '0' }}
            >
              <div className="logoImg">
                <img
                  src={logo}
                  alt="Covid-19 stats & facts"
                  height={48}
                  width={48}
                />
                <span className="logoText">
                  cvd19.cf
                </span>
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
                <Button className="tinyButton" type="dashed" size="small" onClick={context.showDrawer}>Legend</Button>
              </div>
            </Menu>
          </Sider>
          <BackTop />
          <Layout className="site-layout">
            <Content>
              <div className="site-layout-background" style={{ padding: 24 }}>
                {children}
              </div>
            </Content>
            <Footer>
              <div className="credentials">
                Made with
                {' '}
                <span role="img" aria-labelledby="love">❤️</span>
                {' '}
                by
                {' '}
                <a className="credentialsLink" href="https://twitter.com/svirins">@svirins</a>
                .
              </div>
              <div className="credentials">
                {' '}
                View source
                {' '}
                <a href="https://github.com/svirins/covid19">
                  <GithubOutlined style={{ fontSize: '14px' }} />
                </a>
              </div>
            </Footer>
          </Layout>
        </Layout>
      )}
    </myContext.Consumer>
  );
};

export default PageLayout;
