import Schema from './Schema'
import Auth from './resolver/middleware/Auth'
import Register from './resolver/auth/Register'
import Login from './resolver/auth/Login'
import Fetch from './resolver/book/Fetch'
import Collection from './resolver/book/Collection'
import Check from './resolver/api/Check'
import Generate from './resolver/api/Generate'
import AddRemove from './resolver/book/AddRemove'
import Logout from './resolver/auth/Logout'

export const typeDefs = Schema
export const resolvers = {
    Query: {
        auth: Auth,
        fetch: Fetch,
        collection: Collection,
        check: Check
    },
    Mutation: {
        register: Register,
        login: Login,
        add: AddRemove,
        remove: AddRemove,
        generate: Generate,
        logout: Logout
    }
}