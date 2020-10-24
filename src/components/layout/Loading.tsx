import React, { useMemo } from "react";
import { Typography, Spin } from "antd";
import PageLayout from "./Page";

const { Title, Paragraph } = Typography;

const Loading = () => {
  const memoizedResult = useMemo(
    () => (
      <PageLayout>
        <Paragraph
          className="centered"
          style={{ height: "100vh", paddingTop: "15%" }}
        >
          <div style={{ verticalAlign: "middle" }}>
            {" "}
            <Spin size="large" /> <Title level={5}>Loading</Title>
          </div>
        </Paragraph>
      </PageLayout>
    ),
    []
  );
  return memoizedResult;
};

export default Loading;
