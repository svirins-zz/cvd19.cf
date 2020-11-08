import React from "react";
import { Typography, Col, Row, Divider } from "antd";
import { Page, SEO } from "components/layout";

const { Title, Paragraph } = Typography;

// TODO: Add typography and styling
export const About = () => (
  <Page>
    <SEO title="About" />
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Title level={3} style={{ marginBottom: "0px" }}>
          Covid-19 Pandemic Information
        </Title>
        <Paragraph>Stay home and be safe!</Paragraph>
        <Divider className="divider" />
      </Col>
    </Row>
    <Row gutter={[8, 8]}>
      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
        <Paragraph>
          This site aims to provide a simple tool to track global progress in
          defeating Covid-19, by focusing on the rate of change in death count
          globally. Daily data update occurs between 04:45 and 05:15 GMT.
        </Paragraph>
        <Paragraph>
          The Won status above only looks at deaths, and should therefore be a
          slight leading indicator compared to the Pandemic Free status, which
          requires both no deaths and no cases. Pandemic Free should also
          decrease in the begging as outbreaks start, and then increase once
          countries successfully eradicate the virus.
        </Paragraph>
      </Col>
      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
        <Paragraph>
          Summary: the pandemic is serious; we won&apos;t have an economy if we
          don&apos;t defeat it; herd immunity and waiting on a vaccine are not
          real strategies; masks, lockdowns, travel bans, and mass testing are.
        </Paragraph>
      </Col>
    </Row>
    <Row gutter={[8, 16]}>
      <Col span={24}>
        <Title level={3}>Extra info and useful resources</Title>
        <Paragraph>
          If you want expert information visit
          <ul style={{ marginTop: "10px" }}>
            {" "}
            <li>
              <a href="https://necsi.edu/corona-virus-pandemic">
                NECSI Coronavirus resources
              </a>
            </li>
            <li>
              <a href="https://www.endcoronavirus.org/">EndCoronavirus.org</a>
            </li>
          </ul>{" "}
          , which provides extensive information, policy advice and guidelines
          for the fight against Covid-19.
        </Paragraph>
        <Paragraph />
        <Paragraph>
          All data is pulled from the{" "}
          <a href="https://github.com/CSSEGISandData/COVID-19">
            COVID-19 data repository
          </a>{" "}
          provided by Johns Hopkins University. Which in turn pulls data from
          various government sources, and tracking projects such as{" "}
          <a href="https://www.worldometers.info/coronavirus">WorldoMeters</a>.
        </Paragraph>
        <Paragraph>
          All code for this site is{" "}
          <a href="https://github.com/svirins/covid-charts-and-tables">
            open source
          </a>
          . It is built with <a href="https://www.gatsbyjs.org/">Gatsby</a> ,
          Mapbox, Victory, Typescript and Ant Design. and consumes the Johns
          Hopkins data via a{" "}
          <a href="https://github.com/rlindskog/covid19-graphql">GraphQl</a> API
          which in turn wraps a another{" "}
          <a href="https://github.com/pomber/covid19">parser</a>.
        </Paragraph>
      </Col>
    </Row>
  </Page>
);
