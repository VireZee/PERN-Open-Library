const Schema = `#graphql
    type Auth {
        photo: String!
        name: String!
        uname: String!
        email: String!
    }
    type Fetch {
        isbn: String!
        added: Boolean!
    }
    type Book {
        cover_i: String!
        isbn: String!
        title: String!
        author_name: String!
    }
    type Collection {
        found: Int!
        collection: [Book!]!
        totalCollection: Int!
    }
    type Query {
        auth: Auth!
        fetch(isbn: String!): Fetch!
        collection(
            search: String
            page: Int!
        ): Collection!
        check: String
    }
    type Mutation {
        register(
            name: String!
            uname: String!
            email: String!
            pass: String!
            rePass: String
            show: Boolean!
        ): Boolean!
        login(
            emailOrUname: String!
            pass: String!
        ): Boolean!
        add(
            cover_i: Int!
            isbn: String!
            title: String!
            author_name: String!
        ): Boolean!
        remove(isbn: String!): Boolean!
        generate: String!
        settings(
            photo: String!
            name: String!
            uname: String!
            email: String!
            oldPass: String
            newPass: String
            rePass: String
            show: Boolean!
        ): Boolean!
        logout: Boolean!
        delete: Boolean!
    }
`
export default Schema