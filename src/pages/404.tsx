import React from 'react';
import { Result, Button } from 'antd';
import PageLayout from '../components/shared/layout/pageLayout';
import SEO from '../components/shared/layout/seo';

const NotFoundPage = () => (
  <PageLayout>
    <SEO title="404: Not found" />
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary">Back Home</Button>}
    />
    ,
  </PageLayout>
);

export default NotFoundPage;
