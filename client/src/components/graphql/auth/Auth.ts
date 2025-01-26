import { gql } from '@apollo/client'

const AUTH = gql`
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
export default AUTH