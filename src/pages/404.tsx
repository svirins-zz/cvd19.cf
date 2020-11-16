import { Button, Result } from "antd";
import { Page, SEO } from "components/layout";
import React from "react";

const error404 = () => {
  return (
    <Page>
      <SEO
        title="404 Error: Page not found"
        description="Sorry, this page never exists"
        pathname="/error_404"
      />
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
};

export default error404;
