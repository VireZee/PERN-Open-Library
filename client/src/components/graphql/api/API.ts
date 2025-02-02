import { gql } from '@apollo/client'

const API = gql`
    query($api_key: String!) {
        api(api_key: $api_key) {
            __typename
            ... on Data {
                user_id
                email
                username
                books {
                    cover_i
                    isbn
                    title
                    author_name
                }
            }
            ... on Error {
                message
            }
        }
    }
`
export default API