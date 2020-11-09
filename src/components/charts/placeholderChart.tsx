import React from "react";
import placeholder from "assets/chart_placeholder.svg";
import { Col } from "antd";

export const PlaceholderChart = () => (
  <Col span={24} className="centered">
    <img src={placeholder} alt="Prepaing charts" />
  </Col>
);
