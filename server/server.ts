import { ApolloServer } from 'apollo-server-micro'
import fetch from 'isomorphic-unfetch'

import resolvers from './resolvers'
import { default as typeDefs } from './schema/schema'

import microCors = require('micro-cors');

let results = null

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    const getResults = async () => {
      if (results) {
        return results
      }
      const res = await fetch('https://pomber.github.io/covid19/timeseries.json')
      results = await res.json()
      return results
    }
    return {
      getResults
    }
  },
  playground: true,
  introspection: true,
})

const cors = microCors({
  allowMethods: ['POST','GET','PUT','PATCH','DELETE','OPTIONS'],
  allowHeaders: ['X-Requested-With','Access-Control-Allow-Origin','X-HTTP-Method-Override','Content-Type','Authorization','Accept'],
  allowCredentials: true, 
  origin: '*'
})

const handler = server.createHandler({ path: '/api' })

export const config = {
  api: {
    bodyParser: false,
  },
};
export default cors((req, res) => req.method === 'OPTIONS' ? res.end() : handler(req, res))