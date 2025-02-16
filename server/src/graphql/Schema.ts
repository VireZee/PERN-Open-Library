const Schema = `#graphql
    type Auth {
        user_id: ID!
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
        fetch(
            user_id: ID!
            isbn: String!
        ): Fetch!
        collection(
            user_id: ID!
            search: String
            page: Int!
        ): Collection!
        check(user_id: ID!): String
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
            user_id: ID!
            cover_i: Int!
            isbn: String!
            title: String!
            author_name: String!
        ): Boolean!
        remove(
            user_id: ID!
            isbn: String!
        ): Boolean!
        generate(user_id: ID!) : String!
        settings(
            user_id: ID!
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
    }
`
export default Schema