import React from 'react';
import { Layout } from 'antd';
import TopNavigation from './topNavigation';
import BottomNavigation from './bottomNavigation';

const {
  Header, Footer, Content,
} = Layout;

const PageLayout = ({ children } : React.PropsWithChildren<{}>) => (
  <header>
    <Header>
      <TopNavigation />
    </Header>
    <header />
    <main>
      <Content>
        {children}
      </Content>
    </main>
    <Footer>
      <BottomNavigation />
    </Footer>
  </header>
);

export default PageLayout;
