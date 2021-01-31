const { GraphQLClient, gql } = require("graphql-request");

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

// const COUNTRY_QUERY = gql`
//   query {
//     countries {
//       name
//       results {
//         date(format: "yyyy/MM/dd")
//         deaths
//         confirmed
//         recovered
//       }
//     }
//   }
// `;
// exports.onCreatePage = async ({ page, actions }) => {
//   const graphQLClient = new GraphQLClient("https://cvd19.cf/api", {
//     credentials: "include",
//     mode: "cors",
//   });
//   if (
//     page.path === "/" ||
//     page.path === "/map" ||
//     page.path === "/map/" ||
//     page.path === "/data" ||
//     page.path === "/data/"
//   ) {
//     const { createPage, deletePage } = actions;
//     deletePage(page);
//     const data = await graphQLClient.request(COUNTRY_QUERY);
//     createPage({
//       ...page,
//       context: {
//         ...page.context,
//         data,
//       },
//     });
//   }
// };
