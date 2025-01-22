import { gql } from '@apollo/client'

const GET_AUTH = gql`
    query {
        auth {
            user_id
            photo
            name
            uname
            email
        }
    }
`
export default GET_AUTH