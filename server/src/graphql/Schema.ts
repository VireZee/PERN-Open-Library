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
`
export default Schema