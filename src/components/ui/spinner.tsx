import { Spin, Typography } from "antd";
import React, { useMemo } from "react";

import { SyncOutlined } from "@ant-design/icons";
const { Paragraph } = Typography;

export const Spinner = (): JSX.Element => {
  const antIcon = <SyncOutlined style={{ fontSize: 24 }} spin />;
  const displaySpinner = useMemo(() => {
    return (
      <>
        <Paragraph className="centered"> Preparing data...</Paragraph>
        <Spin indicator={antIcon} />
      </>
    );
  }, []);
  return displaySpinner;
};
