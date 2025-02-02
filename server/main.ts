import AppDataSource from './src/DataSource'
import express from 'express'
import http from 'http'
import cors from 'cors'
import cp from 'cookie-parser'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { expressMiddleware } from '@apollo/server/express4'
import { typeDefs, resolvers } from './src/graphql/Resolver'

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
        '/gql',
        cors<cors.CorsRequest>({ origin: `http://${process.env.DOMAIN}:${process.env.CLIENT_PORT}`, credentials: true }),
        express.json(),
        cp(),
        expressMiddleware(server, {
            context: async ({ req, res }) => ({ req, res })
        })
    )
    httpServer.listen(process.env.PORT)
})()
// import AppDataSource from './src/DataSource'
// import express from 'express'
// import cors from 'cors'
// import cp from 'cookie-parser'
// import AuthRt from './src/routes/Route'

// AppDataSource.initialize()
// const app = express()
// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true
// }))
// app.use(express.json())
// app.use(cp())
// app.listen(process.env.PORT)

// app.use(AuthRt)