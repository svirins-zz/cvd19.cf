const { GraphQLClient, gql } = require("graphql-request");
const fetch = require("isomorphic-unfetch")
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: "babel-plugin-import",
    options: {
      libraryName: "antd",
      style: true,
    },
  });
};

const COUNTRY_QUERY = gql`
  query {
    countries {
      name
      results {
        date(format: "yyyy/MM/dd")
        deaths
        confirmed
        recovered
      }
    }
  }
`;
exports.onCreatePage = async ({ page, actions }) => {
  // const graphQLClient = new GraphQLClient("/api");
  if (
    page.path === "/" ||
    page.path === "/map" ||
    page.path === "/map/" ||
    page.path === "/data" ||
    page.path === "/data/"
  ) {
    const { createPage, deletePage } = actions;
    deletePage(page);
    // const data = await graphQLClient.request(COUNTRY_QUERY);
    const data = await fetch('http://localhost:8000/api',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `query {
          countries {
            name
            results {
              date(format: "yyyy/MM/dd")
              deaths
              confirmed
              recovered
            }
          }
        }`
      }),
    })
 .then(res => res.json())
    createPage({
      ...page,
      context: {
        ...page.context,
        data,
      },
    });
  }
};

// credentials: "include",
//   mode: "cors",