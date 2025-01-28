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
    type Query {
        auth: Auth
        fetch(
            user_id: ID!
            isbn: String!
        ): Fetch
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
            cover_i: String!
            isbn: String!
            title: String!
            author_name: String!
        ): Boolean!
        logout: Boolean!
    }
`
export default Schema