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
        icon: 'src/assets/coronavirus.png', // This path is relative to the root of the site.
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
            'font-size': '16px',
            'primary-color': '#183C52',
            'heading-color': '#120338',
            'link-color': '#d97bff',
            'link-hover-color': '#ff1383',
            'link-active-color': '#ff1383',
            'layout-header-background': '#120338',
            'layout-footer-background': '#120338',
            'menu-bg': '#120338',
            'menu-item-color': '#fff',
            'menu-highlight-color': '#d80fc1',
            'menu-item-vertical-margin': 'middle',
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
  ],
};
