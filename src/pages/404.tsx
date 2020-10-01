import React from 'react';
import { Typography } from 'antd';
import PageLayout from '../components/shared/layout/pageLayout';
import SEO from '../components/shared/layout/seo';

const { Title, Paragraph, Text } = Typography;

const NotFoundPage = () => (
  <PageLayout>
    <SEO title="404: Not found" />
    <Paragraph className="centered">
      <Title level={1}>NOT FOUND</Title>
      <Text>You just hit a link to a page that doesn&#39;t exist... the sadness.</Text>
    </Paragraph>
  </PageLayout>
);

export default NotFoundPage;
