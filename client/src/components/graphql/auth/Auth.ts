import { gql } from '@apollo/client'

const AUTH = gql`
    query {
        auth {
            photo
            name
            uname
            email
        }
    }
`
export default AUTH