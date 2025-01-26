const Schema = `#graphql
    type Auth {
        user_id: ID!
        photo: String!
        name: String!
        uname: String!
        email: String!
    }
    type Query {
        auth: Auth
    }
    type Mutation {
        register(name: String!, uname: String!, email: String!, pass: String!, rePass: String, show: Boolean!): Boolean!
        login(emailOrUname: String!, pass: String!): Boolean!
        logout: Boolean!
    }
`
export default Schema