import { gql } from '@apollo/client'

const GENERATE = gql`
    mutation($user_id: ID!) {
        generate(user_id: $user_id)
    }
`
export default GENERATE