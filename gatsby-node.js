const { GraphQLClient, gql } = require("graphql-request");


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
  const graphQLClient = new GraphQLClient("/api", {
    credentials: "include",
    mode: "cors",
  });
  if (
    page.path === "/" ||
    page.path === "/map" ||
    page.path === "/map/" ||
    page.path === "/data" ||
    page.path === "/data/"
  ) {
    const { createPage, deletePage } = actions;
    deletePage(page);
    const data = await graphQLClient.request(COUNTRY_QUERY);
    createPage({
      ...page,
      context: {
        ...page.context,
        data,
      },
    });
  }
};
