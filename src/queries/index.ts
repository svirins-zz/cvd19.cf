import { gql } from "graphql-request";

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

export default COUNTRY_QUERY;
