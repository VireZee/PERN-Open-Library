import Auth from './resolvers/middlewares/Auth'
import Register from './resolvers/auth/Register'
import Login from './resolvers/auth/Login'
import Logout from './resolvers/auth/Logout'

const Resolver = {
    Query: {
        auth: Auth
    },
    Mutation: {
        register: Register,
        login: Login,
        logout: Logout
    }
}
export default Resolver