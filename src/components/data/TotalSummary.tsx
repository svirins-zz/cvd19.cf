import React from 'react';
import {
  Statistic, Card, Row, Col,
} from 'antd';

const TotalSummary = (data) => (
  <Row gutter={8}>
    <Col xs={24} sm={12} md={12} lg={6} xl={6} key="1">
      <Card>
        <Statistic
          title="Global Cases"
          value={data.globalData.totalGlobalCases}
          precision={0}
          valueStyle={{ color: '#cf1322', backgroundColor: '#f9f9fd' }}
        />
      </Card>
    </Col>
    <Col xs={24} sm={12} md={12} lg={6} xl={6} key="2">
      <Card>
        <Statistic
          title="Global Deaths"
          value={data.globalData.totalGlobalDeaths}
          precision={0}
          valueStyle={{ color: '#cf1322', backgroundColor: '#f9f9fd' }}
        />
      </Card>
    </Col>
    <Col xs={24} sm={12} md={12} lg={6} xl={6} key="4">
      <Card>
        <Statistic
          title="Global recovered"
          value={data.globalData.totalGlobalRecovered}
          precision={0}
          valueStyle={{ color: '#3f8600', backgroundColor: '#f9f9fd' }}
        />
      </Card>
    </Col>
    <Col xs={24} sm={12} md={12} lg={6} xl={6} key="3">
      <Card>
        <Statistic
          title="Countries (incl. vessels)"
          value={data.globalData.countriesTotal}
          precision={0}
          valueStyle={{ color: '#cf1322', backgroundColor: '#f9f9fd' }}
        />
      </Card>
    </Col>
  </Row>
);

export default TotalSummary;
