module.exports = {
  siteMetadata: {
    title: 'Covid-19 stats and charts',
    description: 'In progress',
    author: '@svirins',
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
    'gatsby-plugin-sharp',
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
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-apollo',
      options: {
        uri: 'https://covid19-graphql.now.sh',
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
            'layout-header-background': '#120338',
            'layout-footer-background': '#f2f2f2',
            'menu-bg': '#120338',
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
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    }, 
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-XXXXXXXXX-X',
      },
    },
  ],
};
