import "styles/app.css";

import { Divider, Layout } from "antd";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";

import { GithubOutlined } from "@ant-design/icons";
import { useLocation } from "@reach/router";

import { SideNav } from "./sideNav"

const { Content,  Footer } = Layout;
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
    ? "conentWithoutMargin"
    : "conentWithMargin";
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideNav />
      <Layout className={marginClassName}>
        <Content>
          <div className={marginClassName}>{children}</div>
        </Content>
        {pathname.includes("map") ? undefined : (
          <Footer>
            <div className="build-time">
              Data updates during build time. Last bulid runs:{" "} 
              {siteBuildMetadata.buildTime}
            </div>
            <Divider className="divider"/>
            <div className="credentials">
              Made with{" "}
              <span role="img" aria-labelledby="love">
                ❤️
              </span>{" "}
              by <a href="https://twitter.com/svirins">@svirins</a>.
            </div>
            <div className="credentials">
              {" "}
              View source{" "}
              <a href="https://github.com/svirins/cvd19.cf">
                <GithubOutlined style={{ fontSize: "14px" }} />
              </a>
            </div>
          </Footer>
        )}
      </Layout>
    </Layout>
  );
};
