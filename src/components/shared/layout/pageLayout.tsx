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
    <script src="/__/firebase/7.14.0/firebase-app.js" />
    <script src="/__/firebase/7.14.3/firebase-analytics.js" />
    <script src="/__/firebase/init.js" />
  </header>
);

export default PageLayout;
