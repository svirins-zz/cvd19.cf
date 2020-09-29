import { gql } from '@apollo/client';

const CountryQuery = gql`
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

export default CountryQuery;

// const CountryQuery = gql`
//   query {
//     countries {
//       name
//       results {
//         date(format: "yyyy/MM/dd")
//         deaths
//         confirmed
//         recovered
//         growthRate
//       }
//     }
//   }
// `;

// export default CountryQuery;
