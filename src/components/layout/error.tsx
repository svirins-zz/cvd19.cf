import React from 'react';
import { Typography } from 'antd';
import PageLayout from './pageLayout';
import { ErrorProps } from '../../types';

const { Paragraph } = Typography;

const Error = (error: ErrorProps) => (
  <PageLayout>
    <Paragraph className="centered">{error?.message}</Paragraph>
  </PageLayout>

);

export default Error;
