// Create a new API endpoint handler in the appropriate directory for your project:
// Vercel: ./api/<endpoint-name>.{js|ts}
// Nextjs: ./pages/api/<endpoint-name>.{js|ts} or ./src/pages/api/<endpoint-name>.{js|ts}
import { format, parse } from "date-fns";

import { ApolloError, ApolloServer } from "@saeris/apollo-server-vercel";

const EPIDEMIC_START = "2020/01/07";
const PERIOD_LENGTH = 5;
const formatDate = d => `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`
const getGrowthRate = (index, results) => {
  if (index === 0) {
    return 0
  }
  const prevResult = results[index - 1]
  const currentResult = results[index]
  if (!prevResult || prevResult.confirmed === 0) {
    return undefined
  }
  return (currentResult.confirmed - prevResult.confirmed) / prevResult.confirmed
}

// Construct a schema, using GraphQL schema language

const resolvers = {
  Query: {
    date(parent, { format: dateFormat }) {
      if (!dateFormat) {
        return parent.date
      } else {
        return format(parse(parent.date, "yyyy-M-d", new Date()), dateFormat)
      }
    },
    async results(_parent, { countries, date }, { getResults }) {
      const results = await getResults()
      const eq = date && date.eq ? formatDate(new Date(date.eq)) : null
      const lt = date && date.lt ? new Date(formatDate(new Date(date.lt))) : null
      const gt = date && date.gt ? new Date(formatDate(new Date(date.gt))) : null

      const countryNames = countries && countries.length > 0 ? countries : Object.keys(results)
      let formatted = countryNames
        .reduce((acc, countryName) => {
          const countryResults = results[countryName]
          if (!countryResults) {
            throw new ApolloError(`Couldn't find data from country ${countryName}`)
          }
          const withCountryName = countryResults.map((result, index) => ({ ...result, growthRate: getGrowthRate(index, countryResults), country: { name: countryName } }))
          return [...acc, ...withCountryName]
        }, [])
        .filter(result => {
          const d = new Date(result.date)
          return ((eq && formatDate(d) === eq) || (lt && d < lt) || (gt && d > gt)) || !date
        })
      return formatted
    },
    async result(_parent, { country, date }, { getResults }) {
      const results = await getResults()
      const countryResult = results[country]
      if (date) {
        const formattedDate = formatDate(new Date(date))
        const foundIndex = countryResult.findIndex(r => {
          const d = formatDate(new Date(r.date))
          return d === formattedDate
        })
        const found = countryResult[foundIndex]
        found.country = country
        found.growthRate = getGrowthRate(foundIndex, countryResult)
        return found
      }
      // if no date provided, return the most recent.
      const lastIndex = countryResult.length - 1
      const found = countryResult[lastIndex]
      found.growthRate = getGrowthRate(lastIndex, countryResult)
      found.country = { name: country }
      return found
    },
    async countries(_parent, { names }, { getResults }) {
      const results = await getResults()
      let formatted = (names && names.length > 0 ? names : Object.keys(results))
        .reduce((acc, countryName) => {
          const countryResults = results[countryName]
          if (!countryResults) {
            throw new ApolloError(`Couldn't find data from country ${countryName}`)
          }
          const updatedResults = countryResults.map((result, index) => ({ ...result, growthRate: getGrowthRate(index, countryResults) }))
          const mostRecentIndex = countryResults.length - 1
          const mostRecent = countryResults[mostRecentIndex]
          mostRecent.growthRate = getGrowthRate(mostRecentIndex, updatedResults)
          const country = { name: countryName, results: updatedResults, mostRecent }
          return [...acc, country]
        }, [])
      return formatted
    },
    async country(_parent, { name }, { getResults }) {
      const data = await getResults()
      let results = data[name]
      if (!results) {
        throw new ApolloError(`Couldn't find data from country ${name}`)
      }
      results = results.map((result, index) => ({
        ...result,
        growthRate: getGrowthRate(index, results)
      }))
      const country = { name, results, mostRecent: results[results.length - 1] }
      return country
    }
  }
}

const typeDefs = `
  type Country {
    name: String
    results: [Result]
    mostRecent: Result
  }

  type Result {
    country: Country
    date (format: String): String
    confirmed: Int
    deaths: Int
    recovered: Int
    growthRate: Float
  }

  input DateInput {
    eq: String
    gt: String
    lt: String
  }

  type Query {
    results(countries: [String], date: DateInput): [Result]
    result (country: String!, date: String): Result
    countries (names: [String]): [Country]
    country (name: String): Country
  }
`

const server = new ApolloServer({
  typeDefs,
  resolvers,

  // By default, the GraphQL Playground interface and GraphQL introspection
  // is disabled in "production" (i.e. when `process.env.NODE_ENV` is `production`).
  //
  // If you'd like to have GraphQL Playground and introspection enabled in production,
  // the `playground` and `introspection` options must be set explicitly to `true`.
  playground: true,
  introspection: true,
});

export default server.createHandler();

// You should now be able to access your new endpoint from via::
// http://localhost:3000/api/<endpoint-name>

