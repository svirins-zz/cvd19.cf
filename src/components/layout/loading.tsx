import React, { useMemo } from "react";
import { Typography, Spin } from "antd";
import { Page } from "./page";

const { Title, Paragraph } = Typography;

export const Loading = () => {
  const memoizedResult = useMemo(
    () => (
      <Page>
        <Paragraph
          className="centered"
          style={{ height: "100vh", paddingTop: "15%" }}
        >
          <div style={{ verticalAlign: "middle" }}>
            {" "}
            <Spin size="large" /> <Title level={5}>Loading</Title>
          </div>
        </Paragraph>
      </Page>
    ),
    []
  );
  return memoizedResult;
};
