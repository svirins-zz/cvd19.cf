import React from 'react';
import { Layout } from 'antd';
import TopNavigation from './topNavigation';
import BottomNavigation from './bottomNavigation';
import '../general/app.css';

const {
  Header, Footer, Content,
} = Layout;

const PageLayout = ({ children } : React.PropsWithChildren<{}>) => (
  <Layout>
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <TopNavigation />
    </Header>
    <main>
      <Content style={{ paddingTop: '70px' }}>
        {children}
      </Content>
    </main>
    <Footer className="centered whitecolor" style={{ position: 'sticky', bottom: '0' }}>
      <BottomNavigation />
    </Footer>
  </Layout>
);

export default PageLayout;
