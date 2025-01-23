import Auth from './resolvers/auth/Auth'
import Login from './resolvers/auth/Login'

const Resolver = {
    Query: {
        auth: Auth
    },
    Mutation: {
        login: Login
    }
}
export default Resolver