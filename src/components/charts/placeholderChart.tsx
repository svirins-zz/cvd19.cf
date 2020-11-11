import { Col } from "antd";
import placeholder from "assets/chart_placeholder.svg";
import React from "react";

export const PlaceholderChart = () => (
  <Col span={24} className="centered">
    <img src={placeholder} alt="Prepaing charts" />
  </Col>
);
