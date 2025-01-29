import Auth from './resolver/middleware/Auth'
import Register from './resolver/auth/Register'
import Login from './resolver/auth/Login'
import Fetch from './resolver/book/Fetch'
import Collection from './resolver/book/Collection'
import CheckAPIKey from './resolver/api/Check'
import AddRemove from './resolver/book/AddRemove'
import Logout from './resolver/auth/Logout'

const Resolver = {
    Query: {
        auth: Auth,
        fetch: Fetch,
        collection: Collection,
        checkApiKey: CheckAPIKey
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