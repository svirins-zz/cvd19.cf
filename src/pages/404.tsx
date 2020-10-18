import React from 'react';
import { Result, Button } from 'antd';
import PageLayout from 'components/layout/PageLayout';
import SEO from 'components/layout/Seo';

const NotFoundPage = () => (
  <PageLayout>
    <SEO title="404: Not found" />
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary"><a href="/">Back Home</a></Button>}
    />
  </PageLayout>
);

export default NotFoundPage;
