import "styles/app.css";

import { Col, Divider, Layout, Row } from "antd";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";

import { GithubOutlined } from "@ant-design/icons";
import { useLocation } from "@reach/router";

import { SideNav } from "./sideNav"

const { Content,  Footer  } = Layout;
export const Page = ({
  children,
}: React.PropsWithChildren<Record<string, unknown>>): JSX.Element => {
  const { siteBuildMetadata } = useStaticQuery(graphql`
    query GetBuildTimeQuery($buildTime: DateQueryOperatorInput = {}) {
      siteBuildMetadata(buildTime: $buildTime) {
        buildTime(formatString: "YYYY-MM-DD HH:mm UTC")
      }
    }
  `)
  const { pathname } = useLocation();
  const marginClassName: string = pathname.includes("map")
    ? ""
    : "conentWithMargin";
  return (
    <Layout style={{ minHeight: "100vh", minWidth: "480px" }}>
      <SideNav />
      <Layout className={marginClassName}>
        <Content>
          <div className={marginClassName}>{children}</div>
        </Content>
        {pathname.includes("map") ? undefined : (
          <Footer>
            <Divider className="divider"/>
            <Row>
              <Col xs={24} sm={24} md={12} lg={12} xl={12} >
                <p className="credentials-left">
                  Data updates during build time. Last bulid runs at:{" "}
                  <em>{siteBuildMetadata.buildTime}</em>
                </p>  
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12} >
                <p className="credentials-right">
                  Made with{" "}
                  <span role="img" aria-labelledby="love">
                    ❤️
                  </span>{" "}
                  by <a href="https://twitter.com/svirins">@svirins</a>
                </p>
              </Col>
            </Row>
          </Footer>
        )}
      </Layout>
    </Layout>
  );
};
