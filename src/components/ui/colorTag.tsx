import { Tag } from "antd";
import { getColorByStatus } from "lib";
import React from "react";

import { OutbreakStatus } from "@types";
export const ColorTag = (text: OutbreakStatus, index: number): JSX.Element => (
  <Tag color={getColorByStatus(text)} key={index}>
    {text}
  </Tag>
);
