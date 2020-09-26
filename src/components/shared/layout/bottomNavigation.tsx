import React from 'react';
import { Button } from 'antd';
import { GithubOutlined, TwitterOutlined } from '@ant-design/icons';

const BottomNavigation = () => (
  <>
    Made with
    {' '}
    <span role="img" aria-labelledby="love">❤️</span>
    {' '}
    by
    {' '}
    @svirins
    {' '}
    <br />
    <Button
      size="large"
      type="link"
      href="https://twitter.com/svirins"
      target="_blank"
    >
      <TwitterOutlined />
    </Button>
    <Button
      size="large"
      type="link"
      href="https://github.com/svirins/covid19"
      target="_blank"
    >
      <GithubOutlined />
    </Button>
  </>
);
export default BottomNavigation;
