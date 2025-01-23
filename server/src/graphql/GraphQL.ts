import Schema from './Schema'
import Resolver from './Resolver'

export const typeDefs = Schema
export const resolvers = {
    Query: Resolver.Query,
    Mutation: Resolver.Mutation
}