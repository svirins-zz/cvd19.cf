import React from "react";
import { Typography } from "antd";
import { Page } from "./page";

const { Paragraph } = Typography;

export const Error = (error: Error) => (
  <Page>
    <Paragraph className="centered">{error?.message}</Paragraph>
  </Page>
);
