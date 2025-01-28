import Auth from './resolvers/middlewares/Auth'
import Register from './resolvers/auth/Register'
import Login from './resolvers/auth/Login'
import Fetch from './resolvers/book/Fetch'
import Collection from './resolvers/book/Collection'
import AddRemove from './resolvers/book/AddRemove'
import Logout from './resolvers/auth/Logout'

const Resolver = {
    Query: {
        auth: Auth,
        fetch: Fetch,
        collection: Collection
    },
    Mutation: {
        register: Register,
        login: Login,
        add: AddRemove,
        remove: AddRemove,
        logout: Logout
    }
}
export default Resolver