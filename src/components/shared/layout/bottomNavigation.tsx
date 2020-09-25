import React from 'react';
import { Layout, Button } from 'antd';
import { GithubOutlined, TwitterOutlined } from '@ant-design/icons';

const { Footer } = Layout;

const BottomNavigation = () => (
  <Footer>
    Made with
    {' '}
    <span role="img" aria-labelledby="love">❤️</span>
    {' '}
    by
    {' '}
    @svirins
    <br />
    <Button.Group size="large">
      <Button
        href="https://twitter.com/svirins"
        target="_blank"
      >
        Twitter
        <TwitterOutlined />
      </Button>
      <Button
        href="https://github.com/svirins/covid19"
        target="_blank"
      >
        Github
        <GithubOutlined />
      </Button>
    </Button.Group>
  </Footer>
);
export default BottomNavigation;
