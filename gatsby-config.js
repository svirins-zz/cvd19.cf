require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
});

module.exports = {
  siteMetadata: {
    title: 'Covid-19 stats and charts',
    description: 'In progress',
    author: 'svirins',
    siteURL: 'https://cvd19.cf',
    googleAnalyticsId: process.env.GATSBY_GOOGLE_ANALYTICS_ID,
    menuLinks: [
      {
        name: 'main',
        link: '/',
      },
      {
        name: 'data',
        link: '/data',
      },
      {
        name: 'map',
        link: '/map',
      },
      {
        name: 'about',
        link: '/about',
      },
    ],
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/assets`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-leaflet',
    'gatsby-plugin-sharp',
    'gatsby-plugin-resolve-src',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Covid-19 stats and charts',
        short_name: 'Covid-19 stats and charts',
        start_url: '/',
        display: 'browser',
        icon: 'src/assets/coronavirus.png',
      },
    },
    'gatsby-plugin-typescript',
    'gatsby-plugin-tslint',
    // 'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-apollo',
      options: {
        uri: process.env.GATSBY_APPLLO_GRAPHQL_ENDPOINT,

      },
    },
    {
      resolve: 'gatsby-plugin-antd',
      options: {
        style: true,
      },
    },
    {
      resolve: 'gatsby-plugin-less',
      options: {
        lessOptions: {
          modifyVars: {
            'font-family': 'Open Sans',
            'font-size-base': '16px',
            'primary-color': '#183C52',
            'heading-color': '#120338',
            'link-color': '#c242e2',
            'link-hover-color': '#7eb0d6',
            'link-active-color': '#7eb0d6',
            'layout-header-background': '#231C4B',
            'layout-footer-background': '#ffffff',
            'menu-bg': '#231C4B',
            'menu-item-color': '#fff',
            'menu-highlight-color': '#e46ca5',
            'menu-item-active-bg': '#e46ca5',
            'menu-item-vertical-margin': 'middle',
            'icon-color': '#120338',
            'menu-icon-size': '28`px',
          },
          javascriptEnabled: true,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GATSBY_FETCH_ENDPOINT,
        anonymize: true,
      },
    },
  ],
};
