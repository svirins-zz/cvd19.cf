import React from 'react';
import { Layout } from 'antd';
import topNavigation from './topNavigation';
import bottomNavigation from './bottomNavigation';

const {
  Header, Footer, Content,
} = Layout;

// interface Props {
//   children: React.ReactNode
// }

const pageLayout = ({ children }) => (
  <header>
    <Header>
      {topNavigation}
    </Header>
    <header />
    <main>
      <Content>
        {children}
      </Content>
    </main>
    <Footer>
      {bottomNavigation}
    </Footer>
    <script src="/__/firebase/7.14.0/firebase-app.js" />
    <script src="/__/firebase/7.14.3/firebase-analytics.js" />
    <script src="/__/firebase/init.js" />
  </header>
);

export default pageLayout;
