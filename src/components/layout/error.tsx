import React from 'react';
import { Typography } from 'antd';
import { ErrorProps } from '@types';
import PageLayout from './pageLayout';

const { Paragraph } = Typography;

const Error = (error: ErrorProps) => (
  <PageLayout>
    <Paragraph className="centered">{error?.message}</Paragraph>
  </PageLayout>

);

export default Error;
