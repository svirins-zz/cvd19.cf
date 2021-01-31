import { ApolloServer, makeExecutableSchema } from 'apollo-server-micro'
import fetch from 'node-fetch'

import resolvers from './resolvers'
import { default as typeDefs } from './schema'

import microCors = require('micro-cors');


const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

let results = null

const server = new ApolloServer({
  schema,
  playground: true,
  introspection: true,
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

})

const cors = microCors({
  allowMethods: ['POST','GET','PUT','PATCH','DELETE','OPTIONS'],
  allowHeaders: ['X-Requested-With','Access-Control-Allow-Origin','X-HTTP-Method-Override','Content-Type','Authorization','Accept'],
  allowCredentials: true, 
  origin: '*'
})

const handler = server.createHandler({ path: '/' })

export default cors((req, res) => req.method === 'OPTIONS' ? res.end() : handler(req, res))