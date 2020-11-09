import React from "react";
import { Typography, Col, Row, Divider, Alert } from "antd";
import { Page, SEO, DonatePayPalButton } from "components/layout";

const { Title, Paragraph } = Typography;

const About = () => (
  <Page>
    <SEO title="About" />
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Title level={3} style={{ marginBottom: "0px" }}>
          Covid-19 Global pandemic situation
        </Title>
        <Paragraph>Stay home and be safe!</Paragraph>
        <Divider className="divider" />
      </Col>
    </Row>
    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
      <Alert
        message="Reminder"
        description="The pandemic is serious! Herd immunity and waiting on a
        vaccine are not real strategies. Masks, lockdowns, travel bans, and mass
        testing are."
        type="warning"
        showIcon={true}
        closable={true}
        style={{ marginBottom: "20px" }}
      />
    </Col>
    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
      <Paragraph>
        This site aims to provide a simple tool to track global trends in
        Covid-19 pandemic. You can choose from various data representations and
        apply sort and filters. Data updated 3-times per day. Refer help section
        to get detailed trend explanaton
      </Paragraph>
    </Col>
    <Row gutter={[8, 16]}>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <Title level={5}>Extra info and useful resources</Title>
        <Paragraph>
          If you want expert information visit:
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
          which provides extensive information, policy advice and guidelines for
          the fight against Covid-19.
        </Paragraph>
        <Paragraph />
        <Paragraph>
          All data is pulled from the{" "}
          <a href="https://github.com/CSSEGISandData/COVID-19">
            COVID-19 data repository
          </a>{" "}
          provided by Johns Hopkins University, then parsed with a{" "}
          <a href="https://github.com/pomber/covid19">JSON parser</a> and,
          finally, turned into{" "}
          <a href="https://github.com/svirins/covid-qrapqhl-server">
            GraphQL service{" "}
          </a>{" "}
        </Paragraph>
        <Paragraph>
          All code for this site is{" "}
          <a href="https://github.com/svirins/cvd19.cf">open source</a>. It is
          built with Gatsby. Tech stack details could be found{" "}
          <a href="https://stackshare.io/svirins/cvd19">here.</a>
        </Paragraph>
        <Divider className="divider" />
        <Paragraph>
          If you enjoyed using this site, and you'd like to help support its
          further development, you're welcome to donate!
        </Paragraph>
        <DonatePayPalButton />
      </Col>
    </Row>
  </Page>
);

export default About;
