import React from "react";
import { Tag } from "antd";
import { commafy, getTagColor } from "lib";
import { OutbreakStatus, TableType } from "@types";

const ColorTag = (text: number, status: OutbreakStatus, field: TableType) => (
  <Tag color={getTagColor(status)}>
    {field === "growthRate" ? text : commafy(text)}
    {field === "growthRate" ? "%" : ""}
  </Tag>
);

export default ColorTag;
