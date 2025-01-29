import Auth from './resolver/middleware/Auth'
import Register from './resolver/auth/Register'
import Login from './resolver/auth/Login'
import Fetch from './resolver/book/Fetch'
import Collection from './resolver/book/Collection'
import Check from './resolver/api/Check'
import Generate from './resolver/api/Generate'
import AddRemove from './resolver/book/AddRemove'
import Logout from './resolver/auth/Logout'

const Resolver = {
    Query: {
        auth: Auth,
        fetch: Fetch,
        collection: Collection,
        check: Check,
        // api: API
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
export default Resolver