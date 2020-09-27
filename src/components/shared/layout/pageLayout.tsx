import React from 'react';
import { Layout } from 'antd';
import TopNavigation from './topNavigation';
import BottomNavigation from './bottomNavigation';
import '../general/app.css';
// import 'antd/dist/antd.less';

const {
  Header, Footer, Content,
} = Layout;

const PageLayout = ({ children } : React.PropsWithChildren<{}>) => (
  <Layout>
    <Header>
      <TopNavigation />
    </Header>
    <main className="site-layout-content">
      <Content>
        {children}
      </Content>
    </main>
    <Footer className="centered">
      <BottomNavigation />
    </Footer>
  </Layout>
);

export default PageLayout;
