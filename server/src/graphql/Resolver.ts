import Auth from './resolvers/middlewares/Auth'
import Login from './resolvers/auth/Login'
// import Register from './resolvers/auth/Register'

const Resolver = {
    Query: {
        auth: Auth
    },
    Mutation: {
        login: Login,
        // register: Register
    }
}
export default Resolver