import { gql } from '@apollo/client'

const GET_USER = gql`
    query GetAuth {
        auth {
            user_id
            photo
            name
            uname
            email
        }
    }
`
export default GET_USER