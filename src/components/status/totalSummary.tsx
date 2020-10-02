import React from 'react';
import {
  Statistic, Card, Row, Col,
} from 'antd';

const TotalSummary = (globalData) => (
  <>
    {/* TODO: Implement 5-5 days dynamics */}
    {/* removed global summary */}
    <div className="site-statistic-demo-card">
      <Row gutter={30}>
        <Col xs={24} sm={12} md={12} lg={6} xl={6} key="1">
          <Card>
            <Statistic
              title="Global Cases"
              value={globalData.globalData[0]}
              precision={0}
              valueStyle={{ color: '#cf1322', backgroundColor: '#f9f9fd' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6} xl={6} key="2">
          <Card>
            <Statistic
              title="Global Deaths"
              value={globalData.globalData[1]}
              precision={0}
              valueStyle={{ color: '#cf1322', backgroundColor: '#f9f9fd' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6} xl={6} key="3">
          <Card>
            <Statistic
              title="Countries (incl. vessels)"
              value={globalData.globalData[3]}
              precision={0}
              valueStyle={{ color: '#cf1322', backgroundColor: '#f9f9fd' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6} xl={6} key="4">
          <Card>
            <Statistic
              title="Recovered"
              value={globalData.globalData[2]}
              precision={0}
              valueStyle={{ color: '#3f8600', backgroundColor: '#f9f9fd' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  </>
);

export default TotalSummary;
