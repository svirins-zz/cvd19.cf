import React from "react";
import { Result, Button } from "antd";
import { Page, SEO } from "components/layout";

const NotFoundPage = () => (
  <Page>
    <SEO title="404: Not found" />
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary">
          <a href="/">Back Home</a>
        </Button>
      }
    />
  </Page>
);

export default NotFoundPage;
