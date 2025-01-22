import AppDataSource from './src/DataSource'
import express from 'express'
import http from 'http'
import cors from 'cors'
import cp from 'cookie-parser'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { typeDefs, resolvers } from './src/graphql/GraphQL'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'

AppDataSource.initialize()
const app = express()
const httpServer = http.createServer(app)
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});
(async () => {
    await server.start()
    app.use(
        '/graphql',
        cors<cors.CorsRequest>({ origin: 'http://localhost:3000', credentials: true }),
        express.json(),
        cp(),
        expressMiddleware(server, {
            context: async ({ req }) => ({ req })
        })
    )
    app.listen(process.env.PORT)
})()