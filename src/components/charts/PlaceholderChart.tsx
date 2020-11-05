import React from "react";
import placeholder from "assets/chart_placeholder.svg";
import {  Col } from "antd";

const PlaceholderChart = () => (
  <Col span={24}>
    <img src={placeholder} alt="Prepaing charts" />
  </Col>
);

export default PlaceholderChart;
