module.exports = {
  siteMetadata: {
    title: 'Covid-19',
    description: 'In progress',
    author: '@svirins',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Covid-19',
        short_name: 'Covid-19',
        start_url: '/',
        background_color: '#202124',
        theme_color: '#202124',
        display: 'browser',
        icon: 'src/images/coronavirus.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-typescript',
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

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
