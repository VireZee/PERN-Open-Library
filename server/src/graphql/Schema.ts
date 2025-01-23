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
        login(emailOrUname: String!, pass: String!): Boolean!
    }
`
export default Schema