import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import Helmet from "react-helmet";

import { SeoProps } from "@types";

export const SEO = ({
  description = "",
  title,
  pathname = "https://cvd19.cf",
}: SeoProps) => {
  const { site } = useStaticQuery<GatsbyTypes.SiteQuery>(
    graphql`
      query Site {
        site {
          siteMetadata {
            title
            description
            author
            keywords
            language
            metaImage
            siteUrl
          }
        }
      }
    `
  );
  const metaDescription = description || site?.siteMetadata?.description;
  const image = `${site?.siteMetadata?.siteUrl}${site?.siteMetadata?.metaImage}`;
  const canonical = pathname
    ? `${site?.siteMetadata?.siteUrl}${pathname}`
    : null;

  return (
    <Helmet
      htmlAttributes={{
        language: site?.siteMetadata?.language,
      }}
      title={title}
      titleTemplate={`%s | ${site?.siteMetadata?.title}`}
      link={
        canonical
          ? [
              {
                rel: "canonical",
                href: canonical,
              },
            ]
          : []
      }
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: "keywords",
          content: site?.siteMetadata?.keywords?.join(","),
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:creator`,
          content: site?.siteMetadata?.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(
        image
          ? [
              {
                property: "og:image",
                content: image,
              },
              {
                property: "og:image:width",
                content: image.width ?? 480,
              },
              {
                property: "og:image:height",
                content: image.height ?? 320,
              },
              {
                name: "twitter:card",
                content: "summary_large_image",
              },
            ]
          : [
              {
                name: "twitter:card",
                content: "summary",
              },
            ]
      )}
    />
  );
};
