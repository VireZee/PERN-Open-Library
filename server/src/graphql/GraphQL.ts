import Schema from './Schema'
import Auth from './Resolver'

export const typeDefs = Schema
export const resolvers = {
    Query: Auth.Query
}