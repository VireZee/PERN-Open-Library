import Schema from './Schema'
import Auth from './resolver/middleware/Auth'
import Register from './resolver/auth/Register'
import Login from './resolver/auth/Login'
import Fetch from './resolver/book/Fetch'
import Collection from './resolver/book/Collection'
import Check from './resolver/api/Check'
import Generate from './resolver/api/Generate'
import API from './resolver/api/Data'
import Books from './resolver/api/Books'
import AddRemove from './resolver/book/AddRemove'
import Logout from './resolver/auth/Logout'

interface Data {
    user_id: string
    email: string
    username: string
    books: Book[]
}
interface Book {
    cover_i: string
    isbn: string
    title: string
    author_name: string
}
interface Error {
    message: string
}
type API = Data | Error
export const typeDefs = Schema
export const resolvers = {
    API: {
        __resolveType(obj: API) {
            if ((obj as Data).user_id) return 'Data'
            else return 'Error'
        }
    },
    Data: {
        books: Books
    },
    Query: {
        auth: Auth,
        fetch: Fetch,
        collection: Collection,
        check: Check,
        api: API
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