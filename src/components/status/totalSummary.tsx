import React from 'react';
import {
  Statistic, Card, Row, Col,
  Typography,
} from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { AllPeriodsResult } from '../../utilities/types/data';

const { Title, Paragraph } = Typography;

const TotalSummary = (globalData: AllPeriodsResult, statusString: String) => (
  <>
    {/* TODO: Implement 5-5 days dynamics */}
    {/* removed global summary */}
    {/* <Paragraph className="centered">
        <GrowthSummaryTable data={globalData} periodLength={PERIOD_LENGTH} />
      </Paragraph> */}
    {/* <Divider /> */}
    <div className="site-statistic-demo-card">
      <Row gutter={30}>
        <Title className="centered" level={2}>Stats and trends for Covid-19</Title>
        <Paragraph className="centered">
          {statusString}
        </Paragraph>
      </Row>
      <Paragraph className="centered">
        This site aims to provide a simple tool to track global progress in defeating Covid-19,
        by focusing on the rate of change in death count globally.
        Daily data update occurs between 04:45 and 05:15 GMT
      </Paragraph>
      <Row gutter={30}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Global Cases"
              value={11.28}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Global Deaths"
              value={9.3}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Recovered"
              value={9.3}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Countries & Regions (incl. vessels)"
              value={9.3}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>
    </div>
  </>
);

export default TotalSummary;
