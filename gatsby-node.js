const { GraphQLClient, gql } = require("graphql-request");
// const fetch = require("isomorphic-unfetch")
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

function replacerFN (result) {
  const data = result.map(country => {
    let {n ,r} = country;
    let replacedResults = r.map(date => {
      let {dt,d,c,r} = date
      return {
        date: dt,
        deaths: d,
        confirmed: c,
        recovered: r
      }
    })
    return {
      name:n,
      results: replacedResults
    }
  })
  return data
}

const COUNTRY_QUERY = gql`
query {
    countries {
      n: name
      r: results {
        dt: date(format: "yyyy/MM/dd")
        d: deaths
        c :confirmed
        r: recovered
      }
    }
  }
`;
exports.onCreatePage = async ({ page, actions }) => {
  const graphQLClient = new GraphQLClient('https://corona-server.svirins.vercel.app/api')
    // url: 'https://corona-server.svirins.vercel.app/api',
    // credentials: "include",
    // mode: "cors"
    // });
  if (
    page.path === "/" ||
    page.path === "/map" ||
    page.path === "/map/" ||
    page.path === "/data" ||
    page.path === "/data/"
  ) {
    const { createPage, deletePage } = actions;
    deletePage(page);
    const result = await graphQLClient.request(COUNTRY_QUERY);
    const data = replacerFN(result.countries);
    createPage({
      ...page,
      context: {
        ...page.context,
        data,
      },
    });
  }
};
