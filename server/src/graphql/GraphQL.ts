import Schema from './Schema'
import Auth from './Auth'

export const typeDefs = Schema
export const resolvers = {
    Query: Auth.Query
}