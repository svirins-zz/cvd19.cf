require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});
module.exports = {
  flags: {
    FAST_DEV: true,
  },
  siteMetadata: {
    title: "Covid-19 stats and charts",
    description: `This site aims to provide a simple tool to track global trends in
    Covid-19 pandemic.`,
    version: "0.5.2",
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
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "YOUR_GOOGLE_TAGMANAGER_ID",
        includeInDevelopment: false,
        defaultDataLayer: { platform: "gatsby" },
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/assets`,
      },
    },
    {
      resolve: 'gatsby-plugin-react-leaflet',
      options: {
        linkStyles: false 
      }
    },
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
        description: `This site aims to provide a simple tool to track global trends in
        Covid-19 pandemic.`,
        start_url: "/",
        lang: "en",
        display: "standalone",
        icon: "src/assets/coronavirus.png",
        background_color: "#f5f6f9",
        theme_color: "#20263d",
        crossOrigin: `use-credentials`,
      },
    },
    "gatsby-plugin-typescript",
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
            "primary-color": "#183C52",
            "heading-color": "#05264c",
            "link-color": "#ff0000",
            "link-hover-color": "#ef4d4d",
            "link-active-color": "#ef4d4d",
            "layout-header-background": "#05264c",
            "layout-footer-background": "#f0f2f5",
            "menu-bg": "#05264c",
            "menu-item-color": "#fff",
            "menu-highlight-color": "#c30940",
            "menu-item-active-bg": "#c30940",
            "menu-item-vertical-margin": "middle",
            "icon-color": "#120338",
            "menu-icon-size": "28px",
          },
          javascriptEnabled: true,
        },
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://cvd19.cf",
        sitemap: "https://cvd19.cf/sitemap.xml",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: "Open Sans",
              variants: ["400", "600"],
              //fontDisplay: 'swap',
              //strategy: 'selfHosted' // 'base64' || 'cdn'
            },
          ],
        },
      },
    },
  ],
};
