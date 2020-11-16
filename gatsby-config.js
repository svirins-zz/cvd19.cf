require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});
module.exports = {
  siteMetadata: {
    title: "Covid-19 stats and charts",
    description: `This site aims to provide a simple tool to track global trends in
    Covid-19 pandemic.`,
    version: "0.4.1",
    author: "@svirins",
    siteUrl: "https://cvd19.cf",
    keywords: ["Covid-19", "Pandemic", "Dashboard"],
    language: "en",
    metaImage: "/assets/coronavirus.webp",
    menuLinks: [
      {
        name: "main",
        link: "/",
      },
      {
        name: "data",
        link: "/data",
      },
      {
        name: "map",
        link: "/map",
      },
      {
        name: "about",
        link: "/about",
      },
    ],
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/assets`,
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-leaflet",
    "gatsby-plugin-sharp",
    "gatsby-plugin-resolve-src",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-typegen",
      options: {
        outputPath: `src/@types/__generated__/gatsby-types.d.ts`,
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Covid-19 stats and charts",
        short_name: "Covid-19 stats and charts",
        start_url: "/",
        display: "mimimal-ui",
        icon: "src/assets/coronavirus.png",
        background_color: "#f5f6f9",
        theme_color: "#20263d",
        crossOrigin: `use-credentials`,
      },
    },
    "gatsby-plugin-typescript",
    "gatsby-plugin-tslint",
    "gatsby-plugin-offline",
    {
      resolve: "gatsby-plugin-antd",
      options: {
        style: true,
      },
    },
    {
      resolve: "gatsby-plugin-less",
      options: {
        lessOptions: {
          modifyVars: {
            "font-family": "Open Sans",
            "font-size-base": "16px",
            "primary-color": "#183C52",
            "heading-color": "#030f40",
            "link-color": "#e24275",
            "link-hover-color": "#497bd8",
            "link-active-color": "#497bd8",
            "layout-header-background": "#20263d",
            "layout-footer-background": "#f5f6f9",
            "menu-bg": "#20263d",
            "menu-item-color": "#fff",
            "menu-highlight-color": "#e46ca5",
            "menu-item-active-bg": "#e46ca5",
            "menu-item-vertical-margin": "middle",
            "icon-color": "#120338",
            "menu-icon-size": "28`px",
          },
          javascriptEnabled: true
        },
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://cvd19.cf",
        sitemap: "https://cvd19.cf/sitemap.xml",
        policy: [{ userAgent: "*", allow: "/" }]
      }
    },
  ],
};
