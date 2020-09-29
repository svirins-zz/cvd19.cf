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
      <Content>
        {children}
      </Content>
    </main>
    <Footer className="centered whitecolor">
      <BottomNavigation />
    </Footer>
  </Layout>
);

export default PageLayout;
