import { gql } from '@apollo/client'

const APP = gql`
    query {
        user {
            id
            username
            email
            photo {
                data
            }
        }
    }
`
export default APP