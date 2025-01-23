import Auth from './resolvers/middlewares/Auth'
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